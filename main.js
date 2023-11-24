import './style.css';
import { start } from './js/start.js';

document.querySelector('#app').innerHTML = `
  <div class="wrapper">
    <header class="header">
      <span id="header__back-arrow" class="header__back-arrow header__back-arrow--hidden" title="Go back to settings"><</span>
      <div class="header__heading-wrapper">
        <h1 class="header__heading">Snake</h1>
      </div>
    </header>
    <section id="settings" class="settings">
      <fieldset class="settings__fieldset">
        <legend class="settings__title">Settings</legend>

        <section class="settings__option">
          <label class="settings__label" for="level">Level</label>
          <select id="level" class="settings__select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </section>
        <section class="settings__option">
          <label class="settings__label" for="speed">Snake speed</label>
          <select id="speed" class="settings__select">
            <option value="1">slow</option>
            <option value="2">medium</option>
            <option value="3">fast</option>
          </select>
        </section>
        <section class="settings__option">
          <label class="settings__label" for="speed-change-time">Snake speed change after catching a powerup</label>
          <select id="speed-change-time" class="settings__select">
            <option value="1">1 second</option>
            <option value="2">2 seconds</option>
            <option value="3">3 seconds</option>
          </select>
        </section>
        <section class="settings__option">
          <label class="settings__label" for="length-change">Snake length change after catching a powerup</label>
          <select id="length-change" class="settings__select">
            <option value="1">1 cell</option>
            <option value="2">2 cells</option>
            <option value="3">3 cells</option>
          </select>
        </section>

        <div class="settings__button-wrapper">
          <button type="button" id="settings__start-button" class="settings__start-button">Start</button>
        </div>
      </fieldset>
    </section>

    <section id="game" class="game game--hidden">
        <section>
          <p class="game__score-text">Score: <span id="game__score">0</span></p>
          <canvas id="canvas" class="game__canvas" height="601px" width="601px"></canvas>
        </section>

        <section class="game__best-scores">
          <p class="game__best-scores-text">Best scores:</p>
          <ol id="game__score-list" class="game__score-list"></ol>
        </section>
    </section>
  </div>
`;

start.init();
