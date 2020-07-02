import { getBird } from '../js/sprites.js'

export default class Bird {

  constructor(game) {
    this.game = game;
    this.ctx = this.game.ctx;
    this.x = 70;
    this.y = 300;
    this.switch = false;
    this.frame = 0;
    this.totalFrames = 3;
    this.gravity = 0.3;
    this.speed = 0;
    this.jump = 6;
    [this.sx, this.sy, this.width, this.height] = getBird();
    this.radius = this.width * 3 - 10;
    this.toStopPosition = this.game.gameHeight - this.game.background.backgoundSpriteBottom[7];
  };

  update() {
    if (this.game.gameStatus == 0 || this.game.gameStatus == 1) {
      let moveBy = (this.game.mainFrame % 10) == 0 ? 1 : 0;
      this.frame += moveBy;
      this.frame = this.frame % this.totalFrames;
      
    }

    if (this.y + this.height * 3 <= this.toStopPosition) {
      if (this.game.gameStatus == 1) {
        this.goDown();
      }
      this.ctx.drawImage(this.game.canvasSprite, this.sx + (this.frame * (11 + this.width)), this.sy, this.width, this.height, this.x, this.y, this.width * 3, this.height * 3);
    } else {
      this.ctx.drawImage(this.game.canvasSprite, this.sx, this.sy, this.width, this.height, this.x, this.y, this.width * 3, this.height * 3);
      this.game.gameStatus = 2;
    }
  };

  goDown() {
    this.speed += this.gravity;
    this.y += this.speed;
  }

  moveUp() {
    this.speed = -this.jump;
  }

  checkHitBotton() {
    if (this.y + this.height >= this.game.gameHeight) {
      this.game.gameStatus = 2;
    }
  }

};