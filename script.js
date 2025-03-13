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
        console.log(board);
    }

    function checkWin(mark) {
        const playerPositions = mark === 'x' ? xPositions : yPositions;
        return winningPositions.some((winningCombination) => winningCombination.every((position) => playerPositions.includes(position)));
    }

    function checkTie() {
        // A tie occurs when neither player has won and the board is full
        return !checkWin('x') && !checkWin('o') && !board.includes('');
    }

    return { initializeBoard, placemark, checkBoard, checkWin, checkTie };
})();

gameBoard.initializeBoard();
gameBoard.placemark(1, 'x');
gameBoard.placemark(2, 'x');
gameBoard.placemark(3, 'x');
gameBoard.checkBoard();
console.log(gameBoard.checkWin('x'));

/* 
Player Module
-Manage player information and turns.
-Keep track of the current player and switch between players.

createPlayer(name, mark): Create a player with a name and a mark (X or O).
getCurrentPlayer(): Return the current player.
switchPlayer(): Change the active player after each turn.
*/

const player = function () {
    let activePlayer;

    function createPlayer(name, mark) {
        return { name, mark };
    }

    function setActivePlayer(player) {
        activePlayer = player.name;
    }

    function getActivePlayer() {
        return activePlayer;
    }

    function switchActivePlayer(player1, player2) {
        if (activePlayer === player1.name) {
            activePlayer = player2.name;
        } else {
            activePlayer = player1.name;
        }
    }

    return { createPlayer, setActivePlayer, getActivePlayer, switchActivePlayer };
};

/* 
Display Module
-Handle the user interface and interactions.
-Update the visual representation of the game board and current player.

renderBoard(board): Update the UI to reflect the current state of the board.
updateCurrentPlayerDisplay(player): Show the current player's mark on the UI.
showWinner(winner): Display a message when a player wins.
showTie(): Display a message when the game ends in a tie.
resetDisplay(): Clear the UI for a new game.
*/

/* 
Game Controller Module
-Coordinate the interaction between the gameboard, players, and display.
-Manage the game flow, including starting, playing, and resetting the game.

startGame(): Initialize the game and set up event listeners.
handleCellClick(position): Respond to user clicks on the game board.
checkGameStatus(): Check if there is a winner or a tie after each move.
restartGame(): Reset the game state and UI for a new game.
*/
