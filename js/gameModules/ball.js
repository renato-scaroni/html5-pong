/*
Ball module
Singleton class that controls the Ball
Dependencies: Constants
*/
define(['Constants', 'Score'], function(Constants, Score) {

    //Private variables
    var _game = null,
        _sprite = null,
        _leftPaddle = null,
        _rightPaddle = null,
        _ballDirection = null;

    //Private functions
    function setBallMovement(ball, direction, targetBallSpeed = Constants.ballSpeed)
    {
        ball.body.velocity.x = targetBallSpeed * direction.x;
        ball.body.velocity.y = targetBallSpeed * direction.y;
    }

    function handlePaddleCollision (ball, paddle) 
    {
        if(ball != null && paddle != null)
        {
            // The paddles were sgmented in 4 possible segments, in which the collision 
            // implies on a movement direction to be modified
            var returnAngle;
            var segmentHit = Math.floor((ball.y - paddle.y)/Constants.paddleSegmentHeight);
            
            if (segmentHit >= Constants.paddleSegmentsMax) 
            {
                segmentHit = Constants.paddleSegmentsMax - 1;
            } 
            else if (segmentHit <= -Constants.paddleSegmentsMax) 
            {
                segmentHit = -(Constants.paddleSegmentsMax - 1);
            }
            
            if (paddle.x < Constants.screenWidth * 0.5) 
            {
                returnAngle = segmentHit * Constants.paddleSegmentAngle;
                _game.physics.arcade.velocityFromAngle(returnAngle, Constants.ballSpeed, _sprite.body.velocity);
            } 
            else 
            {
                returnAngle = 180 - (segmentHit * Constants.paddleSegmentAngle);
                if (returnAngle > 180) 
                {
                    returnAngle -= 360;
                }
                
                _game.physics.arcade.velocityFromAngle(returnAngle, Constants.ballSpeed, _sprite.body.velocity);
            }
        }
    }
    
    function handleBallCollisions()
    {
        // checks for collisions
        _game.physics.arcade.collide(_sprite, _leftPaddle, handlePaddleCollision, null, this);
        _game.physics.arcade.collide(_sprite, _rightPaddle, handlePaddleCollision, null, this);
    1
        // checks if ball hit the wall
        if(_sprite.body.onWall())
        {
            if(_sprite.x < _game.world.centerX)
            {
                Score.incrementRightScore();
            }
            else
            {
                Score.incrementLeftScore();
            }

            resetBallMovement();
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
    
    function resetBallMovement(xDirection = Constants.ballDirection.left)
    {
        // remember to reset balls rotation
        var randomRotation = _game.rnd.integerInRange(-60, 60);
        var movementVector = rotateVector({x: xDirection, y: 0}, randomRotation);
        setBallMovement(_sprite, movementVector, );
        _sprite.position.x = _game.world.width/2 - _sprite.body.halfWidth;
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
            _sprite.body.bounce.x = 1;
            _sprite.body.bounce.y = 1;
            _sprite.checkWorldBounds = true;
            _sprite.body.collideWorldBounds = true;
            _sprite.body.immovable = true;

            resetBallMovement();
        },
        update: function(){
            handleBallCollisions();
        },
        setPaddles: function(leftPaddle,rightPaddle) {
            _leftPaddle = leftPaddle;
            _rightPaddle = rightPaddle
        }, 
        getSprite: function()
        {
            return _sprite;
        },
        getBallDirection: function()
        {
            return _sprite.body.velocity;
        }
    }
});