import { SETTINGS } from './consts/settings.js';
import { GameLogic } from './gameLogic.js';

export let gameLogic = null; // TODO

export function init() {	
	window.onload = function() {	
		// window.canvas = document.querySelector('#canvas'); // TODO

		document.querySelector('#sn-settings__start-btn').addEventListener('click', function() {
			const gameSettings = getGameSettings();
			toggleSections();

			gameLogic = new GameLogic();
			gameLogic.setGameSettings(gameSettings);
			gameLogic.startNewGame();
		});
	}
};

function getGameSettings() {
	const userSettings = {
		level: document.querySelector('#level').value,
		speed: document.querySelector('#speed').value,
		powerupSpeedChangeTime: document.querySelector('#speed-change-time').value,
		lengthChange: document.querySelector('#length-change').value
	};

	const chosenLevel = SETTINGS['level' + userSettings.level];

	return {
		chosenLevel: chosenLevel,
		snakeSpeed: chosenLevel.speed / userSettings.speed,
		snakepowerupSpeedChangeTime: userSettings.powerupSpeedChangeTime,
		snakeLengthChange: userSettings.lengthChange
	};
}

function toggleSections() {
	document.querySelector('#sn-game-wrap').style.display = "block"; // TODO
	document.querySelector('#sn-settings-wrap').style.display = "none";
}