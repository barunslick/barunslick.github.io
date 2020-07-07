let animationDiv = document.querySelector('.timeline .video-pane');
let blackAndWhitedDiv = document.querySelector('.main-container .black-and-white');
let fadeInDiv = document.querySelector('.effects-filters .fade-in');
let fadeOutDiv = document.querySelector('.effects-filters .fade-out');

/* animationDiv.addEventListener('click',(e) =>{
    console.log(e.target);
}); */

blackAndWhitedDiv.addEventListener('click', () => {
    if (videoArray[activeVideo].filterArray.includes('blackAndWhite')){
        videoArray[activeVideo].removeFilter('blackAndWhite');
    }else{
    videoArray[activeVideo].addFilter('blackAndWhite');
    }
});



fadeInDiv.addEventListener('click', () => {
    if (videoArray[activeVideo].effectArray.includes('fadeIn')){
        videoArray[activeVideo].removeEffect('fadeIn');
    }else{
    videoArray[activeVideo].addEffect('fadeIn');
    }
});


fadeOutDiv.addEventListener('click', () => {
    if (videoArray[activeVideo].effectArray.includes('fadeOut')){
        videoArray[activeVideo].removeEffect('fadeOut');
    }else{
    videoArray[activeVideo].addEffect('fadeOut');
    }
});