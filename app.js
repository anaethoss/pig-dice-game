/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
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
    if(scores[activePlayer] >= 10) {
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
  gamePlaying = false;

  winner_background();

  document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
}

//twinkles couples of background color 
function winner_background() {
  var doer = setInterval(function(){
    change_background()
  }, 150);

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
  backgrounds = ['red', 'green', 'blue', 'yellow', '#f7f7f7'];

  
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