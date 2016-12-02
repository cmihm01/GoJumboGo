var game = new Phaser.Game(800,600,Phaser.AUTO, 'game_div');
    var game_state = {};

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
    //game.load.image('platform2', 'http://www.clker.com/cliparts/n/3/N/y/H/g/navy-blue-square.svg');
}

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
var x_start = 10;
var y_start = 400;
function create() {
    console.log("in create");

    player = game.add.sprite(10, 400, 'player');

    make_buttons();

    draw_border();

    draw_maze(100);

    draw_grid(620,0);
   
    player.scale.setTo(0.05,0.05);

    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.collideWorldBounds = true;
   // player.body.gravity.y = 0;
    //player.body.checkCollision.up = true;
    //player.body.checkCollision.down = true;
    //player.body.immovable = true;
    //player.body.gravity.x = 0;
  
    platforms = game.add.physicsGroup();

 
    
    //for(var y)
    // platforms.create(500, 150, 'platform');
    // platforms.create(-200, 300, 'platform');
    // platforms.create(550, 550, 'platform');
    // platforms.create(50, 550, 'platform');
    // platforms.create(50, 500, 'platform');
    // platforms.create(550, 500, 'platform');
    // platforms.create(50, 450, 'platform');
    // platforms.create(550, 450, 'platform');

    // platforms.create(0, 220, 'platform');
    // platforms.create(0, 300, 'platform');
    // platforms.create(0, 250, 'platform');
    // platforms.create(0, 200, 'platform');
    // platforms.create(0, 150, 'platform');
    // platforms.create(0, 100, 'platform');
    // platforms.create(0, 50, 'platform');
    // platforms.create(650,0, 'platform');
    // platforms.create(650,50, 'platform');
    // platforms.create(650, 100, 'platform');
    // platforms.create(650, 150, 'platform');
    // platforms.create(650, 200, 'platform');
    // platforms.create(650, 250, 'platform');
    // platforms.create(650, 300, 'platform');
    // platforms.create(650, 350, 'platform');
    // platforms.create(650, 400, 'platform');
    
    // platforms.create(0,0, 'platform');
    
    // platforms.setAll('body.immovable', true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}
function make_buttons(){
    dir_vals = [{direction:'up', num: 0, img:'up_button'}, {direction:'down', num:100, img:'down_button'},{direction:'right', num:200, img:"right_button"}, {direction:'left', num:300, img:'left_button'}];
    button_y = 520;

    buttons.push({direction: "up", btn:game.add.sprite(0,button_y,'up_button')});
    buttons.push({direction: "down", btn:game.add.sprite(100, button_y, 'down_button')});
    buttons.push({direction:"right", btn:game.add.sprite(200, button_y, 'right_button')});
    buttons.push({direction:"left", btn:game.add.sprite(300,button_y,'left_button')});
    console.log('buttons pushed');
    
    for (var i = 0; i < buttons.length; i++){
        buttons[i].btn.inputEnabled = true;
        buttons[i].btn.input.enableDrag(true);
        buttons[i].btn.scale.setTo(0.8,0.8);
        menu[i] = 1; 
    }

    go = game.add.button(500, button_y, 'go_button', go_pressed);
    go.inputEnabled = true;

    reset = game.add.button(400, button_y, 'reset_button', reset);
    reset.inputEnabled = true;

    add = game.add.button(660, button_y + 50, 'add_button', add);
    //go.events.onInputDown.add(doSomething);
    
}
function go_pressed(){
    pressed = true;
}
function reset(){
    while(directions.length > 0){
        directions[0].btn.destroy();
        directions.splice(0,1);
        player.x = x_start;
        player.y = y_start;
    }
}
function add(){
    console.log('add');
}
function go_jumbo(){
        player.x = x_start;
        player.y = y_start;
        directions.sort(function(obj1, obj2) {
            return obj1.btn.y - obj2.btn.y;
        });
        for (var i = 0; i < directions.length; i++){
            console.log(directions[i].direction);
            if(directions[i].direction == 'up'){
                player.body.y -= 100;
            }
            if(directions[i].direction == 'down'){
                player.body.y += 100;
            }
            if(directions[i].direction == 'right'){
                player.body.x += 100;
            }
            if(directions[i].direction == 'left'){
                player.body.x -= 100;
            }
            //directions[i] = 0;
        }
        pressed = false;
    }
function update () {
    game.physics.arcade.collide(player, platforms);

   // player.body.velocity.x = 0;
   if(pressed == true){
        go_jumbo();
   }
    if (cursors.left.isDown)
    {
        player.body.x += -5;
    }
    // else if (cursors.right.isDown)
    // {
    //     player.body.x += 5;
    // }
    else if (cursors.up.isDown)
    {
        player.body.y -= 5;
    }
    // else  if (cursors.down.isDown)
    // {
    //     player.body.y += 5;
    // }

    // if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down))
    // {
    //     player.body.velocity.y = -400;
    // }
 
    if(game.input.mousePointer.isUp){
        for (var i = 0; i < buttons.length; i++){
        var check = i * 100;

            if (buttons[i].btn.x != check && !game.input.mousePointer.isDown && buttons[i].btn.x < 620){
                buttons[i].btn.x = check;
                buttons[i].btn.y = button_y;
               // console.log(buttons[i].btn.x)
            }
            if (buttons[i].btn.x >= 620){
                // var dir = {direction:buttons[i].direction, yval: buttons[i].btn.y};
                // console.log(dir);
                directions.push(buttons[i]);
              //  console.log(directions[0]);
                //console.log('mod: ' + i%4);
                //console.log(dir_vals[buttons[i].direction]);
               menu [i] = 0;

            }
        }
    }
    add_block();

  }


function draw_grid(x,y){
    while(y < 500){
        graphics.lineStyle(10, 0xffffff, 1);
        graphics.moveTo(x,y);
        graphics.lineTo(x+130, y);
        graphics.lineTo(x+130, y+80);
        graphics.lineTo(x, y+80);
        graphics.lineTo(x,y);
        y+=80;
    }
}
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
function draw_maze(y){
       //draw rects
    while(y < 500){
        draw_rect(100,y);
        draw_rect(500,y);
        y+=50;
    }
}

function add_block(){
    var check;
    var exists = false;
    for(var i =0; i < menu.length; i++){
        if(menu[i] == 0){
            buttons[i] = {direction:dir_vals[i].direction, btn:game.add.sprite(dir_vals[i].num,button_y,dir_vals[i].img)};
             buttons[i].btn.scale.setTo(0.8,0.8);
            buttons[i].btn.inputEnabled = true;
            buttons[i].btn.input.enableDrag(true);
            menu[i] = 1;
        }
    }

}



