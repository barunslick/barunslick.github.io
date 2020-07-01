import { getBackgroundTop, getNumbers } from '../js/sprites.js'
import { getBackgroundBottom } from '../js/sprites.js'
import { getWelcome } from '../js/sprites.js'
import { getTapToStart } from '../js/sprites.js'
import { gameOver } from '../js/sprites.js'
import { gameMedal } from '../js/sprites.js'
import { play } from '../js/sprites.js'


export default class Environment {

	constructor(game) {
		this.game = game;
		this.ctx = this.game.ctx;
		this.backgoundSprite = getBackgroundTop();
		this.backgoundSpriteBottom = getBackgroundBottom();
		this.welcomeScreen = [getWelcome(), getTapToStart()];
		this.gameOver = [gameOver(), gameMedal(), play()];
		this.numbers = getNumbers();
		this.currentScore = 0;
		/* this.scoreScreen = ; */
	}

	update() {
		this.ctx.drawImage(this.game.canvasSprite, ...this.backgoundSprite);
		this.ctx.drawImage(this.game.canvasSprite, ...this.backgoundSpriteBottom);

		if (this.game.gameStatus == 0) {
			this.welcomeScreen.forEach((item) => {
				this.ctx.drawImage(this.game.canvasSprite, ...item);
			})
		} else if (this.game.gameStatus == 2) {
			this.gameOver.forEach((item) => {
				this.ctx.drawImage(this.game.canvasSprite, ...item);
			})
			this.displayFinalScore();
		} else {
			this.displayCurrentScore();
		}
	}

	displayCurrentScore() {
		let initialX = 200;
		let initialY = 100;
		let initailScore = this.game.score;
		let count = 0;
		if (initailScore == 0) {
			this.ctx.drawImage(this.game.canvasSprite, ...(this.numbers[0]), initialX, initialY, this.numbers[0][2] * 5, this.numbers[0][3] * 5);
		} else {
			while (initailScore != 0) {
				let index = initailScore % 10;
				initailScore = Math.floor(initailScore / 10);
				this.ctx.drawImage(this.game.canvasSprite, ...(this.numbers[index]), initialX - count * 15, initialY, this.numbers[index][2] * 5, this.numbers[index][3] * 5);
				count++;
			}
		}
	}


	displayFinalScore() {
		let finalScore = this.game.score;
		let bestScore = this.game.bestScore;
		let initialX = 350;
		let initialY = 300;
		let initialBestY = 365;
		let count = 0;
		if (finalScore == 0) {
			this.ctx.drawImage(this.game.canvasSprite, ...(this.numbers[0]), initialX, initialY, this.numbers[0][2] * 3, this.numbers[0][3] * 3);
		} else {
			while (finalScore != 0) {
				let index = finalScore % 10;
				finalScore = Math.floor(finalScore / 10);
				this.ctx.drawImage(this.game.canvasSprite, ...(this.numbers[index]), initialX - count * 15, initialY, this.numbers[index][2] * 3, this.numbers[index][3] * 3);
				count++;
			}
		}
		count = 0;
		if (bestScore == 0) {
			this.ctx.drawImage(this.game.canvasSprite, ...(this.numbers[0]), initialX, initialY, this.numbers[0][2] * 3, this.numbers[0][3] * 3);
		} else {
			while (bestScore != 0) {
				let index = bestScore % 10;
				bestScore = Math.floor(bestScore / 10);
				this.ctx.drawImage(this.game.canvasSprite, ...(this.numbers[index]), initialX - count * 15, initialBestY, this.numbers[index][2] * 3, this.numbers[index][3] * 3);
				count++;
			}
		}
	}
}