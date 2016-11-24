var game = new Phaser.Game(800,600,Phaser.AUTO, 'game_div');
    var game_state = {};

function preload() {

    game.stage.backgroundColor = '#85b5e1';
   
    game.load.crossOrigin = 'anonymous';

    game.load.image('player', 'jumbo.png');
    game.load.image('platform', 'rect.png');
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

function create() {

    player = game.add.sprite(10, 550, 'player');
    player.scale.setTo(0.05,0.05);

    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.collideWorldBounds = true;
    player.body.gravity.y = 0;
    player.body.checkCollision.up = true;
    player.body.checkCollision.down = true;
    player.body.immovable = true;
    //player.body.gravity.x = 0;

    platforms = game.add.physicsGroup();

    // platforms.create(500, 150, 'platform');
    // platforms.create(-200, 300, 'platform');
    platforms.create(550, 550, 'platform');
    platforms.create(50, 550, 'platform');
    platforms.create(50, 500, 'platform');
    platforms.create(550, 500, 'platform');
    platforms.create(50, 450, 'platform');
    platforms.create(550, 450, 'platform');

    platforms.create(0, 220, 'platform');
    platforms.create(0, 300, 'platform');
    platforms.create(0, 250, 'platform');
    platforms.create(0, 200, 'platform');
    platforms.create(0, 150, 'platform');
    platforms.create(0, 100, 'platform');
    platforms.create(0, 50, 'platform');
    platforms.create(650,0, 'platform');
    platforms.create(650,50, 'platform');
    platforms.create(650, 100, 'platform');
    platforms.create(650, 150, 'platform');
    platforms.create(650, 200, 'platform');
    platforms.create(650, 250, 'platform');
    platforms.create(650, 300, 'platform');
    platforms.create(650, 350, 'platform');
    platforms.create(650, 400, 'platform');
    
    platforms.create(0,0, 'platform');
    
    platforms.setAll('body.immovable', true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update () {

    game.physics.arcade.collide(player, platform);

   // player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.x += -5;
    }
    else if (cursors.right.isDown)
    {
        player.body.x += 5;
    }
    else if (cursors.up.isDown)
    {
        player.body.y -= 5;
    }
    else  if (cursors.down.isDown)
    {
        player.body.y += 5;
    }

    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down))
    {
        player.body.velocity.y = -400;
    }
}