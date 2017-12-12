requirejs.config({
    baseUrl: 'js',
    paths: {
        Phaser: 'lib/phaser.min',
        Ball: 'gameModules/ball',
        Constants: 'gameModules/constants',
        Score: 'gameModules/score'
    }
});

require(['Phaser', 'Ball', 'Constants', 'Score'],function(Phaser, Ball, Constants, Score){
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    
    // Game elements
    var leftPaddle;
    var rightPaddle;
    
    // Input
    var cursors;
    var leftPlayerInput;
    var rightPlayerInput;    
    
    function initializePaddle(position, gfxName)
    {
        var paddle = game.add.sprite(position.x, position.y, gfxName);
        game.physics.arcade.enable(paddle);
        paddle.body.collideWorldBounds = true;
        
        return paddle;
    }
        
    function preload() 
    {
        game.load.image('courtGfx', 'assets/sprites/court.png');

        // TODO: encapsulate paddles
        game.load.image('leftPaddleGfx', 'assets/sprites/paddle-blue.png');
        game.load.image('rightPaddleGfx', 'assets/sprites/paddle-green.png');

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
        // TODO: encapsulate paddles
        leftPaddle = initializePaddle({x: 16, y: game.world.height/2}, 'leftPaddleGfx');
        leftPaddle.paddlePosition = Constants.paddlePosition.left;
        leftPaddle.body.immovable = true;
        rightPaddle = initializePaddle({x: game.world.width - 48, y: game.world.height/2}, 'rightPaddleGfx');
        rightPaddle.paddlePosition = Constants.paddlePosition.right;
        rightPaddle.body.immovable = true;
        
        // The score
        Score.create();

        // Game Inputs
        // TODO: move game input inplementation
        cursors = game.input.keyboard.createCursorKeys();
        leftPlayerInput =
        {
            down: cursors.down,
            up: cursors.up
        };

        rightPlayerInput =
        {
            down: cursors.left,
            up: cursors.right
        };

        Ball.create();
        Ball.setPaddles(leftPaddle, rightPaddle);
    }

    function movePaddle(paddle, direction)
    {
        paddle.body.velocity.y = 0;
        
        switch(direction) 
        {
            case Constants.movementDirection.up:
                paddle.body.velocity.y = -150;
                break;
            case Constants.movementDirection.down:
                paddle.body.velocity.y = 150;
                break;
        }

    }

    function handlePlayerInput(paddle, inputButtons)
    {
        if (inputButtons.up.isDown)
        {
            movePaddle(paddle, Constants.movementDirection.up);
        }
        else if (inputButtons.down.isDown)
        {
            movePaddle(paddle, Constants.movementDirection.down);
        }
        else
        {
            movePaddle(paddle, Constants.movementDirection.none);
        }
    }

    function update() 
    {
        Ball.update();

        // handle left player's movement
        handlePlayerInput(leftPaddle, leftPlayerInput);
        
        // handle other pad
        // TODO: implement AI
        handlePlayerInput(rightPaddle, rightPlayerInput);
    }
});