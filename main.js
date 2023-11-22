import './style.css'
import { init } from './js/start.js'

document.querySelector('#app').innerHTML = `
  <div class="sn-wrap">
    <h1 class="sn-heading">Snake</h1>
      
    <section id="sn-settings-wrap">
      <fieldset class="sn-settings">
        <legend class="sn-settings__title">Ustawienia gry</legend>

        <section class="sn-settings__option">
          <label class="sn-settings__option-label" for="level">Poziom</label>
          <select id="level" class="sn-settings__select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </section>
        <section class="sn-settings__option">
          <label class="sn-settings__option-label" for="speed">Prędkość węża</label>
          <select id="speed" class="sn-settings__select">
            <option value="1">mała</option>
            <option value="2">średnia</option>
            <option value="3">duża</option>
          </select>
        </section>
        <section class="sn-settings__option">
          <label class="sn-settings__option-label" for="speed-change-time">Zmiana prędkości po złapaniu powerupa</label>
          <select id="speed-change-time" class="sn-settings__select">
            <option value="1">1 sekunda</option>
            <option value="2">2 sekundy</option>
            <option value="3">3 sekundy</option>
          </select>
        </section>
        <section class="sn-settings__option">
          <label class="sn-settings__option-label" for="length-change">Zmiana długości po złapaniu powerupa</label>
          <select id="length-change" class="sn-settings__select">
            <option value="1">1 kratka</option>
            <option value="2">2 kratki</option>
            <option value="3">3 kratki</option>
          </select>
        </section>

        <div class="sn-settings__start-btn-wrap">
          <button type="button" class="sn-settings__start-btn" id="sn-settings__start-btn">Start</button>
        </div>
      </fieldset>
    </section>

    <div class="sn-game-wrap" id="sn-game-wrap">
      <div class="sn-game">
        <section>
          <p class="sn-game__score-txt">Wynik: <span id="sn-game__score">0</span></p>
          <canvas id="canvas" class="sn-game__canvas" height="601px" width="601px"></canvas>
        </section>

        <section class="sn-game__best-scores">
          <p class="sn-game__best-score-txt">Najlepsze wyniki:</p>
          <ol class="sn-game__score-list" id="sn-game__score-list"></ol>
        </section>
      </div>
    </div>
  </div>
`

init()
