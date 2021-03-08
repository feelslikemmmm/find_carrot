'use strict';

import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';


const gameFinishBanner = new PopUp();
const game = new GameBuilder()
    .withGameDuration(10)
    .withCarrotCount(8)
    .withBugCount(8)
    .build();

game.setGameStopListener(reason => {
    let message;
    switch (reason) {
        case Reason.cancel:
            message = 'Replay?❗️';
            break;
        case Reason.win:
            message = 'YOU WIN 👏';
            break;
        case Reason.lose:
            message = 'YOU LOST 🤷‍♂️';
            break;
        default:
            throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
    game.start();
})


