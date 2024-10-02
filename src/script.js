import Piece from "./piece.js";
import { buildGameBoard, boardMap } from "./board.js";

const pieces = buildGameBoard();
const board = document.querySelector('.board');

const player = createBoardPiece(pieces.player, 'player');
const boxes = [];

for (let box of pieces.boxes) {
    let piece = createBoardPiece(box, 'box');
    boxes.push(piece);
}

window.addEventListener("keydown", function (event) {
    // event.preventDefault();

    handlePieceMovement(event.code);
});

function findBoxAtPosition(pos) {
    // modificar linha(s) de código abaixo
    return boxes.find((caixa) => caixa.x === pos.x && caixa.y === pos.y);
}

function handlePieceMovement(keycode){
    const nextPlayerPosition = player.nextPosition(keycode);
    const caixa = findBoxAtPosition(nextPlayerPosition);

    if(caixa) {
        const nextCaixaPosition = caixa.nextPosition(keycode);
        const outraCaixa = findBoxAtPosition(nextCaixaPosition);
        const caixaCanMove = verifyCollision(nextCaixaPosition);

        if(caixaCanMove && !outraCaixa) {
            caixa.moveTo(nextCaixaPosition);
            player.moveTo(nextPlayerPosition);
        }
    } else {
        const playerCanMove = verifyCollision(nextPlayerPosition);

        if (playerCanMove) player.moveTo(nextPlayerPosition);
    }
}

function createBoardPiece(piecePosition, className) {
    const piece = new Piece(piecePosition.x, piecePosition.y);
    piece.insertElementInto(className, board);

    return piece;
}

function verifyCollision(position) {
    let { x: j, y: i } = position;

    return boardMap[i][j] !== '#';
}