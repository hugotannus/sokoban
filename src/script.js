import { buildGameBoard } from './board.js';

const { boardMap, numberOfGoals, pieces: { player, boxes } } = buildGameBoard();

let boxesOnGoal = 0;

window.addEventListener("keydown", function (event) {
    event.preventDefault();

    const VALID_KEY_CODES = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

    if (VALID_KEY_CODES.includes(event.code)) {
        handlePieceMovement(event.code);
    }
});

function findBoxAtPosition(pos) {
    return boxes.find(box => box.x === pos.x && box.y === pos.y);
}

function verifyCollisions(position, pieces = null) {
    let { x: j, y: i } = position;

    const hasWallCollision = boardMap[i][j] === '#';
    const hasAnotherPiece = pieces && findBoxAtPosition(position);

    return hasWallCollision || hasAnotherPiece;
}

function countBoxesOnGoal() {
    return boxes.reduce(function (count, { x: j, y: i }) {
        return count + Number(boardMap[i][j] == 'G')
    }, 0);
}

function updateMovesCounter() {
    document.getElementById('moves').innerText = player.moves;
}

function updateBoxesOnGoalStats() {
    boxesOnGoal = countBoxesOnGoal();
    document.getElementById('goals').innerText = boxesOnGoal;
}

function handlePieceMovement(keycode) {
    const nextPlayerPosition = player.nextPosition(keycode);
    const foundBox = findBoxAtPosition(nextPlayerPosition);

    if (foundBox) {
        const nextBoxPosition = foundBox.nextPosition(keycode);
        const boxCollision = verifyCollisions(nextBoxPosition, boxes);

        if (!boxCollision) {
            foundBox.moveTo(nextBoxPosition);
            player.moveTo(nextPlayerPosition);
            
            updateMovesCounter();
            updateBoxesOnGoalStats();
            
            if (numberOfGoals === boxesOnGoal) {
                const message = `Parabéns!\n\nVocê concluiu o desfio em ${player.moves} passos!`
                setTimeout(() => alert(message), 500);
            }
        }
    } else {
        const playerCollision = verifyCollisions(nextPlayerPosition);

        if (!playerCollision) {
            player.moveTo(nextPlayerPosition);
            updateMovesCounter();
        }
    }
}