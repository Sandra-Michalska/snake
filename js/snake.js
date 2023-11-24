import { gameLogic } from './gameLogic.js';

let squaresPositions = [];
let currentDirection = 'right';

const values = {
    canChangeDirection: true,
    canGoThroughWalls: false,
    speed: 0,
    powerupSpeedChangeTime: 0
};

function setPosition() {
    squaresPositions.push({x: 2, y: 0}, {x: 1, y: 0}, {x: 0, y: 0});
}

function getSquarePosition(i) {
    return squaresPositions[i];
}

function getHead() {
    return squaresPositions[0];
}

function getLength() {
    return squaresPositions.length;
}

function move() {
    for(let i = squaresPositions.length - 1; i > 0; i--) {
        squaresPositions[i].x = squaresPositions[i-1].x;
        squaresPositions[i].y = squaresPositions[i-1].y;
    }

    if(currentDirection === 'right') {
        squaresPositions[0].x++;
    }

    if(currentDirection === 'left') {
        squaresPositions[0].x--;
    }

    if(currentDirection === 'down') {
        squaresPositions[0].y++;
    }

    if(currentDirection === 'up') {
        squaresPositions[0].y--;
    }
}

function changeDirection(e, direction) {
    if(!values.canChangeDirection) return;

    if(direction) {
        e.preventDefault();

        if(currentDirection === 'right' && direction === 'left') return;
        if(currentDirection === 'left' && direction === 'right') return;
        if(currentDirection === 'up' && direction === 'down') return;
        if(currentDirection === 'down' && direction === 'up') return;
    
        currentDirection = direction;
        values.canChangeDirection = false;
    }
}

function lengthen(squaresNumber) {
    const lastSquare = squaresPositions[squaresPositions.length - 1];

    for(let i = 0; i < squaresNumber; i++) {
        squaresPositions.push({x: lastSquare.x, y: lastSquare.y});
    }
}

function shorten(squaresNumber) {
    for(let i = 0; i < squaresNumber; i++) {
        squaresPositions.pop();
    }
}

function changeSpeed(speedChange) {
    values.speed *= speedChange;

    setTimeout(function() {
        values.speed /= speedChange;
    }, values.powerupSpeedChangeTime * 1000);
}

function goThroughBoardEdges() {
    if(squaresPositions[0].x > gameLogic.values.BOARD_SQUARES_NUMBER - 1) {
        squaresPositions[0].x = 0;
    }

    if(squaresPositions[0].x < 0) {
        squaresPositions[0].x = gameLogic.values.BOARD_SQUARES_NUMBER - 1;
    }
    
    if(squaresPositions[0].y > gameLogic.values.BOARD_SQUARES_NUMBER - 1) {
        squaresPositions[0].y = 0;
    }

    if(squaresPositions[0].y < 0) {
        squaresPositions[0].y = gameLogic.values.BOARD_SQUARES_NUMBER - 1;
    }
};

function goThroughWalls() {
    values.canGoThroughWalls = true;
    
    setTimeout(function() {
        values.canGoThroughWalls = false;
    }, 7000);
}

function resetVales() {
    squaresPositions = [];
    currentDirection = 'right';
}

export const snake = {
    values,
    setPosition,
    getSquarePosition,
    getHead,
    getLength,
    move,
    changeDirection,
    goThroughBoardEdges,
    lengthen,
    shorten,
    changeSpeed,
    goThroughWalls,
    resetVales
};