define(function() {
    //public constants
    return{
        movementDirection: {
            up: 1,
            down: -1,
            none: 0
        },
        paddlePosition: {
            right: 1,
            left: -1
        },
        ballDirection: {
            right: 1,
            left: -1   
        },
        screenWidth: 800,
        screenHeight: 600,
        defaultDistanceThreshold: .001
    }
});