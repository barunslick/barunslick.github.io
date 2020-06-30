//setting up the canvas
let canvas = document.getElementById('ball-collision');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pi = Math.PI;
//get  CanvasRenderingContext2D object
var ctx = canvas.getContext('2d');

let radiusMinrange = 2;
let radiusMaxrange = 6;

let noOfBalls = 1000; //change radius range while stress testing
let ballsArray = []
function init(){
  for (let i = 0; i < noOfBalls; i++){
    let radius = getRandomIntRange(radiusMinrange,radiusMaxrange);
    let x = getRandomIntRange(radius, window.innerWidth-radius); // this basically gives us an integer value from raidus to total width - raidus so that it doesnt pop up outside boundry
    let y = getRandomIntRange(radius, window.innerHeight-radius);
    let checker = false;
    let velocity = {
      x: getRandomIntRange(-5,5),
      y: getRandomIntRange(-5,5)
    };
    if (ballsArray.length !==0){
      checker = checkOverlap(x, y, radius, ballsArray);
    }
    if(checker){
      i--;
      continue;
    }
    ballsArray.push(new Ball(x, y, radius, velocity));
    ballsArray[i].draw();
  }
  render();
}

init();

function checkOverlap(x, y, radius,ballsArray){
  for(let j = 0; j < ballsArray.length ; j++){
    if ( getDistance(x, y , ballsArray[j].x, ballsArray[j].y ) < ( radius + ballsArray[j].radius )){
    return true;
    }
  }
  return false;
}

function render(){
  window.requestAnimationFrame(render);
  ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
  ballsArray.forEach( ball => {
    ball.draw();
    ball.updatePosition();
    ball.checkWallCollision();
    ball.checkBallCollision(ballsArray);
  });
}

//gets a random value from given range
function getRandomIntRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//get distance between two balls
function getDistance( x1, y1, x2, y2){
  const xDistance = x2 - x1;
  const yDistance = y2 - y1;
  return Math.hypot(xDistance, yDistance)
}


