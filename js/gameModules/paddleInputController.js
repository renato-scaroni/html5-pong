/*
paddleInputController class
*/ 
define(['Constants'], function(Constants) {
    "use strict";

    // Constructor
    function PaddleInputController(inputConfig)
    {
        // requires new keyword for creating a new instance
        if (!(this instanceof PaddleInputController)) {
            throw new TypeError("Paddle constructor cannot be called as a function.");
        }

        this._inputConfig = inputConfig;
    }

    // class definition
    PaddleInputController.prototype = {
        constructor: PaddleInputController,
        update: function()
        {
            if (this._inputConfig.up.isDown)
            {
                this._paddle.movePaddle(Constants.movementDirection.up);
            }
            else if (this._inputConfig.down.isDown)
            {
                this._paddle.movePaddle(Constants.movementDirection.down);
            }
            else
            {
                this._paddle.movePaddle(Constants.movementDirection.none);
            }
        },
        init: function(paddle)
        {
            this._paddle = paddle;
        }
    };

    //public methods
    return PaddleInputController;

});