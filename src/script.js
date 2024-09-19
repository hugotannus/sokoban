let x = 3;
let y = 4;

const player = document.querySelector('.player');
console.log(player);

player.addEventListener("click", function(){
    window.alert("Clicou no jogador");
})

window.addEventListener("keydown", function(event) {
    nextPosition(event.code);
})

function nextPosition(keycode) {  
    if(keycode == "ArrowUp") x--;
    if(keycode == "ArrowDown") x++;
    if(keycode == "ArrowLeft") y--;
    if(keycode == "ArrowRight") y++;

    console.log(keycode, x, y);
}