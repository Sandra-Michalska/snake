export function Renderer() {
    const SQUARE_SIZE = 29;
    const LINE_WIDTH = 1;
    const LINE_EVERY_N_PX = 30;
    const imgData = {};
    const ctx = canvas.getContext('2d');

    // prepare images
    imgData.apple = new Image();
    imgData.apple.src = '/images/apple.png';

    imgData.obstacle = new Image();
    imgData.obstacle.src = '/images/obstacle.png';

    imgData.obstacleTransparent = new Image();
    imgData.obstacleTransparent.src = '/images/obstacle-transparent.png';

    // prepare images - powerups
    imgData.lengthen = new Image();
    imgData.lengthen.src = '/images/powerups/lengthen.png';

    imgData.shorten = new Image();
    imgData.shorten.src = '/images/powerups/shorten.png';

    imgData.speedUp = new Image();
    imgData.speedUp.src = '/images/powerups/speed-up.png';

    imgData.speedDown = new Image();
    imgData.speedDown.src = '/images/powerups/speed-down.png';

    imgData.points = new Image();
    imgData.points.src = '/images/powerups/points.png';

    imgData.goThroughWalls = new Image();
    imgData.goThroughWalls.src = '/images/powerups/go-through-walls.png';

    function drawImg(imgToDisplay, x, y, width, height) {
        const imgXPosition = x * (LINE_WIDTH + SQUARE_SIZE) + LINE_WIDTH;
        const imgYPosition = y * (LINE_WIDTH + SQUARE_SIZE) + LINE_WIDTH;
    
        ctx.drawImage(imgToDisplay, imgXPosition, imgYPosition, width, height);
    }

    function drawSnakeSquare(x, y, color) {
        const addXOffset = LINE_WIDTH * x + LINE_WIDTH;
        const addYOffset = LINE_WIDTH * y + LINE_WIDTH;

        ctx.fillStyle = color;
        ctx.fillRect(x * SQUARE_SIZE + addXOffset, y * SQUARE_SIZE + addYOffset, SQUARE_SIZE, SQUARE_SIZE);
    }

    this.drawBackground = function() {
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#f2ecd7';
        
        ctx.fillRect(0, 0, canvas.height, canvas.width);

        for(let x = 0.5; x < canvas.width; x += LINE_EVERY_N_PX) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
        }
        for(let y = 0.5; y < canvas.height; y += LINE_EVERY_N_PX) {
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
        }

        ctx.stroke();
    }

    this.drawObstacles = function(obstaclesPositions, snake) {
        let obstacleImg = "obstacle";

        if(snake.canGoThroughWalls) {
            obstacleImg = "obstacleTransparent";
        }

        obstaclesPositions.forEach(function(obstacle) {
            drawImg(imgData[obstacleImg], obstacle.x, obstacle.y, SQUARE_SIZE, SQUARE_SIZE);
        })
    }

    this.drawSnake = function(snake) {
        for(let i = 0; i < snake.getLength(); i++) {
            if(i === 0) {
                drawSnakeSquare(snake.getSquarePosition(i).x, snake.getSquarePosition(i).y, '#e67312');
                continue;
            }

            drawSnakeSquare(snake.getSquarePosition(i).x, snake.getSquarePosition(i).y, '#fc9125');
        }
    }

    this.drawApple = function(applePosition) {
        if(applePosition === null) return;

        drawImg(imgData.apple, applePosition.x, applePosition.y, SQUARE_SIZE, SQUARE_SIZE);
    }

    this.drawPowerup = function(powerupData) {
        if(Object.keys(powerupData).length === 0) return;

        drawImg(imgData[powerupData.type], powerupData.x, powerupData.y, SQUARE_SIZE, SQUARE_SIZE);
    }
}

// const renderer = new Renderer(canvas); // TODO