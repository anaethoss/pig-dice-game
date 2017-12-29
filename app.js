/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, activePlayer, roundScore, gamePlaying;
let rollBtn = document.querySelector(`button.btn-roll`);
let diceImg = document.querySelector(`img.dice`);
let holdBtn = document.querySelector('.btn-hold');
let newBtn  = document.querySelector('.btn-new');

init();

rollBtn.addEventListener('click', () => {
  if(gamePlaying) {
    // Generate Random number
    let dice = Math.floor(Math.random() * 6) + 1;
    
    diceImg.src = `dice-${dice}.png`;
    diceImg.style.display = 'block';

    if(dice !== 1) {
      // add score
      roundScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent = roundScore;
    } else {
      // next player
      changePlayer();
    }
  }

});


holdBtn.addEventListener('click', () => {
  if(gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;

    // Update UI
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
    // Check if the current user won the game
    if(scores[activePlayer] >= 100) {
      document.querySelector(`#name-${activePlayer}`).textContent = 'Winner';
      document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
      document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
      document.getElementById(`current-${activePlayer}`).textContent = 0;
      diceImg.style.display = 'none';
      gamePlaying = false;
    } else {
      // Next Player
      changePlayer();
    }
  }
});

newBtn.addEventListener('click', init);




function changePlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById(`current-0`).textContent = 0;
  document.getElementById(`current-1`).textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  diceImg.style.display = 'none';
  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');
}

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.getElementById(`score-0`).textContent = 0;
  document.getElementById(`score-1`).textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  diceImg.style.display = 'none';
}