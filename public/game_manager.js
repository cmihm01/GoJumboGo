/*Sets Mobile Settings*/
var mobile;
var width;
var height;
if(window.innerWidth <= 800 && window.innerHeight <= 600){
    mobile = true;
    height = 300;
    width = 400;
    x_start=10;
    y_start=300;

}
else{
    mobile = false;
     height = 600;
    width = 800;
    x_start=10;
    y_start=400;
}

/*creates new game in Phaser*/
var game = new Phaser.Game(width,height,Phaser.AUTO, 'game_div');
    var game_state = {};

/*adds all images to game*/
function preload() {

    game.stage.backgroundColor = '#85b5e1';
   
    game.load.crossOrigin = 'anonymous';

    game.load.image('player', 'img/jumbo.png');
    game.load.image('platform', 'img/rect.png');
    game.load.image('up_button', 'img/up.png');
    game.load.image('down_button', 'img/down.png');
    game.load.image('left_button', 'img/left.png');
    game.load.image('right_button', 'img/right.png');
    game.load.image('go_button', 'img/go.png');
    game.load.image('reset_button','img/reset.png')
    game.load.image('add_button', 'img/add.png');
    game.load.image('book', '/img/book.png');
    //game.load.image('platform2', 'http://www.clker.com/cliparts/n/3/N/y/H/g/navy-blue-square.svg');
}

/*sets game states*/
function init_game(){
	
	
	game_state.main = function() {};
	game_state.main.prototype = {
		preload:preload,
		create:create,
		update:update,

	};


	game.state.add('main', game_state.main);
	game.state.start('main');

}
var player;
var platforms;
var cursors;
var jumpButton;
var directions = [];
var buttons = [];
var menu = [];
var pressed = false;
var x_start;
var y_start;

/*Draws game board, renders sprites*/
function create() {
    console.log("in create");

    player = game.add.sprite(10, height-200, 'player');

    book = game.add.sprite(width/2+15,height-200,'book');
    if(!mobile){
        book.scale.setTo(0.1,0.1);  
    }
    else{
        book.scale.setTo(0.08,0.08);
    }
    make_buttons();

    draw_border();

    draw_maze(100);

    draw_grid(width-120,0);
   
    player.scale.setTo(0.05,0.05);

    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.collideWorldBounds = true;
  
    platforms = game.add.physicsGroup();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

/*adds directional buttons, go button and reset button
Buttons are set in different positions based on whether mobile or not*/
function make_buttons(){
    dir_vals = [{direction:'up', num: 0, img:'up_button'}, {direction:'down', num:100, img:'down_button'},{direction:'right', num:200, img:"right_button"}, {direction:'left', num:300, img:'left_button'}];
    button_y = height-80;
    //direction buttons
    if(!mobile){
        buttons.push({direction: "up", btn:game.add.sprite(0,button_y,'up_button')});
        buttons.push({direction: "down", btn:game.add.sprite(100, button_y, 'down_button')});
        buttons.push({direction:"right", btn:game.add.sprite(200, button_y, 'right_button')});
        buttons.push({direction:"left", btn:game.add.sprite(300,button_y,'left_button')});
    }
    else if(mobile){
        buttons.push({direction: "up", btn:game.add.sprite(0,button_y,'up_button')});
        buttons.push({direction: "down", btn:game.add.sprite(50, button_y, 'down_button')});
        buttons.push({direction:"right", btn:game.add.sprite(100, button_y, 'right_button')});
        buttons.push({direction:"left", btn:game.add.sprite(150,button_y,'left_button')});
    }
    //enables dragging, stores buttons
    for (var i = 0; i < buttons.length; i++){
        buttons[i].btn.inputEnabled = true;
        buttons[i].btn.input.enableDrag(true);
        if(!mobile){
            buttons[i].btn.scale.setTo(0.8,0.8);
        }
        else{
            buttons[i].btn.scale.setTo(0.5,0.5);
        }
        menu[i] = 1; 
    }
    //go and reset buttons
    if(!mobile){
        go = game.add.button(500, button_y, 'go_button', go_pressed);
        go.inputEnabled = true;

        reset = game.add.button(400, button_y, 'reset_button', reset);
        reset.inputEnabled = true;

        add = game.add.button(660, button_y + 50, 'add_button', add);
    }
    else if(mobile){
        go = game.add.button(270, button_y, 'go_button', go_pressed);
        go.inputEnabled = true;
        go.scale.setTo(0.6,0.6);

        reset = game.add.button(200, button_y, 'reset_button', reset);
        reset.inputEnabled = true;
        reset.scale.setTo(0.6,0.6);
    }
}
//sets pressed boolean which is checked in the update() function
function go_pressed(){
    pressed = true;
}
//when reset button is pressed, resets direction blocks and jumbo
function reset(){
    while(directions.length > 0){
        directions[0].btn.destroy();
        directions.splice(0,1);
        player.x = x_start;
        player.y = y_start;
    }
}
//in full implementation, the pressing of the add button would add
//more nodes to the direction menu 
function add(){
    console.log('add');
}
//parses directions array: for each member of the array, 
//translates it into movement of the character. 
function go_jumbo(){
        player.x = x_start;
        player.y = y_start;
        directions.sort(function(obj1, obj2) {
            return obj1.btn.y - obj2.btn.y;
        });
        if(mobile){
            var move = 50;
        }
        else{
            move = 100;
        }
        for (var i = 0; i < directions.length; i++){
            console.log(directions[i].direction);
            if(directions[i].direction == 'up'){
                player.body.y -= move;
            }
            if(directions[i].direction == 'down'){
                player.body.y += move;
            }
            if(directions[i].direction == 'right'){
                player.body.x += move;
            }
            if(directions[i].direction == 'left'){
                player.body.x -= move;
            }
        }
        pressed = false;
    }
/* In Phaser, this is checked constantly - it is used to update position and states*/
function update () {
    //pressed is true if the go button has been pressed and jumbo hasn't moved yet
   if(pressed == true){
        go_jumbo();
   }
    //bounds check for the buttons
    //can only be placed in the button queue
    if(game.input.mousePointer.isUp){
        for (var i = 0; i < buttons.length; i++){
        if(!mobile){
            var check = i * 100;
        }
        else{
            check = i*50;
        }
            if (buttons[i].btn.x != check && !game.input.mousePointer.isDown && buttons[i].btn.x < width-180){
                buttons[i].btn.x = check;
                buttons[i].btn.y = button_y;
            }
            if (buttons[i].btn.x >= width-180){
                directions.push(buttons[i]);
               menu [i] = 0;

            }
        }
    }
    //checks if jumbo is at the book 
    if(player.x < book.x +100 && player.x > book.x -100){
        if (player.y < book.y + 100 && player.y > book.y - 100){
            window.alert("You helped Jumbo get to the library! Hooray!");
            player.x = x_start;
            player.y = y_start;
            sendTimesPlayed();
        }
    }

    add_block();

  }


//draws the direction queue
function draw_grid(x,y){
    if(!mobile){
        while(y < height-100){
            graphics.lineStyle(10, 0xffffff, 1);
            graphics.moveTo(x,y);
            graphics.lineTo(x+100, y);
            graphics.lineTo(x+100, y+80);
            graphics.lineTo(x, y+80);
            graphics.lineTo(x,y);
            y+=80;
        }
    }
    if(mobile){
        while(y < height-100){
            graphics.lineStyle(10, 0xffffff, 1);
            graphics.moveTo(x,y);
            graphics.lineTo(x+50, y);
            graphics.lineTo(x+50, y+40);
            graphics.lineTo(x, y+40);
            graphics.lineTo(x,y);
            y+=40;
        }
    }
}
//helper function for maze
function draw_rect(x,y){
    graphics = game.add.graphics(0, 0);
    graphics.beginFill(0xFF3300);
    graphics.lineStyle(10, 0xffd900, 1);
    
    // draw a shape
    graphics.moveTo(x,y);
    graphics.lineTo(x+100, y);
    graphics.lineTo(x+100, y+50);
    graphics.lineTo(x, y+50);
    graphics.lineTo(x, y);

    graphics.endFill();

}
//draws boundaries 
function draw_border(){
    graphics = game.add.graphics(0, 0);
    //   draw border
    graphics.lineStyle(10, 0xffffff, 1);
    graphics.moveTo(0,0);
    graphics.lineTo(600,0);
    graphics.lineTo(600, 500);
    graphics.lineTo(0, 500);
    graphics.lineTo(0,0);
}
//draws the rectangle which make the maze
function draw_maze(y){
       //draw rects
    while(y < height-100){
        if(y != 300 && y != 350){
          draw_rect(100,y);
        }
        draw_rect(width-300,y);
        y+=50;
    }
}
//when a block is moved to the queue, it is replaced with another block 
//in its original position
function add_block(){
    var check;
    var exists = false;
    for(var i =0; i < menu.length; i++){
        if(menu[i] == 0){
            buttons[i] = {direction:dir_vals[i].direction, btn:game.add.sprite(dir_vals[i].num,button_y,dir_vals[i].img)};
            if(!mobile){
                 buttons[i].btn.scale.setTo(0.8,0.8);
             }
             else{
                buttons[i].btn.scale.setTo(0.5,0.5);
             }
            buttons[i].btn.inputEnabled = true;
            buttons[i].btn.input.enableDrag(true);
            menu[i] = 1;
        }
    }

}



