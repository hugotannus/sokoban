window.addEventListener("keydown", function(event) {
    const next = nextPosition(event.code);
    const validPosition = verifyPosition(next);

    if(validPosition) movePlayer(next);
});

function Player(posX, posY) {
    this.x = posX;
    this.y = posY;
}

const player = new Player(0, 0);
const celulas = document.querySelectorAll('.cell');
const playerElement = document.querySelector('.player');

function nextPosition(keycode) {
    let { x, y } = player;
    
    if(keycode == "ArrowUp") x--;
    if(keycode == "ArrowDown") x++;
    if(keycode == "ArrowLeft") y--;
    if(keycode == "ArrowRight") y++;

    return {x, y};
}

function movePlayer(position){
    player.x = position.x;
    player.y = position.y;

    const K = player.x * 4 + player.y;
    
    celulas[K].append(playerElement);
}

function verifyPosition(position){
    let {x, y} = position;

    return x >= 0 && x < 4 && y >= 0 && y < 4;
}
