const STEP_LEN = 66;

document.body.onload = renderBoard(8, 8, rule1);

const directions = {
    "ArrowRight":   { x: 1, y: 0},
    "ArrowLeft":    { x:-1, y: 0},
    "ArrowUp":      { x: 0, y:-1},
    "ArrowDown":    { x: 0, y: 1},
}

window.addEventListener("keydown", function(event){
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

function setInitialPlayerPosition(player, x, y) {
    player.style.left= `${4 + x * STEP_LEN}px`;
    player.style.top = `${4 + y * STEP_LEN}px`;
}

function findNextPosition(position, direction) {
    let x = Number(position.x.split('px')[0]);
    let y = Number(position.y.split('px')[0]);

    let left= `${x + direction.x * STEP_LEN}px`;
    let top = `${y + direction.y * STEP_LEN}px`;

    return {left, top};
}

function createElement(elementTag, classList) {
    const element = document.createElement(elementTag);
    element.classList.add(...classList);

    return element;
}

function renderBoard(numRows, numCols, drawRule) {
    const game = document.getElementById("game");
    const board = createElement('div', ['board']);
    const player = createElement('div', ['player']);
    
    for (let k = 0; k < numRows; k++) {
        const rowElement = createElement('div', ['row']);
        
        for (let j = 0; j < numCols; j++) {
            const classList = ['cell'];

            if(drawRule(numRows, numCols, k, j)) classList.push('empty');
            
            const cellElement = createElement('div', classList);
            
            rowElement.appendChild(cellElement);
        }
        
        board.appendChild(rowElement);
    }

    setInitialPlayerPosition(player, 1, 1);
    
    board.append(player);
    game.append(board);
}

function rule1(numRows, numCols, k, i) {
    return k == 0 || i == 0 || k == numRows - 1 || i == numCols - 1;
}
