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
    const board2 = document.getElementById('board2');

    for (let k = 0; k < boardMap.length; k++) {
        const row = boardMap[k];
        const rowElement = createElement('div', ['row']);
        
        for (let j = 0; j < row.length; j++) {
            const cell = row[j];
            const classList = ['cell'];
            
            if(cell == "#") classList.push('wall');
            if(cell == "P") classList.push('player');
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
const boardMap = splitIntoLinesAndChars(lvl_0);

document.body.onload = renderBoard(boardMap);