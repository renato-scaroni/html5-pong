define(['Phaser', 'Ball', 'Constants', 'Score', 'Paddle', 'PaddleInputController', 'PaddleAIController'],function() {
    // Importing modules
    Paddle = require('Paddle');
    PaddleInputController = require('PaddleInputController');
    Phaser = require('Phaser');
    Ball = require('Ball');
    Constants = require('Constants');
    Score = require('Score');
    PaddleAIController = require('PaddleAIController');    

    //public constants
    return    {
        preload: function()
        {
            this._game.load.image('courtGfx', 'assets/sprites/court.png');
            
            this.leftPaddleObject = new Paddle('leftPaddleGfx', 'assets/sprites/paddle-blue.png');
            this.rightPaddleObject = new Paddle('rightPaddleGfx', 'assets/sprites/paddle-green.png');
            this.leftPaddleObject.preload(this._game);
            this.rightPaddleObject.preload(this._game);
    
            Ball.init(this._game);    
            Ball.preload();
    
            Score.init(this._game);
        },
        create: function () {
            //  We're going to be using physics, so enable the Arcade Physics system
            this._game.physics.startSystem(Phaser.Physics.ARCADE);
            
            // Set court background
            this._game.add.sprite(0, 0, 'courtGfx');
            
            // Paddles initialization
            this.leftPaddleObject.create({x: 16, y: this._game.world.height/2});
            this.rightPaddleObject.create({x: this._game.world.width - 48, y: this._game.world.height/2});
            
            // The score
            Score.create();
    
            // Game Inputs
        var cursors = this._game.input.keyboard.createCursorKeys();
            leftPlayerInput =
            {
                down: cursors.down,
                up: cursors.up  
            };
    
            var paddleInputController = new PaddleInputController(leftPlayerInput);
            this.leftPaddleObject.setMovementController(paddleInputController);
            
            // Ball
            Ball.create();
            Ball.setPaddles(this.leftPaddleObject.getSprite(), this.rightPaddleObject.getSprite());
    
            // Initialize AI player
            var paddleAIController = new PaddleAIController();
            this.rightPaddleObject.setMovementController(paddleAIController);        
    
        },
        update: function() 
        {
           Ball.update();
    
            this.leftPaddleObject.update();
            this.rightPaddleObject.update();
        }
    }});