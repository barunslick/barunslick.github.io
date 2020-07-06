let animationDiv = document.querySelector('.timeline .video-pane');
let blackAndWhitedDiv = document.querySelector('.main-container .black-and-white')

animationDiv.addEventListener('click',(e) =>{
    console.log(e.target);
});

blackAndWhitedDiv.addEventListener('click', () => {
    if (videoArray[activeVideo].filterArray.includes('blackAndWhite')){
        videoArray[activeVideo].removeFilter('blackAndWhite');
    }else{
    videoArray[activeVideo].addFilter('blackAndWhite');
    }
});