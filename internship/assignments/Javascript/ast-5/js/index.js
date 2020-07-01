//internal files
import Game from '../js/game.js'

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let gameHeight = canvas.clientHeight;
let gameWidth = canvas.clientWidth;


function init(){
    let game = new Game(ctx, gameWidth, gameHeight);
    function render(timestamp){
        game.update();
        requestAnimationFrame(render);  
    }
    requestAnimationFrame(render);
}
init();
