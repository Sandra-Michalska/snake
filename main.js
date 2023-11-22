import './style.css'
import { init } from './js/start.js'

document.querySelector('#app').innerHTML = `
  <div class="wrapper">
    <h1 class="heading">Snake</h1>
      
    <section id="settings-wrapper">
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
          <button type="button" class="settings__start-btn" id="settings__start-btn">Start</button>
        </div>
      </fieldset>
    </section>

    <div class="game-wrapper" id="game-wrapper">
      <div class="game">
        <section>
          <p class="game__score-txt">Wynik: <span id="game__score">0</span></p>
          <canvas id="canvas" class="game__canvas" height="601px" width="601px"></canvas>
        </section>

        <section class="game__best-scores">
          <p class="game__best-score-txt">Najlepsze wyniki:</p>
          <ol class="game__score-list" id="game__score-list"></ol>
        </section>
      </div>
    </div>
  </div>
`

init()
