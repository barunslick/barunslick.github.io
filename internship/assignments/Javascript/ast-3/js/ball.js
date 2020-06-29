var Ball = function (x, y, radius, velocity){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velociity = velocity;

    this.draw = () => {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, pi * 2, false);
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }

}