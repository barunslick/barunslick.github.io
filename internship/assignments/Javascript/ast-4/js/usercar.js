import AmmoManagement from '../js/ammoManagment.js';
export default class UserCar {

	constructor(game) {
		this.game = game;
		this.ctx = this.game.ctx;
		this.userCarImage = new Image;
		this.userCarImage.src = 'images/player-car.png';
		this.imageHeight = 100;
		this.imageWidth = 60;
		this.lane = 1;
		this.x = (this.lane * this.game.gameWidth/3 + this.imageWidth/2) + 20; // 64 being image size;
		this.y = this.game.gameHeight - 150;
		this.ammoManagement = new AmmoManagement(game);
	}

	update() {
		this.ammoManagement.update();
		this.ctx.drawImage(this.userCarImage, this.x, this.y, this.imageWidth, this.imageHeight);
	}

	goLeft() {
		if(this.lane > 0){
			this.lane -= 1;
			this.x -= 150; 
		}
	}
	
	goRight(){
		if (this.lane < 2){
		this.lane += 1
		this.x += 150;
		}
	}
	
	shoot(){
		this.ammoManagement.throwBullet(this.x+this.imageWidth/2,this.y, this.lane);
	}

}