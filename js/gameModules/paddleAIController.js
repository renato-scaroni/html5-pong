/*
PaddleAIController class
Dependencies: Constants and Ball
*/ 
define(['Constants', 'Ball', 'Phaser'], function(Constants, Ball, Phaser) {
    "use strict";

    // Constructor
    function PaddleAIController()
    {
        // requires new keyword for creating a new instance
        if (!(this instanceof PaddleAIController)) {
            throw new TypeError("Paddle constructor cannot be called as a function.");
        }

        this._lastDirection = Constants.movementDirection.none;
        this._ballTarget = null;
    }

    function runAI(padddle, time)
    {

    }

    // class definition
    PaddleAIController.prototype = {
        constructor: PaddleAIController,
        update: function()
        {
            this._paddle.getSprite().game.debug.bodyInfo(Ball.getSprite(), 32, 32);
            this._paddle.movePaddle(this.ai());
        },
        ai: function()
        {
            var ballDirection = Ball.getBallDirection();
            // ball is moving towards my side =/
            if(ballDirection.x/this._paddleSide > 0)
            {
                var yDirectionComponent = ballDirection.y;
                var yMovementDirection = yDirectionComponent/Math.abs(yDirectionComponent);
                if(this._ballTarget == null)
                {
                    var ballXDistance = this._game.world._width - Ball.getSprite().x;
                    var angle = Phaser.Math.angleBetween(ballDirection.x, ballDirection.y, 1, 0);
                    if(yMovementDirection > 0)
                    {
                        this._ballTarget = Ball.getSprite().y - Math.tan(angle) * ballXDistance;
                    }
                    else
                    {
                        this._ballTarget = Ball.getSprite().y + Math.tan(angle) * ballXDistance;    
                    }
                }
                if(this._paddle.getSprite().y - this._ballTarget > Constants.defaultDistanceThreshold)
                {
                    // Go to Constants to see the direction mapping
                    return -yMovementDirection;
                }
                else
                {
                    return Constants.movementDirection.none;
                }
            }
            else
            {
                this._ballTarget = null;
                if(Math.abs(this._paddle.getSprite().y - this._game.world.centerY) < Constants.defaultDistanceThreshold)
                {
                    if(this._paddle.getSprite().y < this._game.world.centerY)
                    {
                        return Constants.movementDirection.up;
                    }
                    else
                    {
                        return Constants.movementDirection.down;
                    }
                }
            }

            return Constants.movementDirection.none;
        },
        movePaddle: function()
        {

        },
        init: function(paddle)
        {
            this._paddle = paddle;
            this._game = paddle.getSprite().game;
            this._paddleSide = paddle.paddleSide()
            // this._game.time.events.repeat(Phaser.Timer.SECOND * 1, 0, movePaddle, this);
        }
    };

    //public methods
    return PaddleAIController;

});