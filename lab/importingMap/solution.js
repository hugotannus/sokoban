const STEP_LEN = 66;

const directions = {
    "ArrowRight":   { x: 1, y: 0},
    "ArrowLeft":    { x:-1, y: 0},
    "ArrowUp":      { x: 0, y:-1},
    "ArrowDown":     { x: 0, y: 1},
}

window.addEventListener("keydown", function(event){
    // console.log(event.code);
    const player = document.querySelector('.player');

    if(Object.keys(directions).includes(event.code)) {
        const x = player.style.left;
        const y = player.style.top;
        const pos = { x, y }
        const nextPosition = findNextPosition(pos, directions[event.code]);

        player.style.left = nextPosition.left;
        player.style.top = nextPosition.top;
    }
})

function findNextPosition(position, direction) {
    let x = Number(position.x.split('px')[0]);
    let y = Number(position.y.split('px')[0]);

    let left= `${x + direction.x * STEP_LEN}px`;
    let top = `${y + direction.y * STEP_LEN}px`;

    return {left, top};
}

const splitIntoLinesAndChars = function (lvlMap) {
    const strValue = lvlMap.valueOf().trim();
    
    return strValue.split('\n').map(line => line.trim().split(''));
}

function createElement(elementTag, classList) {
    const element = document.createElement(elementTag);
    element.classList.add(...classList);

    return element;
}

function renderBoard(boardMap) {
    const board2 = document.getElementById('board');
    const player = createElement('div', ['player']);
    
    player.style.left = "3px";
    player.style.top = "3px";
    
    board2.append(player);

    for (let k = 0; k < boardMap.length; k++) {
        const row = boardMap[k];
        const rowElement = createElement('div', ['row']);
        
        for (let j = 0; j < row.length; j++) {
            const cell = row[j];
            const classList = ['cell'];
            
            if(cell == "#") classList.push('wall');
            // if(cell == "P") classList.push('player');
            if(cell == "G") classList.push('goal');
            if(cell == "B") classList.push('box');
            
            const cellElement = createElement('div', classList);
        
            rowElement.appendChild(cellElement);
        }

        board2.appendChild(rowElement);
    }
}

/** Níveis clássicos podem ser encontrados nesta página:
 * https://web.archive.org/web/20120918183734/http://users.bentonrea.com/~sasquatch/sokoban/
 * https://web.archive.org/web/20120627234905/http://users.bentonrea.com/%7Esasquatch/sokoban/m1
 */

const lvl_0 = `
########
#......#
#...#..#
#.#G...#
#..GB#.#
#..#.B.#
#..P...#
########
`
// const boardMap = splitIntoLinesAndChars(lvl_0);
const boardMap = [
    [ "#", "#", "#", "#", "#", "#", "#", "#" ],
    [ "#", ".", ".", ".", ".", ".", ".", "#" ],
    [ "#", ".", ".", ".", "#", ".", ".", "#" ],
    [ "#", ".", "#", "G", ".", ".", ".", "#" ],
    [ "#", ".", ".", "G", "B", "#", ".", "#" ],
    [ "#", ".", ".", "#", ".", "B", ".", "#" ],
    [ "#", ".", ".", "P", ".", ".", ".", "#" ],
    [ "#", "#", "#", "#", "#", "#", "#", "#" ]
]

console.log(boardMap);

document.body.onload = renderBoard(boardMap);
