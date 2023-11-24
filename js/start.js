import { SETTINGS } from './consts/settings.js';
import { GameLogic } from './gameLogic.js';
import { Renderer } from './renderer.js';

export let renderer = null;
export let gameLogic = null;

export function init() {
	renderer = new Renderer();
	
	document.querySelector('#settings__start-button').addEventListener('click', function() {
		const settings = prepareSettings();
		toggleSections();

		gameLogic = new GameLogic();
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
		snakepowerupSpeedChangeTime: chosenSettings.powerupSpeedChangeTime,
		snakeLengthChange: chosenSettings.lengthChange
	};
}

function toggleSections() {
	document.querySelector('#game').classList.remove("game--hidden");
	document.querySelector('#settings').classList.add("settings--hidden");
	document.querySelector('#header__back-arrow').classList.remove("header__back-arrow--hidden");

	document.querySelector('#header__back-arrow').addEventListener('click', function() {
		clearTimeout(gameLogic.loopGameTimeout);
		gameLogic.resetGameValues();
		document.querySelector('#game__score-list').innerHTML = '';
		document.querySelector('#game').classList.add("game--hidden");
		document.querySelector('#settings').classList.remove("settings--hidden");
		document.querySelector('#header__back-arrow').classList.add("header__back-arrow--hidden");
	});
}