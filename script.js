const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const playerVsPlayerButton = document.getElementById('player-vs-player');
const playerVsAIButton = document.getElementById('player-vs-ai');
let currentPlayer = 'X';
let gameActive = true;
const boardState = ['', '', '', '', '', '', '', '', ''];
let isVsAI = false;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
playerVsPlayerButton.addEventListener('click', () => setGameMode(false));
playerVsAIButton.addEventListener('click', () => setGameMode(true));

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handlePlayerMove(clickedCell, clickedCellIndex);

    if (isVsAI && gameActive) {
        handleAIMove();
    }
}

function handlePlayerMove(cell, index) {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    checkForWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function handleAIMove() {
    const emptyCells = boardState.map((value, index) => value === '' ? index : null).filter(value => value !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const aiCell = cells[randomIndex];

    setTimeout(() => {
        boardState[randomIndex] = currentPlayer;
        aiCell.textContent = currentPlayer;
        aiCell.classList.add(currentPlayer.toLowerCase());
        checkForWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }, 500);
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') {
            continue;
        }
        if (boardState[a] === boardState[b] && boardState[b] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        alert(`${currentPlayer} has won!`);
    } else if (!boardState.includes('')) {
        gameActive = false;
        alert('It\'s a draw!');
    }
}

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    boardState.fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

function setGameMode(vsAI) {
    isVsAI = vsAI;
    resetGame();
}
