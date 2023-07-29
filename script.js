const buttonEls = document.querySelectorAll(".button-el");
const newgameEl = document.getElementById("newgame-el");
let currTurn;
let gameBoard = [];

function initializeGame() {
  gameBoard = [
    [null, null, null], 
    [null, null, null], 
    [null, null, null]
  ];
  currTurn = 1;

  let buttonIndex = 0;
  for(let i=0; i<3; i++) {
    for(let j=0; j<3; j++) {
      gameBoard[i][j] = buttonEls[buttonIndex];
      buttonIndex++;
    }
  }
  attachButtonListener();
}

function attachButtonListener() {
  for(let i=0; i<buttonEls.length; i++) {
    buttonEls[i].addEventListener("click", function() {
      if(currTurn % 2 != 0) {
        buttonEls[i].textContent = 'X';
      }
      else {
        buttonEls[i].textContent = 'O';
      }
      currTurn++;
      checkIfSomeoneWon();
    })
  }
}

function checkIfSomeoneWon() {
  const winCombinations = [
    
    [gameBoard[0][0], gameBoard[0][1], gameBoard[0][2]],
    [gameBoard[1][0], gameBoard[1][1], gameBoard[1][2]],
    [gameBoard[2][0], gameBoard[2][1], gameBoard[2][2]],
    
    [gameBoard[0][0], gameBoard[1][0], gameBoard[2][0]],
    [gameBoard[0][1], gameBoard[1][1], gameBoard[2][1]],
    [gameBoard[0][2], gameBoard[1][2], gameBoard[2][2]],
    
    [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]],
    [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]],
  ];

  function checkForX(combination) {
    for(let i=0; i<3; i++)
    {
      if(combination[i].textContent != 'X')
      {
        return false;
      }
    }
    return true;
  }

  function checkForY(combination) {
    for(let i=0; i<3; i++)
    {
      if(combination[i].textContent != 'O')
      {
        return false;
      }
    }
    return true;
  }

  for(const combination of winCombinations) {
    if(checkForX(combination)) {
      alert('player X wins!');
      clearTheBoard();
      return;
    }
    if(checkForY(combination)) {
      alert('player O wins!');
      clearTheBoard();
      return;
    }
  }
}

function clearTheBoard() {
  for(let i=0; i<buttonEls.length; i++)
  {
    buttonEls[i].textContent = "";
  }
}

newgameEl.addEventListener("click", function() {
  clearTheBoard();
  initializeGame();
})