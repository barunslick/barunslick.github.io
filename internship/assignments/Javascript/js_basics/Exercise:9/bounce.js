(function(){


var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

topElement = document.createElement('p');
topElement.innerHTML = 'Tap inside div to toggle color';
topElement.style.textAlign = 'center';
document.body.appendChild(topElement);

function Div(width, height){
    this.width = width;
    this.height = height;
    this.element = document.createElement('div');
    this.element.style.height = this.height + 'px';
    this.element.style.width = this.width + 'px';
    this.element.style.border = '2px solid grey';
    this.element.style.display = 'inline-block';
    this.element.style.position = 'relative';
    this.element.style.margin = 50 + 'px';
    document.body.appendChild(this.element);
}

Div.prototype.addSpeedIndicator = function(speed){
    p = document.createElement('p');
    p.innerHTML = 'Speed:' + speed;
    p.style.margin = '0px';
    this.element.appendChild(p);
}

function Ball(size, color, speed, outerContainer){
    this.size = size;
    this.color = color;
    this.original_color = color
    this.speed = speed;
    this.ball = document.createElement('div');
    this.ball.style.height = this.size + 'px';
    this.ball.style.width = this.size + 'px';
    this.ball.style.backgroundColor = this.color;
    this.ball.style.position = 'absolute';
    this.ball.style.borderRadius = this.size/2 + 'px';
    this.ball.style.left = '50%';
    this.ball.style.marginLeft = - (this.size/2) + 'px';
    outerContainer.element.appendChild(this.ball);

    outerContainer.element.addEventListener('click', function(){
        this.changeColor();
    }.bind(this));

    this.animateBall(speed , outerContainer);
}

Ball.prototype.changeColor = function(){
    if (this.color == this.original_color){
        this.color = 'teal';
    }else{
        this.color = this.original_color
    }
    this.ball.style.backgroundColor = this.color;
}

Ball.prototype.animateBall = function(speed, outerContainer){
    var direction = 1;
    var currentPos = 0;
    var step = speed;
    function animate(){
    if (direction){
        currentPos += step;
        if (currentPos >= (outerContainer.height - this.size)){
            direction = 0;
        }
    }else{
        currentPos -= step;
        if (currentPos <= 0){
            direction = 1;
        }
    }
    this.ball.style.top = currentPos + 'px';
    requestAnimationFrame(animate.bind(this));
    };
    requestAnimationFrame(animate.bind(this));
}


divsBallsCollection = [
            [
                {
                    width:300,
                    height: 300
                },
                {
                    size: 20,
                    color: 'yellow',
                    speed: 20
                }
            ],
            [
                {
                    width:500,
                    height: 500
                },
                {
                    size: 40,
                    color: 'orange',
                    speed: 60
                }
            ],
            [
                {
                    width:100,
                    height: 100
                },
                {
                    size: 10,
                    color: 'red',
                    speed: 14
                }
            ],
            [
                {
                    width:600,
                    height: 300
                },
                {
                    size: 50,
                    color: 'red',
                    speed: 10
                }
            ],
            [
                {
                    width:100,
                    height: 300
                },
                {
                    size: 25,
                    color: 'red',
                    speed: 40
                }
            ],
            [
                {
                    width:200,
                    height: 150
                },
                {
                    size: 50,
                    color: 'red',
                    speed: 15
                }
            ],
]


for(let items of divsBallsCollection){
    let my_div = new Div(items[0].width,items[0].height);
    my_div.addSpeedIndicator(items[1].speed);
    let my_ball = new Ball(items[1].size, items[1].color, items[1].speed, my_div);
}

}());