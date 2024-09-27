
function Piece(posX, posY) {
    this.x = posX;
    this.y = posY;

    this.nextPosition = function (keycode) {
        let { x, y } = this;

        if (keycode == "ArrowUp") x--;
        if (keycode == "ArrowDown") x++;
        if (keycode == "ArrowLeft") y--;
        if (keycode == "ArrowRight") y++;

        return { x, y };
    }

    this.moveTo = function (position) {
        this.x = position.x;
        this.y = position.y;

        this.element.style.top = calculaPosicao(this.x);
        this.element.style.left = calculaPosicao(this.y);
    }

    this.insertElementInto = function(className, parent) {
        this.element = createGameElement('div', className, parent);

        this.element.style.top = calculaPosicao(this.x);
        this.element.style.left = calculaPosicao(this.y);
    }
}