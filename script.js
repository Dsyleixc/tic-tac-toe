'use strict';

// setup board and winning combinations
const gameboard = (function () {
    const board = ['x', 'o', 'x', 'x', 'x', 'o', 'x', 'o', 'x'];
    const winningCombinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ];
    let xPositions = [];
    let oPositions = [];

    function getPositions(mark) {
        let positions = [];
        board.forEach((spot, index) => {
            if (spot === mark) {
                positions.push(index + 1);
            }
        });

        if (mark === 'x') {
            xPositions = positions;
        } else if (mark === 'o') {
            oPositions = positions;
        }
    }

    function checkWin(mark) {
        // get positions for mark
        getPositions(mark);

        // get proper mark array
        const positionsToCheck = mark === 'x' ? xPositions : oPositions;

        // true/false if they won
        return winningCombinations.some((winningCombination) => winningCombination.every((position) => positionsToCheck.includes(position)));
    }

    function checkTie() {
        return board.includes('');
    }

    return { getPositions, checkWin, checkTie };
})();

const createPlayer = function (name, mark) {
    return { name, mark };
};

const displayGame = (function () {})();
