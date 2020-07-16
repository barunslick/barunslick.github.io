let animationDiv = document.querySelector('.timeline .video-pane');
let fadeInDiv = document.querySelector('.effects-filters .fade-in');
let fadeOutDiv = document.querySelector('.effects-filters .fade-out');

let playButton = document.querySelector('.controls .playpause .play');
let pauseButton = document.querySelector('.controls .playpause .pause');

let totalTimeIndicator = document.querySelector('.timeline .time .total-time');
let currentTimeIndicator = document.querySelector('.timeline .time .current-time');

let FadeInCheckImage = document.querySelector('.main-container .boxes .fade-in img');
let FadeOutCheckImage = document.querySelector('.main-container .boxes .fade-out img');
let muteVideoAudioCheckImage = document.querySelector('.effects-filters .mute-video-audio img');
let BlackAndWhiteCheckImage = document.querySelector('.main-container .boxes .black-and-white img');

let blackAndWhitedDiv = document.querySelector('.main-container .black-and-white');
let muteVideoAudioDiv = document.querySelector('.main-container .effects-filters .mute-video-audio');

let textBtn = document.getElementById('add-text-btn');

/* let audioMuteDiv = document.querySelector('.main-container .mute-audio');
let audioMuteCheckImage = document.querySelector('.main-container .mute-audio img'); */

playButton.addEventListener('click', playVideo);
pauseButton.addEventListener('click', pauseVideo);
muteVideoAudioDiv.addEventListener('click', muteVideoAudio);
fadeInDiv.addEventListener('click', fadeInIconChange);
fadeOutDiv.addEventListener('click', fadeOutIconChange);
blackAndWhitedDiv.addEventListener('click', blackAndWhiteIconChange);
/* audioMuteDiv.addEventListener('click', muteMusicAudio) */


let timer;
let currentGlobalTime  = 0;

function playVideo() {
	videoCurrent.play();
	timer = setInterval(changeTimer, 100);
}

function pauseVideo() {
	audioCurrent.pause();
	videoCurrent.pause();
	clearInterval(timer);
}
function muteMusicAudio(){
	
}


function muteVideoAudio(){
	videoArray[activeVideo].mute();
	console.log(videoArray[activeVideo].muteAudio)
	if (videoArray[activeVideo].muteAudio == true){
		muteVideoAudioCheckImage.src = CHECKIMAGEPATH;
	}else{
		muteVideoAudioCheckImage.src = PLUSIMAGEPATH;
	}
}

function changeTotaltimer() {
	totalTimeIndicator.innerHTML = secondsToHms(total);
}

function changeTimer() {
	checkAudioMute();
	if (activeVideo != 0) {
		let time = videoArray.slice(0, activeVideo).reduce(function (acc, value) {
			return acc += value.length;
		}, 0);
		sliderChange = videoCurrent.currentTime + time;
		currentTimeIndicator.innerHTML = secondsToHms(videoCurrent.currentTime + time);
		changeSlider(sliderChange / total * 100);
	} else {
		sliderChange = videoCurrent.currentTime;
		currentTimeIndicator.innerHTML = secondsToHms(videoCurrent.currentTime);
		changeSlider(sliderChange / total * 100);
	}
	currentGlobalTime = sliderChange;
	checkAudioPlayBack();
}

function checkAudioMute(){
	if (videoArray[activeVideo].muteAudio == true){
		videoCurrent.muted = true;
	}else{
		videoCurrent.muted = false;
	}
}



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
/* 
document.addEventListener('click', (e)=>{
	console.log(e)
	if (e.target == 'inside-text-area'){
		console.log(e, 'here')
	}


}) */


textBtn.addEventListener('click', (e) => {
	if (checkIfSpaceAvailable()){
		let length = textArray.length;
		let newText = new Text(length);
		textArray.push(newText);
	}
});

function checkIfSpaceAvailable(){
	let newRangeLeft = currentGlobalTime/total * 100;
	let newRangeRight = newRangeLeft + MINIMUMTEXTTIME/total * 100;
	for (let index = 0; index < textRangeDuration.length; index++) {
		if (inBetween (newRangeLeft,textRangeDuration[index][0] ,textRangeDuration[index][1]) || inBetween (newRangeRight,textRangeDuration[index][0] ,textRangeDuration[index][1])){
			return false;
		}
	}
	if (newRangeLeft > 100 - MINIMUMTEXTTIME/total * 100 && newRangeRight > 100) return false;
	return true;
}

function inBetween(num, min, max){
	if (num >= min && num <= max){
		return true;
	}
	return false;
}