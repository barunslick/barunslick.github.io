//internal files
import Environment from "../js/environment.js";
import Bird from "../js/bird.js";
import InputHandler from "../js/inputHandler.js";
import Obstacle from "../js/obstacle.js";

import { getRandomIntRange } from "../js/utilities.js";

export default class Game {

	constructor(ctx, gameWidth, gameHeight) {
		this.ctx = ctx;
		this.gameHeight = gameHeight;
		this.gameWidth = gameWidth;
		this.canvasSprite = new Image;
		this.canvasSprite.src = 'images/flappy.png';
		this.background = new Environment(this);
		this.bird = new Bird(this);
		this.state = 0;
		this.mainFrame = 0;
		this.eventHandler = new InputHandler(this);
		this.obstacle = [];
		this.gameStatus = 0;
		this.score = 0;
		this.bestScore = 0;
	};

	update() {
		var remove = false
		this.mainFrame ++;
		this.background.update();
		if(this.gameStatus != 2) this.bird.update();
		if (this.gameStatus ==1){
			this.obstacle.forEach((oneObstacle)=> {
				oneObstacle.update();
				if(oneObstacle.x < - oneObstacle.obstacleWidth * SCALE_FACTOR){
					remove = true;
				};
				this.background.displayCurrentScore();
			});
			if(remove){
				this.updateScore();
				this.obstacle.shift();
			};
			if (this.mainFrame % 100 ==0){
				this.spawnObstable();
			};
		}else if(this.gameStatus ==2){
				this.bestScore = this.score > this.bestScore ? this.score : this.bestScore;
				this.clearForNew();
		};
		this.background.updateBottom();
	};

	spawnObstable(){
		let randomTop = getRandomIntRange(-150,-350);
		let newObstacle = new Obstacle(this, randomTop);
		this.obstacle.push(newObstacle);
	};

	updateScore(){
		this.score += 1;
	};

	clearForNew(){
		this.bird.x = 70;
		this.bird.y = 300;
		this.bird.speed = 0;
		this.obstacle = [];
		this.mainFrame = 0;
		this.bird.frame = 0;
	};

};

