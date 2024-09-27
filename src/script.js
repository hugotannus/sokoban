const boardMap = [
    ["#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", ".", ".", ".", ".", ".", ".", "#"],
    ["#", ".", ".", ".", "#", ".", ".", "#"],
    ["#", ".", "#", "G", ".", ".", ".", "#"],
    ["#", ".", ".", "G", "B", "#", ".", "#"],
    ["#", ".", ".", "#", ".", "B", ".", "#"],
    ["#", ".", ".", "P", ".", ".", ".", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#"]
];

const NUM_ROWS = boardMap.length;
const NUM_COLS = boardMap[0].length;

const DIST_SALTO = 66;
const MARGIN_FIX = 4;

const piecesPosition = buildGameBoard(NUM_ROWS, NUM_COLS);
const board = document.querySelector('.board');

const player = createBoardPiece(piecesPosition.player, 'player');
const boxes = piecesPosition.boxes.map(box => createBoardPiece(box));

function createBoardPiece(position, className = 'box') {
    const piece = new Piece(position.x, position.y);
    piece.insertElementInto(board, className);

    return piece
}

window.addEventListener("keydown", function (event) {
    event.preventDefault();
    const nextPosition = player.nextPosition(event.code);
    const foundBox = boxes.find(box => box.x == nextPosition.x && box.y == nextPosition.y);

    if (foundBox) {
        const nextBoxPosition = foundBox.nextPosition(event.code);

        if (verifyPosition(nextBoxPosition)) {
            foundBox.moveTo(nextBoxPosition);
            player.moveTo(nextPosition);
        }
    } else if (verifyPosition(nextPosition)) {
        player.moveTo(nextPosition);
    }
});

function verifyPosition(position) {
    let { x, y } = position;

    return boardMap[x][y] !== '#';
}

function calculaPosicao(qtd) {
    return `${qtd * DIST_SALTO + MARGIN_FIX}px`;
}

function createGameElement(classList, parentNode, elementName = 'div') {
    const element = document.createElement(elementName);
    element.classList.add(classList);
    parentNode.append(element);

    return element;
}

function buildGameBoard(numRows, numCols) {
    const piecesPosition = {
        player: null,
        boxes: []
    }

    const game = document.getElementById("game");
    const board = createGameElement('board', game);

    for (let i = 0; i < numRows; i++) {
        const row = createGameElement('row', board);

        for (let j = 0; j < numCols; j++) {
            const cell = createGameElement('cell', row);

            const char = boardMap[i][j];

            if (char === '#') cell.classList.add('wall');
            if (char === 'G') cell.classList.add('goal');
            if (char === 'P') piecesPosition.player = { x: i, y: j };
            if (char === 'B') piecesPosition.boxes.push({ x: i, y: j });
        }
    }

    return piecesPosition;
}
