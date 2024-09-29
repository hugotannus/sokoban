const { pieces, goals } = buildGameBoard(boardMap);
const board = document.querySelector('.board');

const player = createBoardPiece(pieces.player, 'player');
const boxes = pieces.boxes.map(box => createBoardPiece(box));
let moves = 0;

window.addEventListener("keydown", function (event) {
    event.preventDefault();

    const VALID_KEY_CODES = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

    if (VALID_KEY_CODES.includes(event.code)) {
        handlePieceMovement(event.code);
    }
});

function findTargetAt(list, position) {
    return list.find(target => target.x === position.x && target.y === position.y);
}

function updateMovesCounter() {
    const movesElement = document.getElementById('moves');
    movesElement.innerText = ++moves;
}

function createBoardPiece(position, className = 'box') {
    const piece = new Piece(position.x, position.y);
    piece.insertElementInto(board, className);

    return piece
}

function handlePieceMovement(keycode) {
    const nextPosition = player.nextPosition(keycode);
    const foundBox = findTargetAt(boxes, nextPosition);

    if (foundBox) {
        const nextBoxPosition = foundBox.nextPosition(keycode);

        const hasNoWall = verifyPosition(nextBoxPosition);
        const hasAnotherBlock = findTargetAt(boxes, nextBoxPosition);

        if (hasNoWall && !hasAnotherBlock) {
            foundBox.moveTo(nextBoxPosition);
            player.moveTo(nextPosition);

            updateMovesCounter();

            setTimeout(verifyVictory, 500);
        }
    } else {
        const hasNoWall = verifyPosition(nextPosition);

        if (hasNoWall) {
            player.moveTo(nextPosition);
            updateMovesCounter();
        }
    }
}

function verifyPosition(position) {
    let { x: j, y: i } = position;

    return boardMap[i][j] !== '#';
}

function countBoxesOnGoal() {
    let counter = 0;

    for (let box of boxes) {
        const foundGoal = findTargetAt(goals, box);

        if (foundGoal) counter++;
    }

    return counter;
}

function verifyVictory() {
    const boxesOnGoal = countBoxesOnGoal();

    if (boxesOnGoal === goals.length) {
        alert("Você concluiu o desafio!");
    }

    console.log(boxesOnGoal)
}