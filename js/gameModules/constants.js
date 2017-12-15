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
        defaultDistanceThreshold: 10,

        paddleSpeed: 300,
        paddleSegmentsMax: 4,
        paddleSegmentHeight: 4,
        paddleSegmentAngle: 15,
        
        ballSpeed: 250,
        
        maxGameScore: 7
    }
});