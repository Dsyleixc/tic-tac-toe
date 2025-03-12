'use strict';

// setup board and winning combinations
const gameboard = (function () {
    const board = ['x', 'x', 'x', '', '', '', '', '', ''];
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
                positions.push(index);
            }
        });

        if (mark === 'x') {
            xPositions = positions;
            console.log(xPositions);
        } else if (mark === 'o') {
            oPositions = positions;
        }
    }

    return { getPositions };
})();

gameboard.getPositions('x');
