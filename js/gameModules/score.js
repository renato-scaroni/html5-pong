/*
Score Module

*/ 
define(['Constants'], function(Constants) {

    //private variables
    var _leftPlayerScore = 0,
        _rightPlayerScore = 0,
        _baseScoreText = " x ",
        _scoreTextHudObj = null;

    //private functions
    function updateScoreText() {
        _scoreTextHudObj.setText(_leftPlayerScore + _baseScoreText +  _rightPlayerScore);
    }

    function gameFinished(playerScore)
    {
        return playerScore >= Constants.maxGameScore;
    }

    //public methods
    return{
        incrementLeftScore: function(){
            _leftPlayerScore = _leftPlayerScore + 1;
            
            console.log("updateing score left");

            if(gameFinished(_leftPlayerScore))
            {
                _game.state.start('endGame');
            }

            updateScoreText();
        },
        incrementRightScore: function(){
            _rightPlayerScore = _rightPlayerScore + 1;
            console.log("updateing score roght");
            console.log(gameFinished(_rightPlayerScore));

            if(gameFinished(_rightPlayerScore))
            {
                _game.state.start('endGame');
            }
            
            updateScoreText();
        },                  
        init: function(game) {
            _game = game;
        },
        create: function() {
            _scoreTextHudObj = _game.add.text(16, 16, "", { fontSize: '32px', fill: '#000' });            
            
            updateScoreText();
        },
        resetScore: function() {
            _leftPlayerScore = 0;
            _rightPlayerScore = 0;
            
            updateScoreText();
        }
    }
});