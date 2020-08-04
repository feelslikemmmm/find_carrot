'use strict';
const CARROT__SIZE = 80;
const CARROT__COUNT = 5;
const BUG__COUNT = 5;
const field = document.querySelector('.game__field');
//field의 크기를 가져오는 함수 getBoundingClientRect
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
    if(started){
        stopGame();
    } else {
        startGame();
    }
    started = !started;
});

function startGame(){
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
}

function stopGame(){

}

function showStopButton(){
    const icon = gameBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function showTimerAndScore(){
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';

}


function initGame(){
    field.innerHTML= '';
    gameScore.innerText = CARROT__COUNT;
    //벌레와 당근을 생성한 뒤 field에 추가해줌
    addItem('carrot', CARROT__COUNT, 'img/carrot.png');
    addItem('bug', BUG__COUNT, 'img/bug.png');
}

function addItem(className, count, imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT__SIZE;
    const y2 = fieldRect.height - CARROT__SIZE;
    for(let i = 0; i < count; i++ ){
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.right = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max){
    return Math.random() * (max - min) + min;
}

