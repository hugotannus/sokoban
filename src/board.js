import Piece from "./piece.js";

const boardMap = [
    [" ", " ", "#", "#", "#", "#", "#"],
    ["#", "#", "#", "P", ".", ".", "#"],
    ["#", ".", ".", "B", "#", ".", "#", "#"],
    ["#", ".", "#", "G", "B", ".", ".", "#"],
    ["#", ".", ".", "G", ".", "#", ".", "#"],
    ["#", "#", ".", "#", ".", ".", ".", "#"],
    [" ", "#", ".", ".", ".", "#", "#", "#"],
    [" ", "#", "#", "#", "#", "#"]
];

function createGameElement(classList, parentNode, elementName = 'div') {
    const element = document.createElement(elementName);
    element.classList.add(classList);
    parentNode.append(element);

    return element;
}

export function createBoardPiece(position, className = 'box') {
    const board = document.querySelector('.board');

    const piece = new Piece(position.x, position.y);
    const pieceElement = createGameElement(className, board);

    piece.setElement(pieceElement);

    return piece
}

export function buildGameBoard() {
    const game = document.getElementById("game");
    const board = createGameElement('board', game);
    const numRows = boardMap.length;

    let player = null, boxes = [], numberOfGoals = 0;

    for (let i = 0; i < numRows; i++) {
        const row = createGameElement('row', board);
        const numCols = boardMap[i].length;

        for (let j = 0; j < numCols; j++) {
            const { classList } = createGameElement('cell', row);

            const char = boardMap[i][j];
            const position = { x: j, y: i };

            if (char === '#') classList.add('wall');
            if (char === ' ') classList.add('empty');
            if (char === 'P') player = position;
            if (char === 'B') boxes.push(position);
            if (char === 'G') {
                classList.add('goal');
                numberOfGoals++;
            }
        }
    }

    return { boardMap, numberOfGoals, pieces: { player, boxes } }
}