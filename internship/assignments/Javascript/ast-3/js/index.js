//setting up the canvas
var canvas = document.getElementById('ball-collision');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const pi = Math.PI;
//get  CanvasRenderingContext2D object
var ctx = canvas.getContext('2d');

let noOfBalls = 100;
let ballsArray = []
for (let i = 0; i < noOfBalls; i++){
  let radius = 20;
  let x = getRandomIntRange(radius, window.innerWidth-radius);
  let y = getRandomIntRange(radius, window.innerHeight-radius);
  let newBall = new Ball(x, y, radius);
  ballsArray.push(newBall);
  newBall.draw();
}


//gets a random value from given range
function getRandomIntRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


