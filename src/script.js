const player = new Player(0, 0);
const celulas = document.querySelectorAll('.cell');
const playerElement = document.querySelector('.player');

window.addEventListener("keydown", function(event) {
    const next = player.nextPosition(event.code);

    if(verifyPosition(next)) {
        let K = next.x * 4 + next.y;
        player.moveTo(next, playerElement, celulas[K]);
    }
});

function Player(posX, posY) {
    this.x = posX;
    this.y = posY;

    this.nextPosition = function(keycode) {
        let { x, y } = this;
        
        if(keycode == "ArrowUp") x--;
        if(keycode == "ArrowDown") x++;
        if(keycode == "ArrowLeft") y--;
        if(keycode == "ArrowRight") y++;

        return {x, y};
    }

    this.moveTo = function(position, element, parent) {
        this.x = position.x;
        this.y = position.y;
        
        parent.append(element);
    }
}

function verifyPosition(position){
    let {x, y} = position;

    return x >= 0 && x < 4 && y >= 0 && y < 4;
}
