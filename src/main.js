'use strict';

import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

const CARROT__COUNT = 14;
const BUG__COUNT = 10;
const GAME_DURATION_SEC = 10;


const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');



let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
    startGame();
})
const onItemClick = (item) => {
    if (!started) {
        return;
    }
    if (item === 'carrot') {
        //당근!!
        score++;
        updateScoreBoard();
        if (score === CARROT__COUNT) {
            finishGame(true);
        }
    } else if (item === 'bug') {
        finishGame(false);
    }
}

const gameField = new Field(CARROT__COUNT, BUG__COUNT);
gameField.setClickListener(onItemClick);


gameBtn.addEventListener('click', () => {
    if (started) {
        stopGame();
    } else {
        startGame();
    }
});


const startGame = () => {
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    sound.playBackground();
}

const stopGame = () => {
    started = false;
    stopGameTimer();
    hideGameButton();
    gameFinishBanner.showWithText('REPLAY ?')
    sound.playAlert();
    sound.stopBackground();
}

const finishGame = (win) => {
    started = false;
    hideGameButton();
    if (win) {
        sound.playWin();
    } else {
        sound.playBug();
    }
    stopGameTimer();
    stopSound(bgSound);
    gameFinishBanner.showWithText(win ? 'YOU WON' : 'YOU LOST');
}

const showStopButton = () => {
    const icon = gameBtn.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

const hideGameButton = () => {
    gameBtn.style.visibility = 'hidden';
}

const showTimerAndScore = () => {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

const startGameTimer = () => {
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

const stopGameTimer = () => {
    clearInterval(timer);
}

const updateTimerText = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}

const updateScoreBoard = () => {
    gameScore.innerText = CARROT__COUNT - score;
}

const initGame = () => {
    score = 0;
    gameScore.innerText = CARROT__COUNT;
    gameField.init();
}
