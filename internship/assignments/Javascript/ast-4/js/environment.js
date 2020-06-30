export default class Environment {

  constructor(game) {
    this.game = game;
    this.yOffset = -this.game.gameHeight;
    this.ctx = this.game.ctx;
    this.roadImgEnvironment = new Image;
    this.roadImgEnvironment.src = "../images/road.png";
  }

  update() {
    this.yOffset = (this.yOffset >= 0) ? -this.game.gameHeight : this.yOffset;
    this.ctx.drawImage(this.roadImgEnvironment, 0, 0, this.game.gameWidth, this.game.gameHeight);
    this.ctx.drawImage(this.roadImgEnvironment, 0, this.yOffset, this.game.gameWidth, this.game.gameHeight);
    this.yOffset += 15;
  }

}