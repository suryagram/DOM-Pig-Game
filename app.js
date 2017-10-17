/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, gamePlaying;
//var lastRoll = undefined;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {

  if (gamePlaying) {
    // 1. Random number
    var dice0 = Math.floor(Math.random() * 6) + 1;
    var dice1 = Math.floor(Math.random() * 6) + 1;

    // 2. Display result
    var diceDOM = document.querySelector('.dice');
    document.getElementById('dice-0').style.display = 'block';
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-0').src = 'dice-' + dice0 + '.png';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';

    // 3. update scores
    if (dice0 > 1 && dice1 > 1) {
      /**
      if(lastRoll == dice && dice == 6) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        nextPlayer();
      } else {
      **/
        //lastRoll = dice;
        roundScore += dice0 + dice1;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        // next player
        nextPlayer();
    }
  }

});

document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    // Add current score to players total
    scores[activePlayer] += roundScore;

    // Update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if game has been won

    maxScore = document.querySelector('.winning-score').value;
    if(!maxScore) {
      maxScore = 100;
    }
    if (scores[activePlayer] >= maxScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
        // next player
        nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

function init() {

  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.getElementById('dice-0').style.display = 'none';
  document.getElementById('dice-1').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 0';
  document.getElementById('name-1').textContent = 'Player 1';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');

}


function nextPlayer() {
  document.querySelector('#current-' + activePlayer).textContent = 0;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  lastRoll = undefined;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.getElementById('dice-0').style.display = 'none';
  document.getElementById('dice-1').style.display = 'none';
}
