import { start } from './start.js';
import { snake } from './snake.js';
import apple from '/images/apple.png';
import obstacle from '/images/obstacle.png';
import obstacleTransparent from '/images/obstacle-transparent.png';
import lengthen from '/images/powerups/lengthen.png';
import shorten from '/images/powerups/shorten.png';
import speedUp from '/images/powerups/speed-up.png';
import speedDown from '/images/powerups/speed-down.png';
import points from '/images/powerups/points.png';
import goThroughWalls from '/images/powerups/go-through-walls.png';

const SQUARE_SIZE = 29;
const LINE_WIDTH = 1;
const LINE_EVERY_N_PX = 30;

const imgData = {
    apple: new Image(),
    obstacle: new Image(),
    obstacleTransparent: new Image(),
    powerups: {
        lengthen: new Image(),
        shorten: new Image(),
        speedUp: new Image(),
        speedDown: new Image(),
        points: new Image(),
        goThroughWalls: new Image(),
    }
};

imgData.apple.src = apple;
imgData.obstacle.src = obstacle;
imgData.obstacleTransparent.src = obstacleTransparent;
imgData.powerups.lengthen.src = lengthen;
imgData.powerups.shorten.src = shorten;
imgData.powerups.speedUp.src = speedUp;
imgData.powerups.speedDown.src = speedDown;
imgData.powerups.points.src = points;
imgData.powerups.goThroughWalls.src = goThroughWalls;

function drawImg(imgToDisplay, x, y, width, height) {
    const imgXPosition = x * (LINE_WIDTH + SQUARE_SIZE) + LINE_WIDTH;
    const imgYPosition = y * (LINE_WIDTH + SQUARE_SIZE) + LINE_WIDTH;

    start.values.ctx.drawImage(imgToDisplay, imgXPosition, imgYPosition, width, height);
}

function drawSnakeSquare(x, y, color) {
    const addXOffset = LINE_WIDTH * x + LINE_WIDTH;
    const addYOffset = LINE_WIDTH * y + LINE_WIDTH;

    start.values.ctx.fillStyle = color;
    start.values.ctx.fillRect(x * SQUARE_SIZE + addXOffset, y * SQUARE_SIZE + addYOffset, SQUARE_SIZE, SQUARE_SIZE);
}

function drawBackground() {
    start.values.ctx.fillStyle = '#fff';
    start.values.ctx.strokeStyle = '#e1dfdc';
    
    start.values.ctx.fillRect(0, 0, start.values.canvas.height, start.values.canvas.width);

    for(let x = 0.5; x < start.values.canvas.width; x += LINE_EVERY_N_PX) {
        start.values.ctx.moveTo(x, 0);
        start.values.ctx.lineTo(x, start.values.canvas.height);
    }
    for(let y = 0.5; y < start.values.canvas.height; y += LINE_EVERY_N_PX) {
        start.values.ctx.moveTo(0, y);
        start.values.ctx.lineTo(start.values.canvas.width, y);
    }

    start.values.ctx.stroke();
}

function drawObstacles(obstaclePositions) {
    let obstacleImg = 'obstacle';

    if(snake.values.canGoThroughWalls) {
        obstacleImg = 'obstacleTransparent';
    }

    obstaclePositions.forEach(function(obstacle) {
        drawImg(imgData[obstacleImg], obstacle.x, obstacle.y, SQUARE_SIZE, SQUARE_SIZE);
    })
}

function drawSnake() {
    for(let i = 0; i < snake.getLength(); i++) {
        if(i === 0) {
            drawSnakeSquare(snake.getSquarePosition(i).x, snake.getSquarePosition(i).y, '#e67312');
            continue;
        }

        drawSnakeSquare(snake.getSquarePosition(i).x, snake.getSquarePosition(i).y, '#fc9125');
    }
}

function drawApple(applePosition) {
    drawImg(imgData.apple, applePosition.x, applePosition.y, SQUARE_SIZE, SQUARE_SIZE);
}

function drawPowerup(powerupData) {
    drawImg(imgData.powerups[powerupData.type], powerupData.x, powerupData.y, SQUARE_SIZE, SQUARE_SIZE);
}

export const renderer = {
    drawBackground,
    drawObstacles,
    drawSnake,
    drawApple,
    drawPowerup
};