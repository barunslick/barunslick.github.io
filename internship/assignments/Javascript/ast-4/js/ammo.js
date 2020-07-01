export default class Ammo{
    
    constructor(game ,x,y, lane){
        this.game = game;
        this.ctx = this.game.ctx;
        this.lane = lane;
        this.bullet = new Image;
        this.carHeight = this.game.userCar.imageHeight;
        this.bullet.src = 'images/player-car.png';
        this.x = x -5; //to center the bullet a bit
        this.y = y -5; //start from 5 top of car
        this.hit = false;
    }


    update(){
        this.y -= 4;
        this.ctx.drawImage(this.bullet, this.x, this.y, 10, 30);
        this.checkCollision();
    }
    checkCollision(){
        for(let i =0; i < this.game.enemyArray.length;i++){
            if ((this.lane == this.game.enemyArray[i].lane) && this.y <= (this.game.enemyArray[i].y + this.carHeight)){
                this.hit = true;
                this.game.enemyArray[i].collide = true;
            }
        }
    }
}