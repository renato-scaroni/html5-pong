define(['Phaser'],function() {
    // Importing modules
    Phaser = require('Phaser');

    //Private variables
    var _endGameTextObj = null,
        _endGameTextObj2 = null,
        _endGameTextObj3 =  null,
        _headerText = "You suck on the....",
        _headerText2 = "The most amazing pong game ever!!!1!11!",
        _headerText3 = "press spacebar to play again";
    
    //public constants
    return    {
        preload: function()
        {
            this._game.load.image('courtGfx', 'assets/sprites/court.png');
        },
        create: function () 
        {
            this._game.add.sprite(0, 0, 'courtGfx');

            _endGameTextObj = this._game.add.text(64, 16, _headerText, { fontSize: '32px', fill: '#111', color: '#111' });
            _endGameTextObj2 = this._game.add.text(32, 250, _headerText2, { fontSize: '38px', fill: '#010', color: '#010' });
            _endGameTextObj3 = this._game.add.text(64, 400, _headerText3, { fontSize: '32px', fill: '#111', color: '#111' });

            this.spaceKey = this._game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            
            //  Stop the following keys from propagating up to the browser
            this._game.input.keyboard.addKeyCapture([ Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR ]);                        
        },
        update: function() 
        {
            if (this.spaceKey.isDown)
            {
                this._game.state.start('mainGame');
            }
        }
    }});