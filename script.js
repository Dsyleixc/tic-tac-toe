'use strict';

const gameBoard = (function () {
    const board = [];
    const xPositions = [];
    const yPositions = [];
    const winningPositions = [
        [1, 2, 3], // Top row
        [4, 5, 6], // Middle rows
        [7, 8, 9], // Bottom row
        [1, 4, 7], // Left column
        [2, 5, 8], // Middle column
        [3, 6, 9], // Right column
        [1, 5, 9], // Diagonal from top-left to bottom-right
        [3, 5, 7], // Diagonal from top-right to bottom-left
    ];

    // setup board with empty values
    function initializeBoard() {
        board.length = 0;
        board.push(...Array(9).fill(''));
        document.querySelectorAll('.game-cell').forEach((spot) => spot.classList.remove('winner')); // removing winner background from all spots
        xPositions.length = 0;
        yPositions.length = 0;
    }

    // Places a mark ('x' or 'o') at the specified position on the board
    function placemark(position, mark) {
        board[position - 1] = mark; // Update the board with the player's mark

        // Store the position in the respective player's array for win checking
        if (mark === 'x') {
            xPositions.push(position);
        } else {
            yPositions.push(position);
        }
    }

    // use to check board array during testing
    function checkBoard() {
        return board;
    }

    function checkWin(mark) {
        const playerPositions = mark === 'x' ? xPositions : yPositions;
        return winningPositions.some((winningCombination) => winningCombination.every((position) => playerPositions.includes(position)));
    }

    function checkTie() {
        // A tie occurs when neither player has won and the board is full
        return !checkWin('x') && !checkWin('o') && !board.includes('');
    }

    function winPositions(mark) {
        const playerPositions = mark === 'x' ? xPositions : yPositions;
        return winningPositions.find((winningCombination) => winningCombination.every((position) => playerPositions.includes(position)));
    }

    return { initializeBoard, placemark, checkBoard, checkWin, checkTie, winPositions };
})();

const player = (function () {
    let activePlayer;

    function createPlayer(name, mark) {
        return { name, mark };
    }

    function setActivePlayer(player) {
        activePlayer = player;
    }

    function getActivePlayer() {
        return activePlayer;
    }

    function switchActivePlayer(player1, player2) {
        if (activePlayer === player1) {
            activePlayer = player2;
        } else {
            activePlayer = player1;
        }
    }

    return { createPlayer, setActivePlayer, getActivePlayer, switchActivePlayer };
})();

const display = (function () {
    function renderBoard(board) {
        board.forEach((spot, index) => {
            // loops through each index in board array and puts it in the html code
            const cell = document.querySelector(`.game-cell[data-cell-index='${index + 1}']`);

            cell.textContent = spot;
        });
    }

    function displayCurrentPlayer(activePlayer) {
        document.querySelector('#current-player').textContent = activePlayer.name;
    }

    function showWinner(player, winningSpots) {
        winningSpots.forEach((spot) => document.querySelector(`.game-cell[data-cell-index='${spot}']`).classList.add('winner'));
    }

    function showTie() {
        alert('The game has ended in a tie!');
    }

    return { renderBoard, displayCurrentPlayer, showWinner, showTie };
})();

const gameController = (function () {
    let player1;
    let player2;

    function init() {
        gameBoard.initializeBoard();
        display.renderBoard(gameBoard.checkBoard());
        player1 = player.createPlayer('player 1', 'x');
        player2 = player.createPlayer('player 2', 'o');
        player.setActivePlayer(player1);
        display.displayCurrentPlayer(player.getActivePlayer());
    }

    function userClick(e) {
        if (!e.target.classList.contains('game-cell')) {
            return;
        }

        // get which cell player clicked
        const cellClicked = Number(e.target.getAttribute('data-cell-index'));

        // get active player
        const activePlayer = player.getActivePlayer();

        // push to board and xPositions or oPositions array
        gameBoard.placemark(cellClicked, activePlayer.mark);

        // render new board
        display.renderBoard(gameBoard.checkBoard());

        // check if there is a winner or tie
        if (gameBoard.checkWin(activePlayer.mark)) {
            display.showWinner(activePlayer.name, gameBoard.winPositions(activePlayer.mark));
            // Remove the event listener if there's a winner
            document.querySelector('.game-board').removeEventListener('click', userClick);
            return; // Stop further processing
        }
        if (gameBoard.checkTie()) {
            display.showTie();
            // Remove the event listener if there's a tie
            document.querySelector('.game-board').removeEventListener('click', userClick);
            return; // Stop further processing
        }

        // if neither, switch player
        player.switchActivePlayer(player1, player2);
        display.displayCurrentPlayer(player.getActivePlayer());
    }

    function startGame() {
        init();
        document.querySelector('.game-board').addEventListener('click', userClick);
        document.querySelector('#restart-button').addEventListener('click', restartGame);
    }

    function restartGame() {
        startGame();
    }

    return { startGame };
})();

// run code
gameController.startGame();
