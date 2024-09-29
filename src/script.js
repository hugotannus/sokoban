const { pieces, goals } = buildGameBoard(boardMap);
const board = document.querySelector('.board');

const player = createBoardPiece(pieces.player, 'player');
const boxes = pieces.boxes.map(box => createBoardPiece(box));

const boxesOnGoalStats = document.getElementById('goals');
document.getElementById("targets").innerText = goals.length;

let moves = 0;
let boxesOnGoal = 0;

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

function updateBoxesOnGoalStats() {
    const boxesOnGoalStats = document.getElementById('goals');
    
    boxesOnGoal =  countBoxesOnGoal();

    boxesOnGoalStats.innerText = boxesOnGoal;
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
            updateBoxesOnGoalStats();

            if(verifyVictory()) setTimeout(showGreetings, 500);
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
    return boxes.reduce((counter, box) => {
        return ( findTargetAt(goals, box) && ++counter ) || counter;
    }, 0);
}

function showGreetings() {
    alert("Você concluiu o desafio!");
}

function verifyVictory() {
    return boxesOnGoal === goals.length;
}