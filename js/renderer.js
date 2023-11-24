import { start } from './start.js';
import { snake } from './snake.js';

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

imgData.apple.src = '/images/apple.png';
imgData.obstacle.src = '/images/obstacle.png';
imgData.obstacleTransparent.src = '/images/obstacle-transparent.png';
imgData.powerups.lengthen.src = '/images/powerups/lengthen.png';
imgData.powerups.shorten.src = '/images/powerups/shorten.png';
imgData.powerups.speedUp.src = '/images/powerups/speed-up.png';
imgData.powerups.speedDown.src = '/images/powerups/speed-down.png';
imgData.powerups.points.src = '/images/powerups/points.png';
imgData.powerups.goThroughWalls.src = '/images/powerups/go-through-walls.png';

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
    if(applePosition === null) return;

    drawImg(imgData.apple, applePosition.x, applePosition.y, SQUARE_SIZE, SQUARE_SIZE);
}

function drawPowerup(powerupData) {
    if(Object.keys(powerupData).length === 0) return;

    drawImg(imgData.powerups[powerupData.type], powerupData.x, powerupData.y, SQUARE_SIZE, SQUARE_SIZE);
}

export const renderer = {
    drawBackground,
    drawObstacles,
    drawSnake,
    drawApple,
    drawPowerup
};