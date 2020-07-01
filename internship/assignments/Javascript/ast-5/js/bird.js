import { getBird } from '../js/sprites.js'

export default class Bird {

  constructor(game) {
    this.game = game;
    this.ctx = this.game.ctx;
    this.x = 70;
    this.y = 300;
    this.switch = false;
    this.frame = 0;
    this.counter =10;
    this.totalFrames = 3;
    [this.sx, this.sy, this.width, this.height] = getBird();
    this.radius = this.width * 3 - 10;
  };

  update() {
    let moveBy = (this.game.mainFrame % 10) == 0 ? 1 : 0;
    this.frame += moveBy;
    this.frame = this.frame % this.totalFrames;
    if (this.y + this.height*3 <= this.game.gameHeight) {
      if (this.game.gameStatus == 1) this.goDown();
      this.ctx.drawImage(this.game.canvasSprite, this.sx + (this.frame * (11 + this.width)), this.sy , this.width, this.height, this.x, this.y, this.width * 3, this.height * 3);
    }else {
     this.ctx.drawImage(this.game.canvasSprite, this.sx , this.sy , this.width, this.height, this.x, this.y, this.width * 3, this.height * 3);
    }
  };

  goDown(){
    this.y += 5;
  }

};