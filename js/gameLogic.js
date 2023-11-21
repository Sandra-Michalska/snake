function GameLogic() {
    this.BOARD_SQUARES_NUMBER = 20;
    var LOOP_EVERY_N_MS = 1000;
    var score = 0;
    var applesEaten = 0;
    var applePosition = null;
    var powerupData = {};
    var powerupsNumber = 6;
    var	activatePowerup = null;
    var snakeLengthChange = 1;
    var bestScores = [];

    var startNewGameTimeout;
    var loopGameTimeout;
    var powerupTimeout;
    var powerupTimeoutSet = false;

    var snake = new Snake();
    var gameSettings = null;
    var that = this;

    this.setGameSettings = function(settings) {
        gameSettings = settings;
        snake.speed = gameSettings.snakeSpeed;
        snake.powerupSpeedChangeTime = gameSettings.snakepowerupSpeedChangeTime;
        snakeLengthChange = gameSettings.snakeLengthChange;
    }
    
    this.startNewGame = function() {        
        resetGameValues();
        renderer.drawBackground();
        renderer.drawObstacles(gameSettings.chosenLevel.obstaclesPositions, snake);
        snake.setPosition();
        renderer.drawSnake(snake);
        generateApplePosition();
        renderer.drawApple(applePosition);
    
        document.addEventListener('keydown', function(e) {
            var keysToDirections = {
                37: 'left',
                38: 'up',
                39: 'right',
                40: 'down'
            };

            var keyPressed = e.which;
            var direction = keysToDirections[keyPressed];
            snake.changeDirection(e, direction);
        });

        startNewGameTimeout = setTimeout(function() { loopGame() }, LOOP_EVERY_N_MS);  
    }

    function loopGame() {
        clearTimeout(startNewGameTimeout);
        clearTimeout(loopGameTimeout);
        snake.canChangeDirection = true;
        renderer.drawBackground(); // to clean previous snake state
        renderer.drawObstacles(gameSettings.chosenLevel.obstaclesPositions, snake);
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
    
        var isPositionAllowed = false;
    
        while(!isPositionAllowed) {
            applePosition = {
                x: Math.floor(Math.random() * that.BOARD_SQUARES_NUMBER),
                y: Math.floor(Math.random() * that.BOARD_SQUARES_NUMBER)
            };
    
            isPositionAllowed = true;
            
            for (var i = 0; i < gameSettings.chosenLevel.obstaclesPositions.length; ++i) {
                if(applePosition.x === gameSettings.chosenLevel.obstaclesPositions[i].x && applePosition.y === gameSettings.chosenLevel.obstaclesPositions[i].y) {
                    isPositionAllowed = false;
                }
            }
    
            for (var i = 0; i < snake.getLength(); ++i) {
                if(applePosition.x === snake.getSquarePosition(i).x && applePosition.y === snake.getSquarePosition(i).y) {
                    isPositionAllowed = false;
                }
            }
        }
    }

    function eatApple() {
        var snakeHead = snake.getHead();
    
        if(snakeHead.x === applePosition.x && snakeHead.y === applePosition.y) {
            applePosition = null;
            generateApplePosition();
            renderer.drawApple(applePosition);
            snake.lengthen(1);
            increaseScore(gameSettings.chosenLevel.level);
            applesEaten += 1;
    
            if((applesEaten + gameSettings.chosenLevel.level) % 3 === 0) {
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
        var isPositionAllowed = false;
    
        while(!isPositionAllowed) {
            powerupData = {
                x: Math.floor(Math.random() * that.BOARD_SQUARES_NUMBER),
                y: Math.floor(Math.random() * that.BOARD_SQUARES_NUMBER)
            };

            isPositionAllowed = true;
            
            for (var i = 0; i < gameSettings.chosenLevel.obstaclesPositions.length; ++i) {
                if(powerupData.x === gameSettings.chosenLevel.obstaclesPositions[i].x && powerupData.y === gameSettings.chosenLevel.obstaclesPositions[i].y) {
                    isPositionAllowed = false;
                }
            }
    
            for (var i = 0; i < snake.getLength(); ++i) {
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
        var number = Math.floor(Math.random() * powerupsNumber) + 1;
       
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

        for(var i = 0; i < 5; i++) {
            if(bestScores[i]) {	
                var li = document.createElement('li');
                li.appendChild(document.createTextNode(bestScores[i]));
                document.querySelector('#sn-game__score-list').appendChild(li).classList.add('sn-game__score-list-item');
            }
        }
    }

    function loseWhenGoingThroughSnake() {
        var snakeHead = snake.getHead();
    
        for (var i = 1; i < snake.getLength(); ++i) {
            if(snakeHead.x === snake.getSquarePosition(i).x && snakeHead.y === snake.getSquarePosition(i).y) {
                finishGame();
            }
        }
    }

    function loseWhenGoingThroughObstacles() {
        if(snake.canGoThroughWalls) return;
        
        var snakeHead = snake.getHead();

        for (var i = 0; i < gameSettings.chosenLevel.obstaclesPositions.length; ++i) {
            if(snakeHead.x === gameSettings.chosenLevel.obstaclesPositions[i].x && snakeHead.y === gameSettings.chosenLevel.obstaclesPositions[i].y) {
                finishGame();
            }
        }
    }

    function finishGame() {
        addScoreToBestScores(score);
        clearPowerupTimeout();
        that.startNewGame();
    }
}

var gameLogic = new GameLogic();
