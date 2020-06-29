var ballColors = ['#007bff', '#6610f2', '#fd7e14', '#ffc107', '#28a745', '#17a2b8', '#6c757d'];

var Ball = function (x, y, radius, velocity) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.velocity = velocity;
	this.color = ballColors[getRandomIntRange(0,ballColors.length)]
}

Ball.prototype.hardSeperate = function(stickyPartner){
	var helpVelocity = -(this.velocity.x) * 2; //2 amplifies the splitting process
	var count = 0;
	while(getDistance(this.x, this.y, stickyPartner.x, stickyPartner.y) <= (this.radius + stickyPartner.radius)){
		this.x += helpVelocity;
		this.updatePosition();
		count++;
		if (count >100){ //prevent going infinite loop
			break;
		}
	}
}

Ball.prototype.draw = function () {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, pi * 2, false);
	ctx.fillStyle = this.color;
	console.log(this.color);
	ctx.fill();
}

Ball.prototype.updatePosition = function () {
	if (this.velocity.x == 0 && this.velocity.y == 0) {
		this.velocity.x = getRandomIntRange(-2, 2);
		this.velocity.y = getRandomIntRange(-2, 2);
		this.updatePosition();
	}
	this.x += this.velocity.x;
	this.y += this.velocity.y;
}

Ball.prototype.checkWallCollision = function () {
	if (this.y + this.radius >= window.innerHeight) {
		this.y = window.innerHeight - this.radius;
		this.velocity.y = -this.velocity.y;
	}
	if (this.y <= this.radius) {
		this.y = 0 + this.radius;
		this.velocity.y = -this.velocity.y;
	}
	if (this.x + this.radius >= window.innerWidth ) {
		this.x = window.innerWidth - this.radius;
		this.velocity.x = -this.velocity.x;
	}
	if (this.x <= this.radius) {
		this.x = 0 + this.radius;
		this.velocity.x = -this.velocity.x;
	}
}

Ball.prototype.checkBallCollision = function(allBalls){
	for (let i = 0; i < allBalls.length; i++) {
		if (this == allBalls[i]) continue;
		if (getDistance(this.x, this.y, allBalls[i].x, allBalls[i].y) <= (this.radius + allBalls[i].radius)) {
			var tx = this.velocity.x;
			var ty = this.velocity.y;
			this.velocity.x = allBalls[i].velocity.x;
			this.velocity.y = allBalls[i].velocity.y;
			allBalls[i].velocity.x = tx;
			allBalls[i].velocity.y = ty;
			this.color = ballColors[getRandomIntRange(0,ballColors.length)];
			ballsArray[i].color = ballColors[getRandomIntRange(0,ballColors.length)];
			this.updatePosition();
			ballsArray[i].updatePosition();
		}
		//sometimes two balls get overlapped and simple change in velocity doesnt remove them..so this function hard sperates them
		if (getDistance(this.x, this.y, allBalls[i].x, allBalls[i].y) <= (this.radius + allBalls[i].radius)) {
			this.hardSeperate(allBalls[i]);	
		}
	}
}

