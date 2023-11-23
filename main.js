import './style.css'
import { init } from './js/start.js'

document.querySelector('#app').innerHTML = `
  <div class="wrapper">
    <header class="header">
      <span id="header__back-arrow" class="header__back-arrow header__back-arrow--hidden" title="Go back to settings"><</span>
      <div class="header__heading-wrapper">
        <h1 class="header__heading">Snake</h1>
      </div>
    </header>
    <section id="settings-wrapper" class="settings-wrapper">
      <fieldset class="settings">
        <legend class="settings__title">Ustawienia gry</legend>

        <section class="settings__option">
          <label class="settings__option-label" for="level">Poziom</label>
          <select id="level" class="settings__select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </section>
        <section class="settings__option">
          <label class="settings__option-label" for="speed">Prędkość węża</label>
          <select id="speed" class="settings__select">
            <option value="1">mała</option>
            <option value="2">średnia</option>
            <option value="3">duża</option>
          </select>
        </section>
        <section class="settings__option">
          <label class="settings__option-label" for="speed-change-time">Zmiana prędkości po złapaniu powerupa</label>
          <select id="speed-change-time" class="settings__select">
            <option value="1">1 sekunda</option>
            <option value="2">2 sekundy</option>
            <option value="3">3 sekundy</option>
          </select>
        </section>
        <section class="settings__option">
          <label class="settings__option-label" for="length-change">Zmiana długości po złapaniu powerupa</label>
          <select id="length-change" class="settings__select">
            <option value="1">1 kratka</option>
            <option value="2">2 kratki</option>
            <option value="3">3 kratki</option>
          </select>
        </section>

        <div class="settings__start-btn-wrapper">
          <button type="button" id="settings__start-btn" class="settings__start-btn">Start</button>
        </div>
      </fieldset>
    </section>

    <div id="game-wrapper" class="game-wrapper game-wrapper--hidden">
      <div class="game">
        <section>
          <p class="game__score-txt">Wynik: <span id="game__score">0</span></p>
          <canvas id="canvas" class="game__canvas" height="601px" width="601px"></canvas>
        </section>

        <section class="game__best-scores">
          <p class="game__best-score-txt">Najlepsze wyniki:</p>
          <ol id="game__score-list" class="game__score-list"></ol>
        </section>
      </div>
    </div>
  </div>
`

init()
