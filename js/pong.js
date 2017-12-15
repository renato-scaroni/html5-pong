/*
Game main class, control game scene elements
*/
requirejs.config({
    baseUrl: 'js',
    paths: {
        Phaser: 'lib/phaser.min',
        Ball: 'gameModules/ball',
        Constants: 'gameModules/constants',
        Score: 'gameModules/score',
        Paddle: 'gameModules/paddle',
        PaddleInputController: 'gameModules/paddleInputController',
        PaddleAIController: 'gameModules/paddleAIController',
        MainGameState: 'gameModules/mainGameState',
        NewGameState: 'gameModules/newGameState',
        EndGameState: 'gameModules/endGameState',
      }
});

require(['MainGameState', 'NewGameState', 'EndGameState'],function(){

    // Create game instance
    var game = new Phaser.Game(Constants.screenWidth, Constants.screenHeight, Phaser.AUTO, 'game');
    
    var mainGameState = require('MainGameState');
    var newGameState = require('NewGameState');
    var endGameState = require('EndGameState');
    
    game.state.add('mainGame', mainGameState);
    mainGameState._game = game;
    game.state.add('newGame', newGameState);
    newGameState._game = game;
    game.state.add('endGame', endGameState);
    endGameState._game = game;

    game.state.start('newGame');
});