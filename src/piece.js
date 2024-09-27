const DIST_SALTO = 66;
const MARGIN_FIX = 4;

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
        this.updateElementPosition();
    }

    this.insertElementInto = function (parentElement, className) {
        this.element = createGameElement(className, parentElement);
        this.updateElementPosition();
    }

    this.updateElementPosition = function () {
        this.element.style.top = calculaPosicao(this.x);
        this.element.style.left = calculaPosicao(this.y);
    }

    // Funções privadas

    function calculaPosicao(qtd) {
        return `${qtd * DIST_SALTO + MARGIN_FIX}px`;
    }
}