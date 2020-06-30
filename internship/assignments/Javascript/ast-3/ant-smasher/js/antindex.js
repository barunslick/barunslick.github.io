let noOfAnts = 10;
let antRadius = 30;
let divHeight = document.querySelector('.ant-hive').clientHeight;
let divWidth = document.querySelector('.ant-hive').clientWidth;
var antArray = [];
for (let i = 0; i < noOfAnts; i++) {
	let checker = false;
	let x = getRandomIntRange(antRadius, divWidth - antRadius);
	let y = getRandomIntRange(antRadius, divHeight - antRadius);
	console.log(x,y)
	let velocity = {
		x: Math.random()-0.5,
		y: Math.random()-0.5
	}
	if (antArray.length !== 0) {
		checker = checkOverlap(x, y, antRadius, antArray);
	}
	if (checker) {
		i--;
		continue;
	}
	antArray.push(new Ant(x, y, velocity, antRadius , i));
	antArray[i].draw();
}


function animate() {
	antArray.forEach(ant => {
		updateArrayIndex();
		ant.draw();
		ant.updatePosition();
		ant.checkWallCollision();
		ant.checkAntCollision(antArray);
	});
	window.requestAnimationFrame(animate);
}
animate();


function updateArrayIndex(){
	for(let i=0; i< antArray.length; i++){
		antArray[i].arrayPosition = i;
	}
}

function checkOverlap(x, y, radius, antArray) {
	for (let j = 0; j < antArray.length; j++) {
		if (getDistance(x, y, antArray[j].x, antArray[j].y) < (radius + antArray[j].radius)) {
			return true;
		}
	}
	return false;
}

function getRandomIntRange(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

//get distance between two balls
function getDistance(x1, y1, x2, y2) {
	const xDistance = x2 - x1;
	const yDistance = y2 - y1;
	return Math.hypot(xDistance, yDistance)
}