import Game from '/js/game.js';

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

let gameHeight = canvas.clientHeight;
let gameWidth = canvas.clientWidth;


let game = new Game(ctx, gameWidth, gameHeight);

requestAnimationFrame(startGame);
function startGame(){
	game.update();
	requestAnimationFrame(startGame);
}



