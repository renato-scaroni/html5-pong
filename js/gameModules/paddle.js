/*
Paddle class
*/ 
define(['Constants'], function(Constants) {
    "use strict";

    // Constructor
    function Paddle(spriteName, spritePath)
    {
        // requires new keyword for creating a new instance
        if (!(this instanceof Paddle)) {
            throw new TypeError("Paddle constructor cannot be called as a function.");
        }

        this._spriteName = spriteName;
        this._spritePath = spritePath;
    }
    
    //private variables

    Paddle.prototype = {
        constructor: Paddle,
        preload: function(game) {
            this._game = game;
            this._game.load.image(this._spriteName, this._spritePath);
        },
        create: function(position) {
            this._paddlePosition = position;
            this._sprite = _game.add.sprite(position.x, position.y, this._spriteName);
            this._game.physics.arcade.enable(this._sprite);
            this._sprite.body.collideWorldBounds = true;
            this._sprite.body.immovable = true;
            return this._sprite;
        },
        update: function(){
            if(this._movementController != null)
            {
                this._movementController.update();
            }
        },
        getSprite: function() {
            return this._sprite;
        },
        setMovementController: function(movementController)
        {
            this._movementController = movementController;
            movementController.init(this);
        },
        movePaddle: function (direction)
        {
            this._sprite.body.velocity.y = 0;
            
            switch(direction) 
            {
                case Constants.movementDirection.up:
                    this._sprite.body.velocity.y = -150;
                    break;
                case Constants.movementDirection.down:
                    this._sprite.body.velocity.y = 150;
                    break;
            }
    
        },
        paddleSide: function ()
        {
            if(this._side == null)
            {
                if(this._sprite.x > Constants.screenWidth/2)
                {
                    this._side = Constants.paddlePosition.right;
                }
                else
                {
                    this._side = Constants.paddlePosition.left;
                }
            }

            return this._side;
        }
    };

    //public methods
    return Paddle;

});