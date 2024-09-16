buildGameBoard('board1', 8, 8, rule1);
buildGameBoard('board2', 8, 8, rule2);
buildGameBoard('board3', 8, 8, rule3);
buildGameBoard('board4', 8, 8, rule4);

function buildGameBoard(boardId, numberOfRows, numberOfCollumns, drawRule) {
    const board = document.getElementById(boardId);

    for (let k = 0; k < numberOfRows; k++) {
        const row = document.createElement('div');
        row.classList.add('row');
        board.append(row);

        for (let i = 0; i < numberOfCollumns; i++) {
            const celula = document.createElement('div');
            celula.classList.add('cell');
            row.append(celula);

            drawRule(celula, numberOfRows, numberOfCollumns, k, i);
        }
    }
}

function rule1(celula, numberOfRows, numberOfCollumns, k, i) {
    if (k == 0 || i == 0 || k == numberOfRows - 1 || i == numberOfCollumns - 1) {
        celula.classList.add('empty');
    }
}

function rule2(celula, numberOfRows, numberOfCollumns, k, i) {
    if (k > 0 && i > 0 && k < numberOfRows - 1 && i < numberOfCollumns - 1) {
        celula.classList.add('empty');
    }
}

function rule3(celula, numberOfRows, numberOfCollumns, k, i) {
    if( k == i ) { 
        celula.classList.add('empty');
    }
}

function rule4(celula, numberOfRows, numberOfCollumns, k, i) {
    if( k + i == numberOfRows - 1) { 
        celula.classList.add('empty');
    }
}
