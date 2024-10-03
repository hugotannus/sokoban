import Piece from "./piece.js";
import { buildGameBoard } from "./board.js";
import { mapa1, mapa2, mapa3 } from "./mapas.js";

let { boardMap, pieces, numberOfGoals } = buildGameBoard(mapa1);
let board = document.querySelector('.board');

let player = createBoardPiece(pieces.player, 'player');
let boxes = [];

for (let box of pieces.boxes) {
    let piece = createBoardPiece(box, 'box');
    boxes.push(piece);
}

const lvl1 = document.getElementById('lvl1');
const lvl2 = document.getElementById('lvl2');
const lvl3 = document.getElementById('lvl3');

window.addEventListener("keydown", function (event) {
    handlePieceMovement(event.code);
});

lvl1.addEventListener("click", function() {
    [ boardMap, pieces, numberOfGoals ] = loadGameData(mapa1);
})
lvl2.addEventListener("click", function() {
    [ boardMap, pieces, numberOfGoals ] = loadGameData(mapa2);
})
lvl3.addEventListener("click", function() {
    [ boardMap, pieces, numberOfGoals ] = loadGameData(mapa3);
})

function loadGameData(mapa) {
    let { boardMap, pieces, numberOfGoals } = buildGameBoard(mapa);
    return [ boardMap, pieces, numberOfGoals ]
}

function findBoxAtPosition(pos) {
    return boxes.find((caixa) => caixa.x === pos.x && caixa.y === pos.y);
}

function handlePieceMovement(keycode){
    const nextPlayerPosition = player.nextPosition(keycode);
    const caixa = findBoxAtPosition(nextPlayerPosition);

    if(caixa) {
        const nextCaixaPosition = caixa.nextPosition(keycode);
        const outraCaixa = findBoxAtPosition(nextCaixaPosition);
        const caixaCanMove = verifyPosition(nextCaixaPosition);

        if(caixaCanMove && !outraCaixa) {
            caixa.moveTo(nextCaixaPosition);
            player.moveTo(nextPlayerPosition);

            const qtdCaixasCertas = contagemDeCaixasCorretas();

            console.log(qtdCaixasCertas);

            if(qtdCaixasCertas == numberOfGoals) {
                setTimeout(levantaAPlaquinha, 300);
            }
        }
    } else {
        const playerCanMove = verifyPosition(nextPlayerPosition);

        if (playerCanMove) player.moveTo(nextPlayerPosition);
    }
}

function createBoardPiece(piecePosition, className) {
    const piece = new Piece(piecePosition.x, piecePosition.y);
    piece.insertElementInto(className, board);

    return piece;
}

function verifyPosition(position) {
    let { x: j, y: i } = position;

    return boardMap[i][j] !== '#';
}

function contagemDeCaixasCorretas(){
    let count = 0;

    for(const position of boxes) {
        let { x: j, y: i } = position;

        if(boardMap[i][j] === 'G') count++;
    }

    return count;
}

function levantaAPlaquinha() {
    alert("Você venceu!");
}