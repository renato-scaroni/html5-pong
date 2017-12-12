/*
Ball module
Dependencies: Constants
*/
define(['Constants', 'Score'], function(Constants, Score) {

    //Private variables
    var _game = null,
        _sprite = null,
        _cursors = null,
        _leftPaddle = null,
        _rightPaddle = null,
        _baseBallSpeed = 150,
        _ballSpeed = 150;

    //Private functions
    function setBallMovement(ball, direction, targetBallSpeed = _baseBallSpeed)
    {
        ball.ballDirection = ballDirection = {
            x: direction.x,
            y: direction.y
        }
    
        ball.body.velocity.x = targetBallSpeed * ball.ballDirection.x;
        ball.body.velocity.y = targetBallSpeed * ball.ballDirection.y;
    }

    function handlePaddleCollision (ball, paddle) 
    {
        if(ball != null && paddle != null)
        {
            // TODO: apply modifiers according  to paddle movement
        }
    }
    
    function handleBallCollisions()
    {
        // checks for collisions
        _game.physics.arcade.collide(_sprite, _leftPaddle, handlePaddleCollision, null, this);
        _game.physics.arcade.collide(_sprite, _rightPaddle, handlePaddleCollision, null, this);
    
        // checks if ball hit the wall
        if(_sprite.body.onWall())
        {
            if(_sprite.x < _game.scale.viewportWidth)
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
    
    function resetBallMovement(xDirection = Constants.ballDirection.right)
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
            _sprite.body.bounce.x = .95;
            _sprite.body.bounce.y = .95;
            _sprite.body.collideWorldBounds = true;
            _sprite.body.onWorldBounds = new Phaser.Signal();

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