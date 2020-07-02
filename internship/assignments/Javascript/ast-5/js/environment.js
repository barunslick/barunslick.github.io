//internal files
import * as sprites from '../js/sprites.js';

export default class Environment {

	constructor(game) {
		this.game = game;
		this.ctx = this.game.ctx;
		this.backgoundSprite = sprites.getBackgroundTop();
		this.backgoundSpriteBottom = sprites.getBackgroundBottom();
		this.welcomeScreen = [sprites.getWelcome(), sprites.getTapToStart()];
		this.gameOver = [sprites.gameOver(), sprites.gameMedal(), sprites.play()];
		this.numbers = sprites.getNumbers();
		this.currentScore = 0;
	};

	update() {
		this.ctx.drawImage(this.game.canvasSprite, ...this.backgoundSprite);
		if (this.game.gameStatus == 0) {
			this.welcomeScreen.forEach((item) => {
				this.ctx.drawImage(this.game.canvasSprite, ...item);
			});
		} else if (this.game.gameStatus == 2) {
			this.gameOver.forEach((item) => {
				this.ctx.drawImage(this.game.canvasSprite, ...item);
			});
			this.displayFinalScore();
		};
	};

	updateBottom(){
		this.ctx.drawImage(this.game.canvasSprite, ...this.backgoundSpriteBottom);
	};

	displayCurrentScore() {
		let initialX = 200;
		let initialY = 100;
		let initailScore = this.game.score;
		let count = 0;
		if (initailScore == 0) {
			this.ctx.drawImage(this.game.canvasSprite, ...(this.numbers[0]), initialX, initialY, this.numbers[0][2] * CURRENT_SCORE_SCALE , this.numbers[0][3] * CURRENT_SCORE_SCALE );
		} else {
			while (initailScore != 0) {
				let index = initailScore % 10;
				initailScore = Math.floor(initailScore / 10);
				this.ctx.drawImage(this.game.canvasSprite, ...(this.numbers[index]), initialX - count * 15, initialY, this.numbers[index][2] * CURRENT_SCORE_SCALE , this.numbers[index][3] * CURRENT_SCORE_SCALE);
				count++;
			};
		};
	};


	displayFinalScore() {
		let finalScore = this.game.score;
		let bestScore = this.game.bestScore;
		let initialX = 350;
		let initialY = 300;
		let initialBestY = 365;
		let count = 0;
		if (finalScore == 0) {
			this.ctx.drawImage(this.game.canvasSprite, ...(this.numbers[0]), initialX, initialY, this.numbers[0][2] * SCALE_FACTOR, this.numbers[0][3] * SCALE_FACTOR);
		}else {
			while (finalScore != 0) {
				let index = finalScore % 10;
				finalScore = Math.floor(finalScore / 10);
				this.ctx.drawImage(this.game.canvasSprite, ...(this.numbers[index]), initialX - count * 15, initialY, this.numbers[index][2] * SCALE_FACTOR, this.numbers[index][3] * SCALE_FACTOR);
				count++;
			};
		};
		count = 0;
		if (bestScore == 0) {
			this.ctx.drawImage(this.game.canvasSprite, ...(this.numbers[0]), initialX, initialY, this.numbers[0][2] * SCALE_FACTOR, this.numbers[0][3] * SCALE_FACTOR);
		}else {
			while (bestScore != 0) {
				let index = bestScore % 10;
				bestScore = Math.floor(bestScore / 10);
				this.ctx.drawImage(this.game.canvasSprite, ...(this.numbers[index]), initialX - count * 15, initialBestY, this.numbers[index][2] * SCALE_FACTOR, this.numbers[index][3] * SCALE_FACTOR);
				count++;
			};
		};
	};
};