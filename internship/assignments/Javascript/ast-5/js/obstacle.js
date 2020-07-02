//internal files
import { getObstaclesBottom } from "../js/sprites.js";
import { getObstaclesTop } from "../js/sprites.js";

export default class Obstacle{

	constructor(game, randomTop) {
		this.game = game;
		this.ctx = this.game.ctx;
		this.x = this.game.gameWidth;
		this.dx = 4;
		this.gap = 150;
		this.topY = randomTop;
		[this.topObstacleSx, this.topObstacleSy, this.obstacleWidth, this.obstacleHeight] = getObstaclesTop();
		[this.bottomObstacleSx, this.bottomObstacleSy, this.obstacleWidth, this.obstacleHeight] = getObstaclesBottom();
		this.topPipe = {
			sx: this.topObstacleSx,
			sy: this.topObstacleSy,
			topY: randomTop
		};
		this.bottomPipe = {
			sx: this.bottomObstacleSx,
			sy: this.bottomObstacleSy,
			bottomY: this.topY + this.gap + this.obstacleHeight * SCALE_FACTOR
		};
	};

	update(){
		this.x -= this.dx;
		this.ctx.drawImage(this.game.canvasSprite, this.topPipe.sx, this.topPipe.sy, this.obstacleWidth, this.obstacleHeight, this.x, this.topPipe.topY, this.obstacleWidth * SCALE_FACTOR, this.obstacleHeight * SCALE_FACTOR);
		this.ctx.drawImage(this.game.canvasSprite, this.bottomPipe.sx, this.bottomPipe.sy, this.obstacleWidth, this.obstacleHeight, this.x, this.bottomPipe.bottomY, this.obstacleWidth * SCALE_FACTOR, this.obstacleHeight * SCALE_FACTOR);
		this.detectCollision();
	};

	detectCollision(){
		var birdx = this.game.bird.x;
		var birdy = this.game.bird.y;
		var birdWidth = this.game.bird.width * 3;
		var birdHeight = this.game.bird.height * 3;
		if ( birdx + birdWidth > this.x &&  birdx  < this.x + this.obstacleWidth * SCALE_FACTOR && (birdy < this.topY+this.obstacleHeight * SCALE_FACTOR || birdy+birdHeight > this.topY+this.obstacleHeight * SCALE_FACTOR + this.gap)){
			this.game.gameStatus = 2;
		};
	};

};