requirejs.config({
    baseUrl: 'js',
    paths: {
        Phaser: 'lib/phaser.min',
        Ball: 'gameModules/ball',
        Constants: 'gameModules/constants'
    }
});

require(['Phaser', 'Ball', 'Constants'],function(Phaser, Ball, Constants){
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    
    // Hud
    var score = 0;
    var scoreText;
    
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
        game.load.image('leftPaddleGfx', 'assets/sprites/paddle-blue.png');
        game.load.image('rightPaddleGfx', 'assets/sprites/paddle-green.png');
        Ball.init(game);    
        Ball.preload();
    }

    function create() {
        
        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        // Set court background
        game.add.sprite(0, 0, 'courtGfx');
        
        // The player and its settings
        leftPaddle = initializePaddle({x: 16, y: game.world.height/2}, 'leftPaddleGfx');
        leftPaddle.paddlePosition = Constants.paddlePosition.left;
        
        rightPaddle = initializePaddle({x: game.world.width - 48, y: game.world.height/2}, 'rightPaddleGfx');
        leftPaddle.paddlePosition = Constants.paddlePosition.right;
        
        
        //  The score
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        //  Our controls.
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
        
        // handle other pad (need to decide how)
        handlePlayerInput(rightPaddle, rightPlayerInput);
    }
});