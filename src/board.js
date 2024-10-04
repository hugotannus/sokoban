import Piece from "./piece.js";

export function buildGameBoard(level) {
    const boardMap = level.trim().split('\n');

    const game = document.getElementById("game");
    const board = createGameElement('div', 'board', game);

    let numberOfGoals = 0, boxes = [], player = null;
    
    for (let i = 0; i < boardMap.length; i++) {
        const row = createGameElement('div', 'row', board);

        for (let j = 0; j < boardMap[i].length; j++) {
            const cell = createGameElement('div', 'cell', row);

            const char = boardMap[i][j];
            const position = { x: j, y: i }

            if (char === '#') cell.classList.add('wall');
            if (char === '_') cell.classList.add('empty');
            if (char === ' ') cell.classList.add('empty');
            if (char === 'P') player = createBoardPiece(position, 'player');
            if (char === 'B') boxes.push(createBoardPiece(position, 'box'));
            if (char === 'G') {
                cell.classList.add('goal');
                numberOfGoals++;
            }
        }
    }

    return { boardMap, pieces: { boxes, player }, numberOfGoals };
}

export function createGameElement(elementName, className, parentNode) {
    const element = document.createElement(elementName);
    element.classList.add(className);
    parentNode.append(element);

    return element;
}

function createBoardPiece(piecePosition, className) {
    const board = document.querySelector('.board');
    const piece = new Piece(piecePosition.x, piecePosition.y);
    
    piece.insertElementInto(className, board);

    return piece;
}