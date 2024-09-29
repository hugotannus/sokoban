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

            if(verifyVictory()) setTimeout(showGreetings, 500);
        }
    } else {
        const playerCollision = verifyCollisions(nextPlayerPosition);

        if (!playerCollision) {
            player.moveTo(nextPlayerPosition);
            updateMovesCounter();
        }
    }
}

function verifyCollisions(position, list=null) {
    let { x: j, y: i } = position;

    const hasWallCollision = boardMap[i][j] === '#';
    const hasAnotherPiece = list && findTargetAt(list, position);

    return hasWallCollision || hasAnotherPiece;
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