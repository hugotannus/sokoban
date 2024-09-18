buildGameBoard(8, 8, rule1);
buildGameBoard(8, 8, rule2);
buildGameBoard(8, 8, rule11);
buildGameBoard(8, 8, rule12);
buildGameBoard(8, 8, rule13);
buildGameBoard(8, 8, rule14);
buildGameBoard(8, 8, rule15);
buildGameBoard(8, 8, rule16);
buildGameBoard(8, 8, rule5);
buildGameBoard(8, 8, rule6);
buildGameBoard(8, 8, rule7);
buildGameBoard(8, 8, rule8);
buildGameBoard(8, 8, rule9);
buildGameBoard(8, 8, rule3);
buildGameBoard(8, 8, rule4);
buildGameBoard(8, 8, rule10);
buildGameBoard(8, 8, rule0);

function buildGameBoard(numRows, numCols, regra) {
    const game = document.getElementById("game");
    const board = document.createElement('div');
    board.classList.add('board');
    
    for (let k = 0; k < numRows; k++) {
        const row = document.createElement('div');
        row.classList.add('row');
        board.append(row);
        
        for (let i = 0; i < numCols; i++) {
            const celula = document.createElement('div');
            celula.classList.add('cell');
            row.append(celula);

            const devePreencher = regra(numRows, numCols, k, i);
            
            if(devePreencher) celula.classList.add('flag');
        }
    }
    game.append(board);
}

function rule0(numRows, numCols, k, i) {
    return k <= 4;
}

function rule1(numRows, numCols, k, i) {
    return k == 0 || i == 0 || k == numRows - 1 || i == numCols - 1;
}

function rule2(numRows, numCols, k, i) {
    return !rule1(numRows, numCols, k, i);
}

function rule3(numRows, numCols, k, i) {
    return k == i;
}

function rule4(numRows, numCols, k, i) {
    return k + i == numRows - 1;
}

function rule5(numRows, numCols, k, i) {
    return i % 2 == 0;
}

function rule6(numRows, numCols, k, i) {
    return i % 2 == 1;
}

function rule7(numRows, numCols, k, i) {
    return k % 2 == 1;
}

function rule8(numRows, numCols, k, i) {
    return k % 2 == 0;
}

function rule9(numRows, numCols, k, i) {
    return (i + k) % 2 == 0;
}

function rule10(numRows, numCols, k, i) {
    const R3 = rule3(numRows, numCols, k, i)
    const R4 = rule4(numRows, numCols, k, i)

    return R3 || R4;
}

function rule11(numRows, numCols, k, i) {
    return i == 0;
}

function rule12(numRows, numCols, k, i) {
    return k == 0;
}

function rule13(numRows, numCols, k, i) {
    return k == 3;
}

function rule14(numRows, numCols, k, i) {
    return i == 5;
}

function rule15(numRows, numCols, k, i) {
    const R13 = rule13(numRows, numCols, k, i);
    const R14 = rule14(numRows, numCols, k, i);

    return R13 || R14;
}

function rule16(numRows, numCols, k, i) {
    const R13 = rule13(numRows, numCols, k, i);
    const R14 = rule14(numRows, numCols, k, i);

    return R13 && R14;
}