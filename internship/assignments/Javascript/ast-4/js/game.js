import Environment from '/js/environment.js';
import UserCar from '/js/usercar.js';

export default class Game {

  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.environment = new Environment(this);
    this.userCar = new UserCar(this);
  }

  update(){
    this.environment.update();
    this.userCar.update();
  }

}