import { SETTINGS } from './consts/settings.js';
import { gameLogic } from './gameLogic.js';

const values = {
	canvas: null,
	ctx: null
};

function init() {
	values.canvas = document.querySelector('#canvas');
	values.ctx = canvas.getContext('2d');
	
	document.querySelector('#settings__start-button').addEventListener('click', function() {
		const settings = prepareSettings();
		toggleSections();
		gameLogic.setSettings(settings);
		gameLogic.startGame();
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

function toggleSections() {
	document.querySelector('#game').classList.remove("game--hidden");
	document.querySelector('#settings').classList.add("settings--hidden");
	document.querySelector('#header__back-arrow').classList.remove("header__back-arrow--hidden");

	document.querySelector('#header__back-arrow').addEventListener('click', function() {
		clearTimeout(gameLogic.values.loopGameTimeout);
		gameLogic.resetGameValues();
		gameLogic.values.bestScores = [];
		document.querySelector('#game__score-list').innerHTML = '';
		document.querySelector('#game').classList.add("game--hidden");
		document.querySelector('#settings').classList.remove("settings--hidden");
		document.querySelector('#header__back-arrow').classList.add("header__back-arrow--hidden");
	});
}

export const start = {
	values,
	init
};