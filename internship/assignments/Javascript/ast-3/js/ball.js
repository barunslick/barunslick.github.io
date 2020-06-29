var Ball = function (x, y, radius, velocity){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velociity = velocity;
}

Ball.prototype.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, pi * 2, false);
    ctx.strokeStyle = 'red';
    ctx.stroke();
}

Ball.prototype.updatePosition = function(){
    this.x += this.velociity.x;
    this.y += this.velociity.y;
}

Ball.prototype.checkWallCollision = function(){
    if (this.y + this.radius >= window.innerHeight || this.y  <= this.radius){
        this.velociity.y = -this.velociity.y;
    }
    if (this.x + this.radius >= window.innerWidth || this.x <= this.radius){
        this.velociity.x = -this.velociity.x;
    }
}

Ball.prototype.checkBallCollision = function(allBalls){
    for (let i = 0; i < allBalls.length; i++){
        if (this == allBalls[i]) continue;
        if (getDistance(this.x, this.y, allBalls[i].x, allBalls[i].y) <= (this.radius + allBalls[i].radius)){
            this.velociity.x = -this.velociity.x - Math.random()*3;
            this.velociity.y = -this.velociity.y - Math.random()*3;
        }
    }
}