const DIST_SALTO = 66;
const MARGIN_FIX = 4;

const pieces = buildGameBoard(NUM_ROWS, NUM_COLS);
const board = document.querySelector('.board');

const player = createBoardPiece(pieces.player, 'player');

function createBoardPiece(piecePosition, className) {
    const piece = new Piece(piecePosition.x, piecePosition.y);
    piece.insertElementInto(className, board);
    
    return piece;
}

window.addEventListener("keydown", function (event) {
    event.preventDefault();
    const next = player.nextPosition(event.code);

    if (verifyPosition(next)) {
        player.moveTo(next);
    }
});

function verifyPosition(position) {
    let { x, y } = position;

    return boardMap[x][y] !== '#';
}

function calculaPosicao(qtd) {
    return `${qtd * DIST_SALTO + MARGIN_FIX}px`;
}

