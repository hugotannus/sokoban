buildGameBoard(8, 8, regra0);

const player = new Player(0, 0);
const playerElement = document.querySelector('.player');

const DIST_SALTO = 66;
const MARGIN_FIX =  4;

playerElement.style.top = calculaPosicao(0);
playerElement.style.left = calculaPosicao(0);

window.addEventListener("keydown", function (event) {
    event.preventDefault();
    const next = player.nextPosition(event.code);

    if (verifyPosition(next)) {
        player.moveTo(next, playerElement);
    }
});

function Player(posX, posY) {
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

    return x >= 0 && x < 4 && y >= 0 && y < 4;
}

function calculaPosicao(qtd) {
    return `${qtd * DIST_SALTO + MARGIN_FIX}px`;
}

function buildGameBoard(numRows, numCols, _regra) {
    const game = document.getElementById("game");
    const board = document.createElement('div');
    board.classList.add('board');
    
    for (let k = 0; k < numRows; k++) {
        const row = document.createElement('div');
        row.classList.add('row');
        board.append(row);
        
        for (let i = 0; i < numCols; i++) {
            const celula = document.createElement('div');
            celula.classList.add('cell');
            row.append(celula);

            const devePreencher = regra(numRows, numCols, k, i);
            
            if(devePreencher) celula.classList.add('flag');
        }
    }
    game.append(board);
}

function regra0() {
    return false;
}