export default class UserCar{

    constructor(game){
        this.game = game;
        this.ctx = this.game.ctx;
        this.userCarImage = new Image;
        this.userCarImage.src = '../images/player1-car.png';
        this.imageSize = 80;
        this.x = this.game.gameWidth/2 - this.imageSize/2; // 64 being image size;
        this.y = this.game.gameHeight - 100;
    }

    update(){
        this.ctx.drawImage(this.userCarImage, this.x, this.y, this.imageSize,this.imageSize);
    }

}