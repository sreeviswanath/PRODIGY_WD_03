const board = document.getElementById('board');
const resultDisplay = document.getElementById('result');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleClick(event) {
  const cell = event.target;
  const index = cell.dataset.index;

  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    checkWin();
    checkTie();
    switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]           
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
      resultDisplay.textContent ="current player wins";
      gameActive = false;
      highlightWinningCells(pattern);
      return;
    }
  }
}

function checkTie() {
  if (!gameBoard.includes('') && gameActive) {
    resultDisplay.textContent = "It's a tie!";
    gameActive = false;
  }
}

function highlightWinningCells(pattern) {
  for (const index of pattern) {
    const cell = document.querySelector([data-index=="${index}"]);
    cell.style.backgroundColor = '#8eff8e';
  }
}

board.addEventListener('click', handleClick);