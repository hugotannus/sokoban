import { buildGameBoard } from "./board.js";
import { mapa1, mapa2 } from "./mapas.js";

const { boardMap, pieces, numberOfGoals } = buildGameBoard(mapa1);
const { player, boxes } = pieces;

window.addEventListener("keydown", function (event) {
    handlePieceMovement(event.code);
});

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

            if(levelCompleted()) setTimeout(() => alert("Você venceu!"), 250);
        }
    } else {
        const playerCanMove = verifyPosition(nextPlayerPosition);

        if (playerCanMove) player.moveTo(nextPlayerPosition);
    }
}

function verifyPosition(position) {
    let { x: j, y: i } = position;

    return boardMap[i][j] !== '#';
}

function levelCompleted(){
    let count = 0;

    for(const position of boxes) {
        let { x: j, y: i } = position;

        if(boardMap[i][j] === 'G') count++;
    }

    return count == numberOfGoals;
}