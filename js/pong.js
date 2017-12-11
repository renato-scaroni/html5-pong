var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() 
{
    game.load.image('courtGfx', 'assets/sprites/court.png');
    game.load.image('leftPaddleGfx', 'assets/sprites/paddle-blue.png');
    game.load.image('rightPaddleGfx', 'assets/sprites/paddle-green.png');
    game.load.image('ballGfx', 'assets/sprites/ball.png');
}

// Hud
var score = 0;
var scoreText;

// Game elements
var leftPaddle;
var rightPaddle;
var ball;

// Input
var cursors;
var leftPlayerInput;
var rightPlayerInput;

var movementDirection = 
{
    up: 1,
    down: 2,
    none: 3
}

function setBallMovement(ball, direction)
{
    ball.ballDirection = ballDirection = {
        x: direction.x,
        y: direction.y
    }

    ball.body.velocity.x = 150 * ball.ballDirection.x;
    ball.body.velocity.y = 150 * ball.ballDirection.y;
}

function initializePaddle(position, gfxName)
{
    var paddle = game.add.sprite(position.x, position.y, gfxName);
    game.physics.arcade.enable(paddle);
    paddle.body.collideWorldBounds = true;

    return paddle;
}

var paddlePosition = 
{
    right: 1,
    left: 2
}

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Set court background
    game.add.sprite(0, 0, 'courtGfx');

    // The player and its settings
    leftPaddle = initializePaddle({x: 16, y: game.world.height/2}, 'leftPaddleGfx');
    leftPaddle.paddlePosition = paddlePosition.left;

    rightPaddle = initializePaddle({x: game.world.width - 48, y: game.world.height/2}, 'rightPaddleGfx');
    leftPaddle.paddlePosition = paddlePosition.right;

    // Initialize ball
    ball = game.add.sprite(game.world.width/2 -16, game.world.height/2, 'ballGfx');
    game.physics.arcade.enable(ball);
    ball.body.bounce = 1;
    ball.body.collideWorldBounds = true;

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

    setBallMovement(ball, {x: -1, y: 0});
}

function movePaddle(paddle, direction)
{
    paddle.body.velocity.y = 0;
    
    switch(direction) 
    {
        case movementDirection.up:
            paddle.body.velocity.y = -150;
            break;
        case movementDirection.down:
            paddle.body.velocity.y = 150;
            break;
    }

}

function handlePlayerInput(paddle, inputButtons)
{
    if (inputButtons.up.isDown)
    {
        movePaddle(paddle, movementDirection.up);
    }
    else if (inputButtons.down.isDown)
    {
        movePaddle(paddle, movementDirection.down);
    }
    else
    {
        movePaddle(paddle, movementDirection.none);
    }
}

function update() 
{
    handleBallCollisions();

    // handle left player's movement
    handlePlayerInput(leftPaddle, leftPlayerInput);
    
    // handle other pad (need to decide how)
    handlePlayerInput(rightPaddle, rightPlayerInput);

}

function handleBallCollisions()
{
    // check for collisions
    game.physics.arcade.collide(ball, leftPaddle, reflectBallDirection, null, this);
    game.physics.arcade.collide(ball, rightPaddle, reflectBallDirection, null, this);

    // check if ball hit the wall
    if(ball.body.onWall())
    {
        // Give point to a player
        // Update Hud
        console.log("ball on the wall");
    }

    if(ball.body.onFloor() || ball.body.onCeiling())
    {
        reflectBallDirection(ball, null);
    }
}

function rotateVector(vector, degrees)
{
    var radians = degrees * (Math.PI/180)

    return {
        x: vector.x * Math.cos(radians) - vector.y * Math.sin(radians),
        y: vector.x * Math.sin(radians) + vector.y * Math.cos(radians)
    };
}

function reflectBallDirection (ball, paddle) 
{
    if(ball != null && paddle != null)
    {
        console.log(ball);
        console.log(paddle.paddlePosition);
        console.log("ball hit paddle");
        if(paddle.paddlePosition == paddlePosition.left)
        {
            setBallMovement(ball, rotateVector(ball.ballDirection, -90));
        }
        else
        {
            setBallMovement(ball, rotateVector(ball.ballDirection, 90));
        }
    }
    else
    {
        if(ball.ballDirection.x > 0)
        {
            setBallMovement(ball, rotateVector(ball.ballDirection, -90)); 
        }
        else
        {
            setBallMovement(ball, rotateVector(ball.ballDirection, 90));
        }
    }
}
