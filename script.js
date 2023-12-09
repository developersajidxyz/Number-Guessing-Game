'use strict';

let secret, score = 20, highscore = 0;
const selectEl = (el) => document.querySelector(el);

const updateScore = () => {
    selectEl('.score').textContent = score;
    selectEl('.highscore').textContent = highscore;
};

const setMessage = (msg) => selectEl('.message').textContent = msg;

const resetGame = () => {
    score = 20;
    secret = secretNumber();
    updateScore();
    selectEl('.guess').value = '';
    selectEl('body').style.backgroundColor = '#222';
    selectEl('.number').style.width = '15rem';
    selectEl('.number').textContent = '?';
};

document.querySelector('.check').addEventListener('click', () => {
    if (score <= 0) {
        setMessage('You Lost The Game! 🚩');
    } else {
        const guessNumber = Number(selectEl('.guess').value);
        let message;

        if (!guessNumber) {
            setMessage('No Number! ⛔');
        } else if (guessNumber === secret) {
            message = 'Correct Number! 🎉';
            selectEl('body').style.background = 'linear-gradient(90deg, rgba(19,51,33,1) 0%, rgba(52,153,54,1) 39%, rgba(46,173,50,1) 55%, rgba(7,107,52,1) 100%)';
            selectEl('.number').style.width = '25rem';
            selectEl('.number').textContent = secret;

            if (score > highscore) highscore = score;
        } else {
            message = guessNumber > secret ? 'Too High! 📈' : 'Too Low! 📉';
            score--;
        }

        setMessage(message);
        updateScore();
    }
});

document.querySelector('.again').addEventListener('click', resetGame);

function secretNumber() {
    return Math.trunc(Math.random() * 20) + 1;
}

resetGame();