var mainDiv = document.querySelector('.ant-hive');

var Ant = function(x, y, velocity){
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.element = document.createElement('div');
    this.element.classList.add('ant');
    mainDiv.appendChild(this.element)
}

Ant.prototype.draw = function(){
    this.element.style.bottom = this.x + 'px';
    this.element.style.left = this.y + 'px';
}

Ant.prototype.updatePosition = function(){
    this.x += 1;
    this.y += 1;
}
