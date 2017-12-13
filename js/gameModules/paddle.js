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
            game.physics.arcade.enable(this._sprite);
            this._sprite.body.collideWorldBounds = true;
            this._sprite.body.immovable = true;
            return this._sprite;
        },
        update: function(){

        },
        getSprite: function() {
            return this._sprite;
        }
    };

    //public methods
    return Paddle;

});