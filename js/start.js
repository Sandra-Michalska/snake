import { SETTINGS } from './consts/settings.js';
import { gameLogic } from './gameLogic.js';

const values = {
	canvas: null,
	ctx: null
};

function init() {
	document.querySelector('#settings__start-button').addEventListener('click', function() {
		values.canvas = document.querySelector('#canvas');
		values.ctx = canvas.getContext('2d');
	
		const settings = prepareSettings();
		displayGame();
		gameLogic.setSettings(settings);
		gameLogic.startGame();
	});

	document.querySelector('#header__back-arrow').addEventListener('click', function() {
		clearTimeout(gameLogic.values.loopGameTimeout);
		closeGame();
		displaySettings();
	});
};

function prepareSettings() {
	const chosenSettings = {
		level: document.querySelector('#level').value,
		speed: document.querySelector('#speed').value,
		powerupSpeedChangeTime: document.querySelector('#speed-change-time').value,
		lengthChange: document.querySelector('#length-change').value
	};

	const levelSettings = SETTINGS['level' + chosenSettings.level];

	return {
		levelSettings,
		snakeSpeed: levelSettings.speed / chosenSettings.speed,
		snakePowerupSpeedChangeTime: chosenSettings.powerupSpeedChangeTime,
		snakeLengthChange: chosenSettings.lengthChange
	};
}

function displayGame() {
	document.querySelector('#game').classList.remove("game--hidden");
	document.querySelector('#settings').classList.add("settings--hidden");
	document.querySelector('#header__back-arrow').classList.remove("header__back-arrow--hidden");
}

function displaySettings() {
	document.querySelector('#game').classList.add("game--hidden");
	document.querySelector('#settings').classList.remove("settings--hidden");
	document.querySelector('#header__back-arrow').classList.add("header__back-arrow--hidden");
}

function closeGame() {
	gameLogic.resetGameValues();
	gameLogic.clearPowerupTimeout();
	gameLogic.clearBestScores();
	gameLogic.clearRenderedScoreList();
}

export const start = {
	values,
	init
};