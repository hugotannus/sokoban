const boardMap = [
    [" ", " ", "#", "#", "#", "#", "#"],
    ["#", "#", "#", ".", ".", ".", "#"],
    ["#", ".", ".", ".", "#", ".", "#", "#"],
    ["#", ".", "#", "G", ".", ".", ".", "#"],
    ["#", ".", ".", "G", "B", "#", ".", "#"],
    ["#", "#", ".", "#", ".", "B", ".", "#"],
    [" ", "#", ".", "P", ".", "#", "#", "#"],
    [" ", "#", "#", "#", "#", "#"]
];

function createGameElement(classList, parentNode, elementName = 'div') {
    const element = document.createElement(elementName);
    element.classList.add(classList);
    parentNode.append(element);

    return element;
}

function buildGameBoard(boardMap) {
    const gameBoard = {
        boardMap,
        pieces: {
            player: null,
            boxes: []
        }
    }
    
    const game = document.getElementById("game");
    const board = createGameElement('board', game);
    
    const numRows = boardMap.length;
    for (let i = 0; i < numRows; i++) {
        const row = createGameElement('row', board);
        
        const numCols = boardMap[i].length;
        for (let j = 0; j < numCols; j++) {
            const cell = createGameElement('cell', row);

            const char = boardMap[i][j];

            if (char === '#') cell.classList.add('wall');
            if (char === 'G') cell.classList.add('goal');
            if (char === ' ') cell.classList.add('empty');
            if (char === 'P') gameBoard.pieces.player = { x: i, y: j };
            if (char === 'B') gameBoard.pieces.boxes.push({ x: i, y: j });
        }
    }

    return gameBoard;
}