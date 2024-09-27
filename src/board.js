function buildGameBoard(numRows, numCols) {
    const pieces = {};

    const game = document.getElementById("game");
    const board = createGameElement('div', 'board', game);

    for (let i = 0; i < numRows; i++) {
        const row = createGameElement('div', 'row', board);

        for (let j = 0; j < numCols; j++) {
            const cell = createGameElement('div', 'cell', row);

            const char = boardMap[i][j];

            if (char === '#') cell.classList.add('wall');
            if (char === 'G') cell.classList.add('goal');
            if (char === 'B') cell.classList.add('block');
            if (char === 'P') pieces.player = { x: i, y: j };
        }
    }

    return pieces;
}