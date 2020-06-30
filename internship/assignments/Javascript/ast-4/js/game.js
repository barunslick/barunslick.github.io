import Environment from '/js/environment.js';
import UserCar from '/js/usercar.js';
import InputHandler from '/js/inputHandler.js'
import EnemyCar from '/js/enemyCar.js'

export default class Game {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.environment = new Environment(this);
    this.userCar = new UserCar(this);
    this.eventHandler = new InputHandler(this);
    this.scoreDiv = document.getElementById('score-update');
    this.score = 0;
    this.previousEnemyLaneSpawn = 0;
    this.enemyArray = []
    this.pause = false;
    this.spawnEnemy();
    setInterval(this.spawnEnemy.bind(this),4000);
  }

  update(){
    if (this.pause){
      return ['finish' , this.score];
    };
    this.scoreDiv.innerText = this.score;
    this.environment.update();
    this.userCar.update();
    this.enemyArray.forEach((enemy)=>{
      enemy.update();
    })
    let newArray = [];
    for (let i = 0; i < this.enemyArray.length; i++){
      if (this.enemyArray[i].y < this.gameHeight){
        newArray.push(this.enemyArray[i]);
      }else{
        this.updateScore();
        this.enemyArray[i] = null;
      }
    }
    this.enemyArray = newArray;
  }

  updateScore(){
    if (this.pause) return;
    this.score += 1;
  }

  spawnEnemy(){
    let lane = Math.round((Math.random())*2);
    let newEnemy = new EnemyCar(this, lane);
    this.enemyArray.push(newEnemy);
  }

  /* randomLaneGenerator(){
    let randomLane = getRandomIntRange(0,2);
    if (randomLane != this.previousEnemyLaneSpawn){
      this.previousEnemyLaneSpawn = randomLane;
      return randomLane;
    }else{
      this.randomLaneGenerator();
    }
  } */

}
function getRandomIntRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}