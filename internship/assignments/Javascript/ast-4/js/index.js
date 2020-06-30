import Game from '/js/game.js';
import Car from '/js/car.js';

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

let gameHeight = canvas.clientHeight;
let gameWidth = canvas.clientWidth;

let roadImg = new Image;
roadImg.src = "images/road.png";

let yOffset = -gameHeight;
roadImg.onload = () => {
	requestAnimationFrame(startGame);
}

function startGame(){
	yOffset = (yOffset >= 0 )? -gameHeight : yOffset;
	ctx.drawImage(roadImg, 0, yOffset, gameWidth , gameHeight);
	yOffset += 15;
	requestAnimationFrame(startGame);
}


let game = new Game(gameWidth, gameHeight);
game.start(ctx);



