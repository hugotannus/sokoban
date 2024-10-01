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
    event.preventDefault();
    const next = player.nextPosition(event.code);

    if (verifyPosition(next)) {
        player.moveTo(next);
    }
});

function createBoardPiece(piecePosition, className) {
    const piece = new Piece(piecePosition.x, piecePosition.y);
    piece.insertElementInto(className, board);

    return piece;
}

function verifyPosition(position) {
    let { x: j, y: i } = position;

    return boardMap[i][j] !== '#';
}