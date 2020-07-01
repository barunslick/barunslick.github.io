export default class EnemyCar {

	constructor(game, lane , speed) {
		this.game = game;
		this.ctx = this.game.ctx;
		this.enemyCarImage = new Image;
		this.enemyCarImage.src = 'images/' + getRandomIntRange(1,4) + '.png';
		this.imageHeight = 100;
		this.imageWidth = 60;
		this.lane = lane;
		this.x = (this.lane * this.game.gameWidth/3 + this.imageWidth/2) + 20; // 64 being image size;
		this.y = -50;
		this.speed = speed;
		this.cross = false;
	}

	update(){
		console.log(this.speed, '_________')
		this.y += this.speed;
		this.ctx.drawImage(this.enemyCarImage, this.x, this.y, this.imageWidth, this.imageHeight);
		this.collisionDetection();
		if (this.y > this.game.gameHeight){
			this.cross = true;
		}
		
	}

	collisionDetection(){
		this.game.enemyArray.forEach((enemy)=>{
			if (enemy.y >= this.game.gameWidth/2 && enemy.y < (this.game.userCar.y + this.imageHeight)){
				if (enemy.x == this.game.userCar.x && ((this.game.userCar.y - enemy.y ) < this.imageHeight)) this.game.pause = true;
			}	
		})
	}

}

function getRandomIntRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}