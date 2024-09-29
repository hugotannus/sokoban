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

function buildGameBoard(boardMap) {
    const game = document.getElementById("game");
    const board = createGameElement('board', game);
    const numRows = boardMap.length;
    
    let boxes = [], goals = [], player = null;
    
    for (let i = 0; i < numRows; i++) {
        const row = createGameElement('row', board);
        const numCols = boardMap[i].length;
        
        for (let j = 0; j < numCols; j++) {
            const cell = createGameElement('cell', row);

            const char = boardMap[i][j];

            if (char === '#') cell.classList.add('wall');
            if (char === ' ') cell.classList.add('empty');
            if (char === 'P') player = { x: i, y: j };
            if (char === 'B') boxes.push({ x: i, y: j });
            if (char === 'G') {
                cell.classList.add('goal');
                goals.push({x: i, y: j})
            }
        }
    }

    return { goals, boardMap, pieces: { player, boxes } }
}