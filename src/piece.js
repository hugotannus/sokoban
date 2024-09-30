const DIST_SALTO = 66;
const MARGIN_FIX = 4;

function Piece(posX, posY, element=null) {
    this.x = posX;
    this.y = posY;
    this.element = element;

    this.nextPosition = function (keycode) {
        let { x, y } = this;

        if (keycode == "ArrowUp") y--;
        if (keycode == "ArrowDown") y++;
        if (keycode == "ArrowLeft") x--;
        if (keycode == "ArrowRight") x++;

        return { x, y };
    }

    this.moveTo = function (position) {
        this.x = position.x;
        this.y = position.y;
        this.updateElementPosition();
    }

    this.updateElementPosition = function () {
        this.element.style.top = calculaPosicao(this.y);
        this.element.style.left = calculaPosicao(this.x);
    }

    // Funções privadas

    function calculaPosicao(qtd) {
        return `${qtd * DIST_SALTO + MARGIN_FIX}px`;
    }
}

export default Piece;