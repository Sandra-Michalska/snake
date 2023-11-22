import { SETTINGS } from './consts/settings.js';
import { GameLogic } from './gameLogic.js';

export function init() {
	document.querySelector('#settings__start-btn').addEventListener('click', function() {
		const settings = prepareSettings();
		toggleSections();

		const gameLogic = new GameLogic();
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
	document.querySelector('#game-wrapper').style.display = 'block'; // TODO
	document.querySelector('#settings-wrapper').style.display = 'none';
}