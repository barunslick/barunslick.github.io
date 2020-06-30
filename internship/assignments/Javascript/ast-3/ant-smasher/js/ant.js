var mainDiv = document.querySelector('.ant-hive');

var Ant = function (x, y, velocity, radius ,arrayPosition) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.arrayPosition = arrayPosition;
	this.diameter = this.radius * 2;
	this.velocity = velocity;
	this.element = document.createElement('div');
	this.element.classList.add('ant');
	this.draw();
	mainDiv.appendChild(this.element);
	this.element.addEventListener('click', ()=> {
		this.element.style.display = 'none';
		antArray.splice(this.arrayPosition,1)
	})
}

Ant.prototype.draw = function () {
	this.element.style.top = this.y + 'px';
	this.element.style.left = this.x + 'px';
}

Ant.prototype.updatePosition = function () {
	this.velocity.x = (this.velocity.x ==0) ? Math.random()-0.5: this.velocity.x;
	this.velocity.y = (this.velocity.y ==0) ? Math.random()-0.5: this.velocity.y;
	this.x += this.velocity.x;
	this.y += this.velocity.y;
}

Ant.prototype.checkWallCollision = function () {
	if (this.y + this.diameter >= divHeight) {
		this.y = divHeight - this.diameter;
		this.velocity.y = -this.velocity.y;
	}
	if (this.y <= 0) {
		this.y = this.radius;
		this.velocity.y = -this.velocity.y;
	}
	if (this.x + this.diameter >= divWidth) {
		this.x = divWidth - this.diameter;
		this.velocity.x = -this.velocity.x;
	}
	if (this.x <= 0) {
		this.x = this.radius;
		this.velocity.x = -this.velocity.x;
	}
}

Ant.prototype.checkAntCollision = function(allAnts){
	for (let i = 0; i < allAnts.length; i++) {
		if (this == allAnts[i]) continue;
		if (getDistance(this.x, this.y, allAnts[i].x, allAnts[i].y) <= ( 2* this.radius)) {
			var tx = this.velocity.x;
			var ty = this.velocity.y;
			this.velocity.x = allAnts[i].velocity.x;
			this.velocity.y = allAnts[i].velocity.y;
			allAnts[i].velocity.x = tx;
			allAnts[i].velocity.y = ty;
			this.updatePosition();
			allAnts[i].updatePosition();
		}
		if (getDistance(this.x, this.y, allAnts[i].x, allAnts[i].y) <= (this.radius + allAnts[i].radius)) {
			this.hardSeperate(allAnts[i]);	
		}

	}
}
Ant.prototype.hardSeperate = function(stickyPartner){
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