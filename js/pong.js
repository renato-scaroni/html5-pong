/*
Game main class, control game scene elements
*/
requirejs.config({
    baseUrl: 'js',
    paths: {
        Phaser: 'lib/phaser.min',
        Ball: 'gameModules/ball',
        Constants: 'gameModules/constants',
        Score: 'gameModules/score',
        Paddle: 'gameModules/paddle',
        PaddleInputController: 'gameModules/paddleInputController'
    }
});

require(['Phaser', 'Ball', 'Constants', 'Score', 'Paddle', 'PaddleInputController'],function(){
    // Importing library
    Paddle = require('Paddle');
    PaddleInputController = require('PaddleInputController');
    Phaser = require('Phaser');
    Ball = require('Ball');
    Constants = require('Constants');
    Score = require('Score');

    // Create game instance
    var game = new Phaser.Game(Constants.screenWidth, Constants.screenHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    
    // Game elements
    var leftPaddleObject;
    var rightPaddleObject;

    function preload() 
    {
        game.load.image('courtGfx', 'assets/sprites/court.png');

        leftPaddleObject = new Paddle('leftPaddleGfx', 'assets/sprites/paddle-blue.png');
        rightPaddleObject = new Paddle('rightPaddleGfx', 'assets/sprites/paddle-green.png');
        leftPaddleObject.preload(game);
        rightPaddleObject.preload(game);

        Ball.init(game);    
        Ball.preload();

        Score.init(game);
    }

    function create() {
        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Set court background
        game.add.sprite(0, 0, 'courtGfx');
        
        // Paddles initialization
        leftPaddleObject.create({x: 16, y: game.world.height/2});
        rightPaddleObject.create({x: game.world.width - 48, y: game.world.height/2});
        
        // The score
        Score.create();

        // Game Inputs
        var cursors = game.input.keyboard.createCursorKeys();
        leftPlayerInput =
        {
            down: cursors.down,
            up: cursors.up
        };
        var paddleInputController = new PaddleInputController(leftPlayerInput);
        leftPaddleObject.setMovementController(paddleInputController);

        // Ball
        Ball.create();
        Ball.setPaddles(leftPaddleObject.getSprite(), rightPaddleObject.getSprite());
    }

    function update() 
    {
        Ball.update();

        leftPaddleObject.update();
        rightPaddleObject.update();
    }
});