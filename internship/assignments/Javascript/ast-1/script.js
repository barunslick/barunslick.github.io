(function(){

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
carousalContainer.appendChild(btnRight);

var indicatorHolder = document.createElement('div');
indicatorHolder.style.position = 'absolute';
indicatorHolder.style.width = '100%';
indicatorHolder.style.borderRadius = btnSize/2 + 'px';
indicatorHolder.style.bottom = '40px';
indicatorHolder.style.textAlign = 'center';
carousalContainer.appendChild(indicatorHolder);
indicatorHolder.addEventListener('click',function(e){
    var targetIndex = e.target.value;
    if (targetIndex != undefined){
        console.log(targetIndex);
        var currentPos_slide = (imageWidth * currentIndex);
        var checkpoint_slide =  (imageWidth * (-targetIndex));
        var currentSlide = Math.abs(currentIndex)-1;
        //to determine how much to jump the currentIndex, since leftand right button only jumps by 1, but not the case in indicators
        var jump = Math.abs(targetIndex-(Math.abs(currentIndex)));
        slider(checkpoint_slide, currentPos_slide,jump);
        var nextSlide = Math.abs(targetIndex)-1;
        changeDot(currentSlide, nextSlide);
    }
    
})

var indicatorSize = 12;
var arrayIndicators = []
for (let i = 1; i < 6 ;i++){
    var value = i;
    var indicator = document.createElement('div');
    indicator.value = i;
    indicator.style.display = 'inline-block';
    indicator.style.height = indicatorSize + 'px';
    indicator.style.width = indicatorSize + 'px';
    indicator.style.borderRadius = (indicatorSize+2)/2 + 'px';
    indicator.style.border = '1px solid yellow'
    indicator.style.backgroundColor = 'none';
    indicator.style.marginRight = '5px';
    indicator.style.cursor = 'pointer';
    indicatorHolder.appendChild(indicator);
    arrayIndicators.push(indicator);
}
arrayIndicators[0].classList.add('dot-active');

var imageWidth = images.clientWidth;
currentIndex = -1;
btnRight.addEventListener('click',function(){   
    var checkpoint_r =  (imageWidth * (currentIndex-1));
    var currentPos_r = (imageWidth * currentIndex);
    var currentSlide = Math.abs(currentIndex)-1;
    slider(checkpoint_r, currentPos_r);
    var nextSlide = Math.abs(currentIndex)-1;
    changeDot(currentSlide, nextSlide);
})

btnLeft.addEventListener('click',function(){   
    var currentPos_l = imageWidth*currentIndex;
    var checkpoint_l =  (currentPos_l + imageWidth);
    var currentSlide = Math.abs(currentIndex)-1;
    slider(checkpoint_l, currentPos_l);
    var nextSlide = Math.abs(currentIndex)-1;
    changeDot(currentSlide, nextSlide);
})

function changeDot(currentDotIndex, requiredDotIndex){
    var requiredDotIndex = requiredDotIndex == -1 ? 4: requiredDotIndex;
    var requiredDotIndex = requiredDotIndex == 5 ? 0: requiredDotIndex;
    arrayIndicators[currentDotIndex].classList.remove('dot-active');
    arrayIndicators[requiredDotIndex].classList.add('dot-active');

}
function slider(checkpoint, currentPos ,jump = 1){
    if (checkpoint < currentPos){
        currentIndex = currentIndex - 1*jump;
        function animate_r(){
            var animation_id = window.requestAnimationFrame(animate_r);
            carouselImageWrapper.style.left =  currentPos + 'px';
            currentPos -= 40*jump;
            if (currentPos < checkpoint){
                if(currentIndex == -6){
                    currentIndex = -1;
                    carouselImageWrapper.style.left = (imageWidth * currentIndex) + 'px';
                }
                cancelAnimationFrame(animation_id);  
            }
        }
        animate_r();
    }else if(checkpoint > currentPos){
        console.log(jump);
        currentIndex = currentIndex + 1*jump;
        function animate_l(){ 
            var animation_id_l = window.requestAnimationFrame(animate_l);
            carouselImageWrapper.style.left = currentPos + 'px';
            currentPos += 40*jump;
            if (currentPos > checkpoint){
                if(currentIndex == 0){
                    currentIndex = -5;
                    carouselImageWrapper.style.left = (imageWidth * currentIndex) + 'px';
                }
                cancelAnimationFrame(animation_id_l);
            }
        }
        animate_l();
    }
    return;
}

}());