'use strict';

import PopUp from './popup.js';

const CARROT__SIZE = 80;
const CARROT__COUNT = 14;
const BUG__COUNT = 10;
const GAME_DURATION_SEC = 10;

const field = document.querySelector('.game__field');
//field의 크기를 가져오는 함수 getBoundingClientRect
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');


const carrotSound = new Audio('./sound/carrot_pull.mp3');
const alertSound = new Audio('./sound/alert.wav');
const bgSound = new Audio('./sound/bg.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const winSound = new Audio('./sound/game_win.mp3');


let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
    startGame();
})
field.addEventListener('click', onFieldClick);

gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
});


function startGame() {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound);
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton();
    gameFinishBanner.showWithText('REPLAY ?')
    playSound(alertSound);
    stopSound(bgSound);
}

function finishGame(win) {
    started = false;
    hideGameButton();
    if (win) {
        playSound(winSound);
    } else {
        playSound(bugSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    gameFinishBanner.showWithText(win ? 'YOU WON' : 'YOU LOST');
}

function showStopButton() {
    const icon = gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if (remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(CARROT__COUNT == score);
            return;
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}

function onFieldClick() {
    if (!started) {
        return;
    }
    const target = event.target;
    if (target.matches('.carrot')) {
        //당근!!
        target.remove();
        score++;
        playSound(carrotSound);
        updateScoreBoard();
        if (score === CARROT__COUNT) {
            finishGame(true);
        }
    } else if (target.matches('.bug')) {
        stopGameTimer();
        finishGame(false);
    }
}


function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}
function updateScoreBoard() {
    gameScore.innerText = CARROT__COUNT - score;
}

function initGame() {
    score = 0;
    field.innerHTML = '';
    gameScore.innerText = CARROT__COUNT;
    //벌레와 당근을 생성한 뒤 field에 추가해줌
    addItem('carrot', CARROT__COUNT, 'img/carrot.png');
    addItem('bug', BUG__COUNT, 'img/bug.png');
}

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT__SIZE;
    const y2 = fieldRect.height - CARROT__SIZE;
    for (let i = 0; i < count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

