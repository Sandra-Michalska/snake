import { BOARD_SQUARES_NUMBER } from './consts/consts.js'

export function Snake() {
    let squaresPositions = [];
    let currentDirection = 'right';
    this.canChangeDirection = true;
    this.canGoThroughWalls = false;

    this.speed = 0;
    this.powerupSpeedChangeTime = 0;

    const that = this;

    this.setPosition = function() {
        squaresPositions.push({x: 2, y: 0}, {x: 1, y: 0}, {x: 0, y: 0});
    }

    this.getSquarePosition = function(i) {
        return squaresPositions[i];
    }

    this.getHead = function() {
        return squaresPositions[0];
    }

    this.getLength = function() {
        return squaresPositions.length;
    }

    this.move = function() {
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

    this.changeDirection = function(e, direction) {
        if(!this.canChangeDirection) return;

        if(direction) {
            e.preventDefault();

            if(currentDirection === 'right' && direction === 'left') return;
            if(currentDirection === 'left' && direction === 'right') return;
            if(currentDirection === 'up' && direction === 'down') return;
            if(currentDirection === 'down' && direction === 'up') return;
        
            currentDirection = direction;
            this.canChangeDirection = false;
        }
    }

    this.goThroughBoardEdges = function() {
        if(squaresPositions[0].x > BOARD_SQUARES_NUMBER - 1) {
            squaresPositions[0].x = 0;
        }

        if(squaresPositions[0].x < 0) {
            squaresPositions[0].x = BOARD_SQUARES_NUMBER - 1;
        }
        
        if(squaresPositions[0].y > BOARD_SQUARES_NUMBER - 1) {
            squaresPositions[0].y = 0;
        }

        if(squaresPositions[0].y < 0) {
            squaresPositions[0].y = BOARD_SQUARES_NUMBER - 1;
        }
    };

    this.lengthen = function(squaresNumber) {
        const lastSquare = squaresPositions[squaresPositions.length - 1];
    
        for(let i = 0; i < squaresNumber; i++) {
            squaresPositions.push({x: lastSquare.x, y: lastSquare.y});
        }
    }

    this.shorten = function(squaresNumber) {
        for(let i = 0; i < squaresNumber; i++) {
            squaresPositions.pop();
        }
    }

    this.changeSpeed = function(speedChange) {
        this.speed *= speedChange;

        setTimeout(function() {
            that.speed /= speedChange;
        }, that.powerupSpeedChangeTime * 1000);
    }

    this.goThroughWalls = function() {
        this.canGoThroughWalls = true;
        
        setTimeout(function() {
            that.canGoThroughWalls = false;
        }, 7000);
    }

    this.resetVales = function() {
        squaresPositions = [];
        currentDirection = 'right';
    }
}