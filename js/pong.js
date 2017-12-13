requirejs.config({
    baseUrl: 'js',
    paths: {
        Phaser: 'lib/phaser.min',
        Ball: 'gameModules/ball',
        Constants: 'gameModules/constants',
        Score: 'gameModules/score',
        Paddle: 'gameModules/paddle'
    }
});

require(['Phaser', 'Ball', 'Constants', 'Score', 'Paddle'],function(Phaser, Ball, Constants, Score){
    var game = new Phaser.Game(Constants.screenWidth, Constants.screenHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    
    // Game elements
    var leftPaddleObject;
    var rightPaddleObject;

    var leftPaddle;
    var rightPaddle;
    
    // Input
    var cursors;
    var leftPlayerInput;
    var rightPlayerInput;    
            
    function preload() 
    {
        game.load.image('courtGfx', 'assets/sprites/court.png');

        leftPaddleObject = new Paddle('leftPaddleGfx', 'assets/sprites/paddle-blue.png');
        rightPaddleObject = new Paddle('rightPaddleGfx', 'assets/sprites/paddle-green.png');
        leftPaddleObject.preload();
        rightPaddleObject.preload();

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
        leftPaddle = leftPaddleObject.create({x: 16, y: game.world.height/2});
        rightPaddle = rightPaddleObject.create({x: game.world.width - 48, y: game.world.height/2});
        
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