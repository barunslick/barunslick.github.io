import Game from '../js/game.js';

let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

let gameHeight = canvas.clientHeight;
let gameWidth = canvas.clientWidth;

let welcomeScreen = document.querySelector('.inner-contents .welcome');
let topRow= document.querySelector('.inner-contents .top-row');

let retryScreen = document.querySelector('.inner-contents .game-over');
let updateIt = document.getElementById('score-update-final');

let goBtn = document.getElementById('go-btn');
goBtn.addEventListener('click', init);

let retryBtn = document.getElementById('retry-btn');
retryBtn.addEventListener('click', init);

let goHome = document.getElementById('go-home');
goHome.addEventListener('click',showHome);


function showHome(){
	topRow.style.display = 'none';
	retryScreen.style.display = 'none';
	welcomeScreen.style.display = 'block';
}

function displayMessage(score){
	retryScreen.style.display = 'block';
	updateIt.innerHTML = score;
}

function init(){
	welcomeScreen.style.display = 'none';
	retryScreen.style.display = 'none';
	topRow.style.display = 'block';
	console.log('start');
	let game = new Game(ctx, gameWidth, gameHeight);
	requestAnimationFrame(startGame);
	function startGame(){
		let returnChar = game.update();
		if (returnChar && returnChar[0] === 'finish'){
			displayMessage(returnChar[1]);
		}else{
			requestAnimationFrame(startGame);
		}
	}
}