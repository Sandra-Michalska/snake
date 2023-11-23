(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&t(u)}).observe(document,{childList:!0,subtree:!0});function x(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=x(e);fetch(e.href,r)}})();const G={level1:{level:1,speed:.7,obstaclePositions:[{x:3,y:2},{x:3,y:3},{x:17,y:2},{x:17,y:3},{x:17,y:4},{x:7,y:7},{x:7,y:8},{x:7,y:9},{x:8,y:7},{x:8,y:8},{x:9,y:7},{x:9,y:8},{x:12,y:16},{x:12,y:13},{x:12,y:14},{x:12,y:15},{x:4,y:18},{x:4,y:17},{x:3,y:18},{x:3,y:17}]},level2:{level:2,speed:.55,obstaclePositions:[{x:1,y:7},{x:3,y:2},{x:3,y:3},{x:3,y:15},{x:3,y:14},{x:4,y:17},{x:4,y:18},{x:6,y:8},{x:7,y:7},{x:7,y:8},{x:8,y:7},{x:8,y:8},{x:9,y:7},{x:9,y:8},{x:12,y:13},{x:12,y:14},{x:12,y:15},{x:12,y:16},{x:13,y:15},{x:13,y:16},{x:17,y:1},{x:17,y:2},{x:17,y:3},{x:17,y:7},{x:17,y:8}]},level3:{level:3,speed:.45,obstaclePositions:[{x:1,y:7},{x:3,y:1},{x:3,y:2},{x:3,y:15},{x:3,y:14},{x:4,y:3},{x:4,y:4},{x:4,y:17},{x:4,y:18},{x:6,y:9},{x:7,y:8},{x:7,y:7},{x:7,y:6},{x:8,y:7},{x:8,y:8},{x:8,y:15},{x:9,y:16},{x:10,y:17},{x:12,y:7},{x:12,y:8},{x:13,y:15},{x:13,y:16},{x:16,y:13},{x:16,y:14},{x:16,y:18},{x:16,y:19},{x:17,y:1},{x:17,y:2},{x:17,y:3},{x:19,y:7},{x:19,y:8}]},level4:{level:4,speed:.38,obstaclePositions:[{x:0,y:1},{x:0,y:4},{x:0,y:19},{x:0,y:10},{x:0,y:11},{x:0,y:12},{x:2,y:2},{x:2,y:3},{x:3,y:12},{x:3,y:13},{x:4,y:9},{x:4,y:10},{x:4,y:19},{x:5,y:7},{x:5,y:6},{x:6,y:7},{x:6,y:8},{x:6,y:15},{x:7,y:7},{x:7,y:8},{x:7,y:15},{x:8,y:0},{x:8,y:1},{x:8,y:2},{x:9,y:16},{x:9,y:17},{x:10,y:15},{x:10,y:16},{x:10,y:17},{x:11,y:9},{x:11,y:8},{x:11,y:2},{x:12,y:5},{x:13,y:6},{x:13,y:7},{x:14,y:10},{x:14,y:11},{x:15,y:13},{x:15,y:14},{x:16,y:17},{x:16,y:19},{x:17,y:1},{x:17,y:2},{x:17,y:3},{x:15,y:1},{x:15,y:2},{x:18,y:3},{x:18,y:16},{x:18,y:17},{x:18,y:18},{x:18,y:19},{x:19,y:17}]},level5:{level:5,speed:.3,obstaclePositions:[{x:0,y:4},{x:0,y:1},{x:0,y:10},{x:0,y:18},{x:0,y:11},{x:0,y:12},{x:2,y:2},{x:2,y:3},{x:2,y:5},{x:2,y:6},{x:3,y:12},{x:3,y:13},{x:4,y:9},{x:4,y:10},{x:4,y:19},{x:5,y:3},{x:5,y:4},{x:5,y:7},{x:5,y:6},{x:6,y:4},{x:6,y:8},{x:6,y:15},{x:8,y:0},{x:8,y:1},{x:8,y:2},{x:8,y:13},{x:8,y:14},{x:9,y:8},{x:9,y:13},{x:9,y:14},{x:10,y:11},{x:10,y:17},{x:11,y:9},{x:11,y:8},{x:11,y:18},{x:11,y:19},{x:11,y:2},{x:12,y:5},{x:13,y:6},{x:13,y:7},{x:13,y:4},{x:13,y:5},{x:13,y:10},{x:13,y:11},{x:15,y:15},{x:15,y:16},{x:15,y:18},{x:15,y:19},{x:16,y:2},{x:16,y:18},{x:16,y:19},{x:17,y:6},{x:17,y:7},{x:17,y:8},{x:18,y:1},{x:18,y:2},{x:18,y:8},{x:18,y:16},{x:18,y:14},{x:18,y:13},{x:18,y:19},{x:19,y:17}]}},h=20;function H(){let o=[],c="right";this.canChangeDirection=!0,this.canGoThroughWalls=!1,this.speed=0,this.powerupSpeedChangeTime=0;const x=this;this.setPosition=function(){o.push({x:2,y:0},{x:1,y:0},{x:0,y:0})},this.getSquarePosition=function(t){return o[t]},this.getHead=function(){return o[0]},this.getLength=function(){return o.length},this.move=function(){for(let t=o.length-1;t>0;t--)o[t].x=o[t-1].x,o[t].y=o[t-1].y;c==="right"&&o[0].x++,c==="left"&&o[0].x--,c==="down"&&o[0].y++,c==="up"&&o[0].y--},this.changeDirection=function(t,e){if(this.canChangeDirection&&e){if(t.preventDefault(),c==="right"&&e==="left"||c==="left"&&e==="right"||c==="up"&&e==="down"||c==="down"&&e==="up")return;c=e,this.canChangeDirection=!1}},this.goThroughBoardEdges=function(){o[0].x>h-1&&(o[0].x=0),o[0].x<0&&(o[0].x=h-1),o[0].y>h-1&&(o[0].y=0),o[0].y<0&&(o[0].y=h-1)},this.lengthen=function(t){const e=o[o.length-1];for(let r=0;r<t;r++)o.push({x:e.x,y:e.y})},this.shorten=function(t){for(let e=0;e<t;e++)o.pop()},this.changeSpeed=function(t){this.speed*=t,setTimeout(function(){x.speed/=t},x.powerupSpeedChangeTime*1e3)},this.goThroughWalls=function(){this.canGoThroughWalls=!0,setTimeout(function(){x.canGoThroughWalls=!1},7e3)},this.resetVales=function(){o=[],c="right"}}function O(){let c=0,x=0,t=null,e={},r=6,u=null,m=1;this.bestScores=[];let i;this.loopGameTimeout;let y,p=!1,l=null;const n=new H,d=this;this.setSettings=function(a){l=a,n.speed=l.snakeSpeed,n.powerupSpeedChangeTime=l.snakepowerupSpeedChangeTime,m=l.snakeLengthChange},this.startGame=function(){this.resetGameValues(),g.drawBackground(),g.drawObstacles(l.levelSettings.obstaclePositions,n),n.setPosition(),g.drawSnake(n),b(),g.drawApple(t),document.addEventListener("keydown",function(a){const s={37:"left",38:"up",39:"right",40:"down"},_=a.which,D=s[_];n.changeDirection(a,D)}),i=setTimeout(w,1e3)};function w(){clearTimeout(i),clearTimeout(d.loopGameTimeout),n.canChangeDirection=!0,g.drawBackground(),g.drawObstacles(l.levelSettings.obstaclePositions,n),P(),g.drawPowerup(e),g.drawApple(t),n.move(),n.goThroughBoardEdges(),g.drawSnake(n),k(),A(),R(),E(),d.loopGameTimeout=setTimeout(w,n.speed*1e3)}function v(a){c+=a,document.querySelector("#game__score").innerHTML=c}function b(){if(t)return;let a=!1;for(;!a;){t={x:Math.floor(Math.random()*h),y:Math.floor(Math.random()*h)},a=!0;for(let s=0;s<l.levelSettings.obstaclePositions.length;++s)t.x===l.levelSettings.obstaclePositions[s].x&&t.y===l.levelSettings.obstaclePositions[s].y&&(a=!1);for(let s=0;s<n.getLength();++s)t.x===n.getSquarePosition(s).x&&t.y===n.getSquarePosition(s).y&&(a=!1)}}function E(){const a=n.getHead();a.x===t.x&&a.y===t.y&&(t=null,b(),g.drawApple(t),n.lengthen(1),v(l.levelSettings.level),x+=1,(x+l.levelSettings.level)%3===0&&I())}function P(){Object.keys(e).length!==0&&(p||(p=!0,y=setTimeout(function(){e={},p=!1},1e4)))}function k(){Object.keys(e).length!==0&&n.getHead().x===e.x&&n.getHead().y===e.y&&(e={},u())}function I(){L(),q()}function L(){let a=!1;for(;!a;){e={x:Math.floor(Math.random()*h),y:Math.floor(Math.random()*h)},a=!0;for(let s=0;s<l.levelSettings.obstaclePositions.length;++s)e.x===l.levelSettings.obstaclePositions[s].x&&e.y===l.levelSettings.obstaclePositions[s].y&&(a=!1);for(let s=0;s<n.getLength();++s)e.x===n.getSquarePosition(s).x&&e.y===n.getSquarePosition(s).y&&(a=!1);e.x===t.x&&e.y===t.y&&(a=!1)}}function f(){clearTimeout(y),p=!1,e={}}function q(){switch(Math.floor(Math.random()*r)+1){case 1:u=function(){f(),n.lengthen(m)},e.type="lengthen";break;case 2:u=function(){f(),n.shorten(m)},e.type="shorten";break;case 3:u=function(){f(),n.changeSpeed(2)},e.type="speedDown";break;case 4:u=function(){f(),n.changeSpeed(.5)},e.type="speedUp";break;case 5:u=function(){f(),v(10)},e.type="points";break;case 6:u=function(){f(),n.goThroughWalls()},e.type="goThroughWalls";break}}this.resetGameValues=function(){c=0,x=0,p=!1,n.resetVales(),document.querySelector("#game__score").innerHTML=0};function N(a){d.bestScores.push(a),d.bestScores=d.bestScores.sort(function(s,_){return _-s}),document.querySelector("#game__score-list").innerHTML="";for(let s=0;s<5;s++)if(d.bestScores[s]){const _=document.createElement("li");_.appendChild(document.createTextNode(d.bestScores[s])),document.querySelector("#game__score-list").appendChild(_).classList.add("game__score-list-item")}}function A(){const a=n.getHead();for(let s=1;s<n.getLength();++s)a.x===n.getSquarePosition(s).x&&a.y===n.getSquarePosition(s).y&&T()}function R(){if(n.canGoThroughWalls)return;const a=n.getHead();for(let s=0;s<l.levelSettings.obstaclePositions.length;++s)a.x===l.levelSettings.obstaclePositions[s].x&&a.y===l.levelSettings.obstaclePositions[s].y&&T()}function T(){N(c),f(),d.startGame()}}function W(){const t={},e=document.querySelector("#canvas"),r=e.getContext("2d");t.apple=new Image,t.apple.src="/snake/images/apple.png",t.obstacle=new Image,t.obstacle.src="/snake/images/obstacle.png",t.obstacleTransparent=new Image,t.obstacleTransparent.src="/snake/images/obstacle-transparent.png",t.lengthen=new Image,t.lengthen.src="/snake/images/powerups/lengthen.png",t.shorten=new Image,t.shorten.src="/snake/images/powerups/shorten.png",t.speedUp=new Image,t.speedUp.src="/snake/images/powerups/speed-up.png",t.speedDown=new Image,t.speedDown.src="/snake/images/powerups/speed-down.png",t.points=new Image,t.points.src="/snake/images/powerups/points.png",t.goThroughWalls=new Image,t.goThroughWalls.src="/snake/images/powerups/go-through-walls.png";function u(i,y,p,l,n){const d=y*30+1,w=p*30+1;r.drawImage(i,d,w,l,n)}function m(i,y,p){const l=1*i+1,n=1*y+1;r.fillStyle=p,r.fillRect(i*29+l,y*29+n,29,29)}this.drawBackground=function(){r.fillStyle="#fff",r.strokeStyle="#e1dfdc",r.fillRect(0,0,e.height,e.width);for(let i=.5;i<e.width;i+=30)r.moveTo(i,0),r.lineTo(i,e.height);for(let i=.5;i<e.height;i+=30)r.moveTo(0,i),r.lineTo(e.width,i);r.stroke()},this.drawObstacles=function(i,y){let p="obstacle";y.canGoThroughWalls&&(p="obstacleTransparent"),i.forEach(function(l){u(t[p],l.x,l.y,29,29)})},this.drawSnake=function(i){for(let y=0;y<i.getLength();y++){if(y===0){m(i.getSquarePosition(y).x,i.getSquarePosition(y).y,"#e67312");continue}m(i.getSquarePosition(y).x,i.getSquarePosition(y).y,"#fc9125")}},this.drawApple=function(i){i!==null&&u(t.apple,i.x,i.y,29,29)},this.drawPowerup=function(i){Object.keys(i).length!==0&&u(t[i.type],i.x,i.y,29,29)}}let g=null,S=null;function M(){g=new W,document.querySelector("#settings__start-btn").addEventListener("click",function(){const o=U();C(),S=new O,S.setSettings(o),S.startGame()})}function U(){const o={level:document.querySelector("#level").value,speed:document.querySelector("#speed").value,powerupSpeedChangeTime:document.querySelector("#speed-change-time").value,lengthChange:document.querySelector("#length-change").value},c=G["level"+o.level];return{levelSettings:c,snakeSpeed:c.speed/o.speed,snakepowerupSpeedChangeTime:o.powerupSpeedChangeTime,snakeLengthChange:o.lengthChange}}function C(){document.querySelector("#game-wrapper").classList.remove("game-wrapper--hidden"),document.querySelector("#settings-wrapper").classList.add("settings-wrapper--hidden"),document.querySelector("#header__back-arrow").classList.remove("header__back-arrow--hidden"),document.querySelector("#header__back-arrow").addEventListener("click",function(){clearTimeout(S.loopGameTimeout),S.resetGameValues(),document.querySelector("#game__score-list").innerHTML="",document.querySelector("#game-wrapper").classList.add("game-wrapper--hidden"),document.querySelector("#settings-wrapper").classList.remove("settings-wrapper--hidden"),document.querySelector("#header__back-arrow").classList.add("header__back-arrow--hidden")})}document.querySelector("#app").innerHTML=`
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
`;M();
