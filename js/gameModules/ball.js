/*
Ball module
Dependencies: Constants
*/
define(['Constants'], function(Constants) {

    //Private variables
    var _game = null,
        _sprite = null,
        _cursors = null,
        _leftPaddle = null,
        _rightPaddle = null;

    //Private functions
    function setBallMovement(ball, direction)
    {
        ball.ballDirection = ballDirection = {
            x: direction.x,
            y: direction.y
        }
    
        ball.body.velocity.x = 150 * ball.ballDirection.x;
        ball.body.velocity.y = 150 * ball.ballDirection.y;
    }

    function reflectBallDirection (ball, paddle) 
    {
        if(ball != null && paddle != null)
        {
            console.log(ball);
            console.log(paddle.paddlePosition);
            console.log("ball hit paddle");
            if(paddle.paddlePosition == Constants.paddlePosition.left)
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
    
    function handleBallCollisions()
    {
        // check for collisions
        _game.physics.arcade.collide(_sprite, _leftPaddle, reflectBallDirection, null, this);
        _game.physics.arcade.collide(_sprite, _rightPaddle, reflectBallDirection, null, this);
    
        // check if ball hit the wall
        if(_sprite.body.onWall())
        {
            resetBallMovement();
        }
    
        if(_sprite.body.onFloor() || _sprite.body.onCeiling())
        {
            reflectBallDirection(_sprite, null);
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
    
    function resetBallMovement()
    {
        // remember to reset balls rotation
        setBallMovement(_sprite, {x: -1, y: 0});
        _sprite.position.x = _game.world.width/2 -16;
        _sprite.position.y = _game.world.height/2;
    }

    //public functions
    return{
        init: function(game) {
            _game = game;
        },
        preload: function() {
            _game.load.image('ballGfx', 'assets/sprites/ball.png');
        },
        create: function() {
            _sprite = _game.add.sprite(_game.world.width/2 -16, _game.world.height/2, 'ballGfx');
            _game.physics.arcade.enable(_sprite);
            _sprite.body.bounce = 1;
            _sprite.body.collideWorldBounds = true;
            resetBallMovement();
        },
        update: function(){
            handleBallCollisions();
        },
        setPaddles: function(leftPaddle,rightPaddle) {
            _leftPaddle = leftPaddle;
            _rightPaddle = rightPaddle
        }

    }
});