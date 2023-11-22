import { Snake } from './snake.js';
import { Renderer } from './renderer.js';
import { BOARD_SQUARES_NUMBER } from './consts/consts.js'

export function GameLogic() {
    const LOOP_EVERY_N_MS = 1000;
    let score = 0;
    let applesEaten = 0;
    let applePosition = null;
    let powerupData = {};
    let powerupsNumber = 6;
    let	activatePowerup = null;
    let snakeLengthChange = 1;
    let bestScores = [];

    let startGameTimeout;
    let loopGameTimeout;
    let powerupTimeout;
    let powerupTimeoutSet = false;

    let gameSettings = null;
    const that = this;

    const snake = new Snake();
    const renderer = new Renderer();

    this.setSettings = function(settings) {
        gameSettings = settings;
        snake.speed = gameSettings.snakeSpeed;
        snake.powerupSpeedChangeTime = gameSettings.snakepowerupSpeedChangeTime;
        snakeLengthChange = gameSettings.snakeLengthChange;
    }
    
    this.startGame = function() {        
        resetGameValues();
        renderer.drawBackground();
        renderer.drawObstacles(gameSettings.levelSettings.obstaclePositions, snake);
        snake.setPosition();
        renderer.drawSnake(snake);
        generateApplePosition();
        renderer.drawApple(applePosition);
    
        document.addEventListener('keydown', function(e) {
            const keysToDirections = {
                37: 'left',
                38: 'up',
                39: 'right',
                40: 'down'
            };

            const keyPressed = e.which; // TODO
            const direction = keysToDirections[keyPressed];
            snake.changeDirection(e, direction);
        });

        startGameTimeout = setTimeout(function() { loopGame() }, LOOP_EVERY_N_MS);  
    }

    function loopGame() {
        clearTimeout(startGameTimeout);
        clearTimeout(loopGameTimeout);
        snake.canChangeDirection = true;
        renderer.drawBackground(); // to clean previous snake state
        renderer.drawObstacles(gameSettings.levelSettings.obstaclePositions, snake);
        checkIfDrawPowerup();
        renderer.drawPowerup(powerupData);
        renderer.drawApple(applePosition);
        snake.move();
        snake.goThroughBoardEdges();
        renderer.drawSnake(snake);
        checkIfActivatePowerup();
        loseWhenGoingThroughSnake();
        loseWhenGoingThroughObstacles();
        eatApple();

        loopGameTimeout = setTimeout(loopGame, snake.speed * LOOP_EVERY_N_MS);
    }

    function increaseScore(pointsNumber) {
        score += pointsNumber;
    
        document.querySelector('#sn-game__score').innerHTML = score;
    }

    // apple
    function generateApplePosition() {
        if(applePosition) return;
    
        let isPositionAllowed = false;
    
        while(!isPositionAllowed) {
            applePosition = {
                x: Math.floor(Math.random() * BOARD_SQUARES_NUMBER),
                y: Math.floor(Math.random() * BOARD_SQUARES_NUMBER)
            };
    
            isPositionAllowed = true;
            
            for (let i = 0; i < gameSettings.levelSettings.obstaclePositions.length; ++i) {
                if(applePosition.x === gameSettings.levelSettings.obstaclePositions[i].x && applePosition.y === gameSettings.levelSettings.obstaclePositions[i].y) {
                    isPositionAllowed = false;
                }
            }
    
            for (let i = 0; i < snake.getLength(); ++i) {
                if(applePosition.x === snake.getSquarePosition(i).x && applePosition.y === snake.getSquarePosition(i).y) {
                    isPositionAllowed = false;
                }
            }
        }
    }

    function eatApple() {
        const snakeHead = snake.getHead();
    
        if(snakeHead.x === applePosition.x && snakeHead.y === applePosition.y) {
            applePosition = null;
            generateApplePosition();
            renderer.drawApple(applePosition);
            snake.lengthen(1);
            increaseScore(gameSettings.levelSettings.level);
            applesEaten += 1;
    
            if((applesEaten + gameSettings.levelSettings.level) % 3 === 0) {
                preparePowerupData();
            }
        }
    }

    // powerups
    function checkIfDrawPowerup() {
        if(Object.keys(powerupData).length !== 0) {
            if(!powerupTimeoutSet) {
                powerupTimeoutSet = true;
                powerupTimeout = setTimeout(function() {
                    powerupData = {}; // hide powerup
                    powerupTimeoutSet = false;
                }, 10000);
            }
        }
    }

    function checkIfActivatePowerup() {
        if(Object.keys(powerupData).length === 0) return;
        
        if(snake.getHead().x === powerupData.x && 
            snake.getHead().y === powerupData.y) {
            powerupData = {};
            activatePowerup();
        }
    }
    
    function preparePowerupData() {
        generatePowerupPosition();
        generatePowerupType();
    }

    function generatePowerupPosition() {
        let isPositionAllowed = false;
    
        while(!isPositionAllowed) {
            powerupData = {
                x: Math.floor(Math.random() * BOARD_SQUARES_NUMBER),
                y: Math.floor(Math.random() * BOARD_SQUARES_NUMBER)
            };

            isPositionAllowed = true;
            
            for (let i = 0; i < gameSettings.levelSettings.obstaclePositions.length; ++i) {
                if(powerupData.x === gameSettings.levelSettings.obstaclePositions[i].x && powerupData.y === gameSettings.levelSettings.obstaclePositions[i].y) {
                    isPositionAllowed = false;
                }
            }
    
            for (let i = 0; i < snake.getLength(); ++i) {
                if(powerupData.x === snake.getSquarePosition(i).x && powerupData.y === snake.getSquarePosition(i).y) {
                    isPositionAllowed = false;
                }
            }
    
            if(powerupData.x === applePosition.x && powerupData.y === applePosition.y) {
                isPositionAllowed = false;
            }
        }
    }
    
    function clearPowerupTimeout() {
        clearTimeout(powerupTimeout);
        powerupTimeoutSet = false;
        powerupData = {};
    }

    function generatePowerupType() {
        const number = Math.floor(Math.random() * powerupsNumber) + 1;
       
        switch(number) {
            case 1:
                activatePowerup = function() {
                    clearPowerupTimeout();
                    snake.lengthen(snakeLengthChange);
                }
                powerupData.type = 'lengthen';
                break;
            case 2:
                activatePowerup = function() {
                    clearPowerupTimeout();
                    snake.shorten(snakeLengthChange);
                }
                powerupData.type = 'shorten';
                break;
            case 3:
                activatePowerup = function() {
                    clearPowerupTimeout();
                    snake.changeSpeed(2);
                }
                powerupData.type = 'speedDown';
                break;
            case 4:
                activatePowerup = function() {
                    clearPowerupTimeout();
                    snake.changeSpeed(0.5);
                }
                powerupData.type = 'speedUp';
                break;
            case 5:
                activatePowerup = function() {
                    clearPowerupTimeout();
                    increaseScore(10);
                }
                powerupData.type = 'points';
                break;
            case 6:
                activatePowerup = function() {
                    clearPowerupTimeout();
                    snake.goThroughWalls();
                }
                powerupData.type = 'goThroughWalls';
                break;
        }
    }

    // finish game
    function resetGameValues() {
        score = 0;
        applesEaten = 0;
        powerupTimeoutSet = false;

        snake.resetVales();
        
        document.querySelector('#sn-game__score').innerHTML = 0;
    }

    function addScoreToBestScores(score) {
        bestScores.push(score);

        bestScores = bestScores.sort(function (b, a) {
            return a - b;
        });

        document.querySelector('#sn-game__score-list').innerHTML = "";

        for(let i = 0; i < 5; i++) {
            if(bestScores[i]) {	
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(bestScores[i]));
                document.querySelector('#sn-game__score-list').appendChild(li).classList.add('sn-game__score-list-item');
            }
        }
    }

    function loseWhenGoingThroughSnake() {
        const snakeHead = snake.getHead();
    
        for (let i = 1; i < snake.getLength(); ++i) {
            if(snakeHead.x === snake.getSquarePosition(i).x && snakeHead.y === snake.getSquarePosition(i).y) {
                finishGame();
            }
        }
    }

    function loseWhenGoingThroughObstacles() {
        if(snake.canGoThroughWalls) return;
        
        const snakeHead = snake.getHead();

        for (let i = 0; i < gameSettings.levelSettings.obstaclePositions.length; ++i) {
            if(snakeHead.x === gameSettings.levelSettings.obstaclePositions[i].x && snakeHead.y === gameSettings.levelSettings.obstaclePositions[i].y) {
                finishGame();
            }
        }
    }

    function finishGame() {
        addScoreToBestScores(score);
        clearPowerupTimeout();
        that.startGame();
    }
}