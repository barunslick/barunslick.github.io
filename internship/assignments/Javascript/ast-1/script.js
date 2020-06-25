var carousalContainer = document.querySelector('.carousel-container');
var carouselImageWrapper = document.querySelector('.carousel-image-wrapper');
var images = document.querySelector('.carousel-image-wrapper img');

var btnSize = 40;
var btnLeft = document.createElement('div');
btnLeft.style.position = 'absolute';
btnLeft.style.height = btnSize + 'px';
btnLeft.style.width = btnSize + 'px';
btnLeft.style.borderRadius = btnSize/2 + 'px';
btnLeft.style.backgroundColor = 'yellow';
btnLeft.style.top = '50%';
btnLeft.style.left = '20px';
carousalContainer.appendChild(btnLeft);

var btnRight = document.createElement('div');
btnRight.style.position = 'absolute';
btnRight.style.height = btnSize + 'px';
btnRight.style.width = btnSize + 'px';
btnRight.style.borderRadius = btnSize/2 + 'px';
btnRight.style.backgroundColor = 'yellow';
btnRight.style.top = '50%';
btnRight.style.right = '20px';
carousalContainer.appendChild(btnLeft);
carousalContainer.appendChild(btnRight);

var imageWidth = images.clientWidth;

currentIndex = -1;
btnRight.addEventListener('click',function(){   
    var checkpoint_r =  (imageWidth * (currentIndex-1));
    var currentPos_r = (imageWidth * currentIndex);
    currentIndex--;
    console.log(currentIndex)
    function animate(){
        var animation_id = window.requestAnimationFrame(animate);
        carouselImageWrapper.style.left =  currentPos_r  + 'px';
        currentPos_r -= 40;
        if (currentPos_r < checkpoint_r){
            cancelAnimationFrame(animation_id);
            if(currentIndex == -6){
                currentIndex = -1;
                carouselImageWrapper.style.left = (imageWidth * currentIndex) + 'px';
            }
        }
    }
    animate();
    
})
btnLeft.addEventListener('click',function(){   
    var currentPos_l = imageWidth*currentIndex;
    var checkpoint_l =  (currentPos_l + imageWidth);
    currentIndex++;
    function animateleft(){
        var animation_id_l = window.requestAnimationFrame(animateleft);
        carouselImageWrapper.style.left = currentPos_l + 'px';
        currentPos_l += 40;
        if (currentPos_l > checkpoint_l){
            cancelAnimationFrame(animation_id_l);
            if(currentIndex == 0){
                currentIndex = -5;
                carouselImageWrapper.style.left = (imageWidth * currentIndex) + 'px';
            }
        }
    }
    animateleft();
})
