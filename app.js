let scores, activePlayer, roundScore, gamePlaying, prevScore;
let rollBtn = document.querySelector(`button.btn-roll`);
let diceImg = document.querySelector(`img.dice`);
let diceImg2 = document.querySelector(`img.dice2`);
let holdBtn = document.querySelector('.btn-hold');
let newBtn  = document.querySelector('.btn-new');

init();

rollBtn.addEventListener('click', () => {
  if(gamePlaying) {
    // Generate Random number
    let dice = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.ceil(Math.random() * 6);

    diceImg.src = `dice-${dice}.png`;
    diceImg2.src = `dice-${dice2}.png`;
    diceImg.style.display = 'block';
    diceImg2.style.display = 'block';

    if(dice !== 1 && dice2 !== 1) {
      if(prevScore === 12 && prevScore === (dice + dice2)) {
        changePlayer();
      } else {
        // add score
        roundScore += dice + dice2;
        document.getElementById(`current-${activePlayer}`).textContent = roundScore;
        prevScore = dice + dice2;
      }
    } else {
      // next player
      changePlayer();
    }
  }

});


holdBtn.addEventListener('click', () => {
  if(gamePlaying) {
    let winScore = document.querySelector('.win-score').value || 100;
    // Add current score to global score
    scores[activePlayer] += roundScore;

    // Update UI
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
    // Check if the current user won the game
    if(scores[activePlayer] >= winScore) {
        winner_masala();
    } else {
      // Next Player
      changePlayer();
    }
  }
});

newBtn.addEventListener('click', init);

//handles display rendering when a player wins
function winner_masala() {
  document.querySelector(`#name-${activePlayer}`).textContent = 'Winner';
  document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
  //document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  diceImg.style.display = 'none';
  diceImg2.style.display = 'none';
  gamePlaying = false;

  winner_background();

  document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
}

//twinkles couples of background color 
function winner_background() {
  var doer = setInterval(function(){
    change_background()
  }, 100);

  var counter = 0;
  function change_background() {
    counter++;
    if (counter === backgrounds.length) {
      clearInterval(doer);
    }
    document.querySelector(`.player-${activePlayer}-panel`).style.backgroundColor = backgrounds[counter];
  }
}

function changePlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  prevScore = 0;
  document.getElementById(`current-0`).textContent = 0;
  document.getElementById(`current-1`).textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  diceImg.style.display = 'none';
  diceImg2.style.display = 'none';
  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');
}

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  backgrounds = ['#e74c3c', '#27ae60', '#2980b9', '#f1c40f', '#f7f7f7'];

  
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
  diceImg2.style.display = 'none';
}
