var canvas = document.querySelector('#canvas');

function getGameSettings() {
	var userSettings = {
		level: document.querySelector('#level').value,
		speed: document.querySelector('#speed').value,
		powerupSpeedChangeTime: document.querySelector('#speed-change-time').value,
		lengthChange: document.querySelector('#length-change').value
	};

	var chosenLevel = window.levelsConfig['level' + userSettings.level];

	return {
		chosenLevel: chosenLevel,
		snakeSpeed: chosenLevel.speed / userSettings.speed,
		snakepowerupSpeedChangeTime: userSettings.powerupSpeedChangeTime,
		snakeLengthChange: userSettings.lengthChange
	};
}

function toggleSections() {
	document.querySelector('#sn-game-wrap').style.display = "block";
	document.querySelector('#sn-settings-wrap').style.display = "none";
}

window.onload = function() {
	document.querySelector('#sn-settings__start-btn').addEventListener('click', function() {
		var gameSettings = getGameSettings();
		toggleSections();
		gameLogic.setGameSettings(gameSettings);
		gameLogic.startNewGame();
	});
};