(function(){


var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;


var div_height = 600;
var div_width = 600;
var my_div = document.createElement('div');
my_div.style.height = div_height + 'px';
my_div.style.width = div_width + 'px';
my_div.style.border = '2px solid grey';
my_div.style.position = 'relative';
my_div.style.left = 50 +'%';
my_div.style.transform = 'translateX(-50%)';
my_div.style.marginTop = 100 + 'px';
document.body.appendChild(my_div);


var ball_dimension = 100;
var ball = document.createElement('div');
ball.style.height = ball_dimension + 'px';
ball.style.width = ball_dimension + 'px';
ball.style.backgroundColor = 'skyblue';
ball.style.position = 'absolute';
ball.style.borderRadius = 50 + 'px';
ball.style.left = '50%';
ball.style.marginLeft = - (ball_dimension/2) + 'px';
my_div.appendChild(ball);


var direction = 1;
var currentPos = 0;
var step = div_height/60;
function animate(){
    if (direction){
        currentPos += step;
        if (currentPos >= (div_height-ball_dimension)){
            direction = 0;
        }
    }else{
        currentPos -= step;
        if (currentPos <= 0){
            direction = 1;
        }
    }
    ball.style.top = currentPos + 'px';
    requestAnimationFrame(animate);
}

animate();

}());