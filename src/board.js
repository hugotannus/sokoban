export const boardMap = [
    ["#", "#", "#", "#", "#", "#", "#", "#"],
    ["#", ".", ".", ".", ".", ".", ".", "#"],
    ["#", ".", ".", ".", "#", ".", ".", "#"],
    ["#", ".", "#", ".", "G", ".", ".", "#"],
    ["#", ".", ".", ".", "B", "#", ".", "#"],
    ["#", ".", "G", "B", "P", "B", "G", "#"],
    ["#", ".", ".", ".", ".", ".", ".", "#"],
    ["#", "#", "#", "#", "#", "#", "#", "#"]
];

export const lvl0 = `
__#####
###P..#
#..B#.##
#.#GB..#
#..G.#.#
##.#...#
_#...###
_#####
`


export function buildGameBoard() {
    const pieces = {
        boxes: []
    };
    
    let numberOfGoals = 0;
    
    const game = document.getElementById("game");
    const board = createGameElement('div', 'board', game);
    const NUM_ROWS = boardMap.length;
    
    for (let i = 0; i < NUM_ROWS; i++) {
        const NUM_COLS = boardMap[i].length;
        const row = createGameElement('div', 'row', board);

        for (let j = 0; j < NUM_COLS; j++) {
            const cell = createGameElement('div', 'cell', row);

            const char = boardMap[i][j];
            const position = { x: j, y: i }

            if (char === '#') cell.classList.add('wall');
            if (char === 'P') pieces.player = position;
            if (char === 'B') pieces.boxes.push(position);
            if (char === 'G') {
                cell.classList.add('goal');
                numberOfGoals++;
            }
        }
    }

    return { pieces, numberOfGoals };
}

export function createGameElement(elementName, className, parentNode) {
    const element = document.createElement(elementName);
    element.classList.add(className);
    parentNode.append(element);

    return element;
}