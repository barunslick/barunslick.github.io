let animationDiv = document.querySelector('.timeline .video-pane');
let blackAndWhitedDiv = document.querySelector('.main-container .black-and-white');
let fadeInDiv = document.querySelector('.effects-filters .fade-in');
let fadeOutDiv = document.querySelector('.effects-filters .fade-out');

let FadeInCheckImage = document.querySelector('.main-container .boxes .fade-in img');
let FadeOutCheckImage = document.querySelector('.main-container .boxes .fade-out img');
let BlackAndWhiteCheckImage = document.querySelector('.main-container .boxes .black-and-white img');

/* animationDiv.addEventListener('click',(e) =>{
    console.log(e.target);
}); */

blackAndWhitedDiv.addEventListener('click', blackAndWhiteIconChange);

function blackAndWhiteIconChange(){
	if (videoArray[activeVideo].filterArray.includes('blackAndWhite')) {
		BlackAndWhiteCheckImage.src = "assets/images/plus.png"
		videoArray[activeVideo].removeFilter('blackAndWhite');
	} else {
		BlackAndWhiteCheckImage.src = "assets/images/check.png"
		videoArray[activeVideo].addFilter('blackAndWhite');
	}
}


fadeInDiv.addEventListener('click', fadeInIconChange);

function fadeInIconChange(){
	if (videoArray[activeVideo].effectArray.includes('fadeIn')) {
		FadeInCheckImage.src = "assets/images/plus.png"
		videoArray[activeVideo].removeEffect('fadeIn');
	} else {
		FadeInCheckImage.src = "assets/images/check.png"
		videoArray[activeVideo].addEffect('fadeIn');
	}
}

fadeOutDiv.addEventListener('click', fadeOutIconChange);

function fadeOutIconChange(){
	if (videoArray[activeVideo].effectArray.includes('fadeOut')) {
		FadeOutCheckImage.src = "assets/images/plus.png"
		videoArray[activeVideo].removeEffect('fadeOut');
	} else {
		FadeOutCheckImage.src = "assets/images/check.png"
		videoArray[activeVideo].addEffect('fadeOut');
	}
}