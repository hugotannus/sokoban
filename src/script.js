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

const DIST_SALTO = 66;
const MARGIN_FIX = 4;

const pieces = buildGameBoard(NUM_ROWS, NUM_COLS);

const player = new Piece(pieces.player.x, pieces.player.y);
const board = document.querySelector('.board');
const playerElement = createGameElement('div', ['piece', 'player'], board);

playerElement.style.top = calculaPosicao(player.x);
playerElement.style.left = calculaPosicao(player.y);

window.addEventListener("keydown", function (event) {
    event.preventDefault();
    const next = player.nextPosition(event.code);

    if (verifyPosition(next)) {
        player.moveTo(next, playerElement);
    }
});

function Piece(posX, posY) {
    this.x = posX;
    this.y = posY;

    this.nextPosition = function (keycode) {
        let { x, y } = this;

        if (keycode == "ArrowUp") x--;
        if (keycode == "ArrowDown") x++;
        if (keycode == "ArrowLeft") y--;
        if (keycode == "ArrowRight") y++;

        return { x, y };
    }

    this.moveTo = function (position, element) {
        this.x = position.x;
        this.y = position.y;

        element.style.top = calculaPosicao(this.x);
        element.style.left = calculaPosicao(this.y);
    }
}

function verifyPosition(position) {
    let { x, y } = position;

    return boardMap[x][y] !== '#';
}

function calculaPosicao(qtd) {
    return `${qtd * DIST_SALTO + MARGIN_FIX}px`;
}

function createGameElement(elementName, classList, parentNode) {
    const element = document.createElement(elementName);
    element.classList.add(...classList);
    parentNode.append(element);

    return element;
}

function buildGameBoard(numRows, numCols) {
    const game = document.getElementById("game");
    const board = createGameElement('div', ['board'], game);

    const piecesPosition = {}

    for (let i = 0; i < numRows; i++) {
        const row = createGameElement('div',['row'], board);

        for (let j = 0; j < numCols; j++) {
            const cell = createGameElement('div', ['cell'], row);

            const char = boardMap[i][j];
            
            if(char === '#')cell.classList.add(['wall']);
            if(char === 'G')cell.classList.add(['goal']);
            if(char === 'P')piecesPosition.player = {x:i, y:j};
            if(char === 'B'){
                const box = createGameElement('div', ['piece', 'box'], board);
                box.style.top = calculaPosicao(i);
                box.style.left = calculaPosicao(j);
            };
        }
    }


    return piecesPosition;
}