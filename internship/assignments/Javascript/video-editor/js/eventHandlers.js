let animationDiv = document.querySelector('.timeline .video-pane');
let fadeInDiv = document.querySelector('.effects-filters .fade-in');
let fadeOutDiv = document.querySelector('.effects-filters .fade-out');
let blackAndWhitedDiv = document.querySelector('.main-container .black-and-white');

let FadeInCheckImage = document.querySelector('.main-container .boxes .fade-in img');
let FadeOutCheckImage = document.querySelector('.main-container .boxes .fade-out img');
let BlackAndWhiteCheckImage = document.querySelector('.main-container .boxes .black-and-white img');

fadeInDiv.addEventListener('click', fadeInIconChange);
fadeOutDiv.addEventListener('click', fadeOutIconChange);
blackAndWhitedDiv.addEventListener('click', blackAndWhiteIconChange);

/**
 * Checks if black and white filter is applied and changes icon accordingly
 * @returns {undefined}
 */
function blackAndWhiteIconChange() {
	if (videoArray[activeVideo].filterArray.includes('blackAndWhite')) {
		BlackAndWhiteCheckImage.src = PLUSIMAGEPATH;
		videoArray[activeVideo].removeFilter('blackAndWhite');
	} else {
		BlackAndWhiteCheckImage.src = CHECKIMAGEPATH;
		videoArray[activeVideo].addFilter('blackAndWhite');
	}
	return;
}

/**
 * Checks if fade out effect is applied and changes icon accordingly
 * @returns {undefined}
 */
function fadeInIconChange() {
	if (videoArray[activeVideo].effectArray.includes('fadeIn')) {
		FadeInCheckImage.src = PLUSIMAGEPATH;
		videoArray[activeVideo].removeEffect('fadeIn');
	} else {
		FadeInCheckImage.src = CHECKIMAGEPATH;
		videoArray[activeVideo].addEffect('fadeIn');
	}
	return;
}

/**
 * Checks if fade in effect is applied and changes icon accordingly
 * @returns {undefined}
 */
function fadeOutIconChange() {
	if (videoArray[activeVideo].effectArray.includes('fadeOut')) {
		FadeOutCheckImage.src = PLUSIMAGEPATH;
		videoArray[activeVideo].removeEffect('fadeOut');
	} else {
		FadeOutCheckImage.src = CHECKIMAGEPATH;
		videoArray[activeVideo].addEffect('fadeOut');
	}
}
