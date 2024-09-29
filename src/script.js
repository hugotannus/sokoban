const { pieces, goals } = buildGameBoard(boardMap);
const board = document.querySelector('.board');

const player = createBoardPiece(pieces.player, 'player');
const boxes = pieces.boxes.map(box => createBoardPiece(box));

window.addEventListener("keydown", function (event) {
    event.preventDefault();
    handlePieceMovement(event.code);
});

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

            setTimeout(verifyVictory, 500);
        }
    } else if (verifyPosition(nextPosition)) {
        player.moveTo(nextPosition);
    }
}

function verifyPosition(position) {
    let { x, y } = position;

    return boardMap[x][y] !== '#';
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