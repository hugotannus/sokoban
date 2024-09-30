import { buildGameBoard, createBoardPiece } from './board.js';

const { boardMap, pieces, numberOfGoals } = buildGameBoard();

const player = createBoardPiece(pieces.player, 'player');
const boxes = pieces.boxes.map(box => createBoardPiece(box));

document.getElementById("targets").innerText = numberOfGoals;

let moves = 0;
let boxesOnGoal = 0;

window.addEventListener("keydown", function (event) {
    event.preventDefault();

    const VALID_KEY_CODES = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

    if (VALID_KEY_CODES.includes(event.code)) {
        handlePieceMovement(event.code);
    }
});

function findTargetAt(pieces, position) {
    return pieces.find(target => target.x === position.x && target.y === position.y);
}

function verifyCollisions(position, pieces = null) {
    let { x: j, y: i } = position;

    const hasWallCollision = boardMap[i][j] === '#';
    const hasAnotherPiece = pieces && findTargetAt(pieces, position);

    return hasWallCollision || hasAnotherPiece;
}

function updateMovesCounter() {
    document.getElementById('moves').innerText = ++moves;
}

function updateBoxesOnGoalStats() {
    boxesOnGoal = 0;

    for (let position of boxes) {
        let { x: j, y: i } = position;
        if (boardMap[i][j] === 'G') boxesOnGoal++;
    }

    document.getElementById('goals').innerText = boxesOnGoal;
}

function handlePieceMovement(keycode) {
    const nextPlayerPosition = player.nextPosition(keycode);
    const foundBox = findTargetAt(boxes, nextPlayerPosition);

    if (foundBox) {
        const nextBoxPosition = foundBox.nextPosition(keycode);
        const boxCollision = verifyCollisions(nextBoxPosition, boxes);

        if (!boxCollision) {
            foundBox.moveTo(nextBoxPosition);
            player.moveTo(nextPlayerPosition);

            updateMovesCounter();
            updateBoxesOnGoalStats();

            if (numberOfGoals === boxesOnGoal) {
                setTimeout(() => alert("Você concluiu o desafio!"), 500);
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