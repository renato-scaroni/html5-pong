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

    // class definition
    PaddleAIController.prototype = {
        constructor: PaddleAIController,
        update: function()
        {
            this._paddle.movePaddle(this.ai());
        },
        calculateBallTarget: function(ballDirection)
        {
            var ballXDistance = this._paddle.getSprite().x - Ball.getSprite().x;
            var angle = Phaser.Math.angleBetween(ballDirection.x, ballDirection.y, 1, 0);
            this._ballTarget = Ball.getSprite().y + Math.tan(angle) * ballXDistance;
        },
        onColision: function()
        {

        },
        ai: function()
        {
            var ballDirection = Ball.getBallDirection();
            // ball is moving towards my side =/
            if(ballDirection.x/this._paddleSide > 0)
            {
                var yDirectionComponent = ballDirection.y;
                var yMovementDirection = yDirectionComponent/Math.abs(yDirectionComponent);
                if(this._ballTarget == null || Ball.getSprite().body.checkWorldBounds())
                {
                    this.calculateBallTarget(ballDirection)
                }

                var targetDistance = this._paddle.getSprite().y - this._ballTarget;
                var targetDistanceAbs = Math.abs(targetDistance);
                if(targetDistanceAbs > Constants.defaultDistanceThreshold)
                {
                    // needs to move
                    // this returns -1 for down and 1 for up
                    return targetDistance/targetDistanceAbs;
                }
                else
                {
                    // position is good enough
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
        }
    };

    //public methods
    return PaddleAIController;

});