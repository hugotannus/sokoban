const boardMap = [
    [ "#", "#", "#", "#", "#", "#", "#", "#" ],
    [ "#", ".", ".", ".", ".", ".", ".", "#" ],
    [ "#", ".", ".", ".", "#", ".", ".", "#" ],
    [ "#", ".", "#", "G", ".", ".", ".", "#" ],
    [ "#", ".", ".", "G", "B", "#", ".", "#" ],
    [ "#", ".", ".", "#", ".", "B", ".", "#" ],
    [ "#", ".", ".", "P", ".", ".", ".", "#" ],
    [ "#", "#", "#", "#", "#", "#", "#", "#" ]
];

const NUM_ROWS = boardMap.length;
const NUM_COLS = boardMap[0].length;

buildGameBoard(NUM_ROWS, NUM_COLS);

function createGameElement(elementName, className, parentNode) {
    const element = document.createElement(elementName);
    element.classList.add(className);
    parentNode.append(element);

    return element;
}

function buildGameBoard(numRows, numCols) {
    const game = document.getElementById("game");
    const board = createGameElement('div', 'board', game);

    for (let k = 0; k < numRows; k++) {
        const row = createGameElement('div', 'row', board);

        for (let i = 0; i < numCols; i++) {
            createGameElement('div', 'cell', row);
        }
    }
}