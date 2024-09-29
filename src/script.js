const { pieces, goals } = buildGameBoard(boardMap);
const board = document.querySelector('.board');

const player = createBoardPiece(pieces.player, 'player');
const boxes = pieces.boxes.map(box => createBoardPiece(box));
let moves = 0;

window.addEventListener("keydown", function (event) {
    event.preventDefault();
    
    const VALID_KEYS = [ "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", ];

    if(VALID_KEYS.includes(event.code)) {
        handlePieceMovement(event.code);
    }
});

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
    const foundBox = boxes.find(box => box.x == nextPosition.x && box.y == nextPosition.y);
    
    if (foundBox) {
        const nextBoxPosition = foundBox.nextPosition(keycode);
        
        if (verifyPosition(nextBoxPosition)) {
            foundBox.moveTo(nextBoxPosition);
            player.moveTo(nextPosition);

            updateMovesCounter();
            
            setTimeout(verifyVictory, 500);
        }
    } else if (verifyPosition(nextPosition)) {
        player.moveTo(nextPosition);
        updateMovesCounter();
    }
}

function verifyPosition(position) {
    let { x: j, y: i } = position;

    return boardMap[i][j] !== '#';
}

function verifyVictory() {
    const boxesOnGoal = countBoxesOnGoal();

    if (boxesOnGoal === goals.length) {
        alert("Você concluiu o desafio!");
    }

    console.log(boxesOnGoal)
}

function countBoxesOnGoal() {
    let counter = 0;

    for(let box of boxes){
        const foundGoal = goals.find(function(goal) {
            return goal.x == box.x && goal.y == box.y
        });
        
        if(foundGoal) counter++;
    }

    return counter;
}