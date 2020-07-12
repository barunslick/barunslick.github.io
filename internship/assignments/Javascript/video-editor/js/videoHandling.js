let videoCurrent = document.getElementById('video-current');
let playButton = document.querySelector('.controls .playpause .play');
let pauseButton = document.querySelector('.controls .playpause .pause');
let totalTimeIndicator = document.querySelector('.timeline .time .total-time');
let currentTimeIndicator = document.querySelector('.timeline .time .current-time');

playButton.addEventListener('click', playVideo);
pauseButton.addEventListener('click', pauseVideo);
videoCurrent.addEventListener('ended', changeVideo);

let timer;
let activeVideo = 0;


function loadVideo(videoArray, videoList) {
	videoCurrent.src = videoArray[activeVideo].urlSource;
	videoCurrent.setAttribute('preload', 'auto');
	videoCurrent.load();
	changeTotaltimer();
}

function changeVideo() {
	clearInterval(timer);
	if (activeVideo < videoArray.length - 1) {
		videoArray[activeVideo].resetColor();
		activeVideo++;
		videoArray[activeVideo].changeColor();
		videoCurrent.src = videoArray[activeVideo].urlSource;
		videoCurrent.load();
		playVideo();
	} else {
		videoArray[activeVideo].resetColor();
		activeVideo = 0;
		videoArray[activeVideo].changeColor();
		pauseVideo();
		videoCurrent.src = videoArray[activeVideo].urlSource;
		videoCurrent.currentTime = 0;
	}
	fileNameDiv.innerHTML = videoArray[activeVideo].fileName;
	changeIcons();
}


function changeIcons() {
	if (videoArray[activeVideo].filterArray.includes('blackAndWhite')) {
		BlackAndWhiteCheckImage.src = CHECKIMAGEPATH;
	} else {
		BlackAndWhiteCheckImage.src = PLUSIMAGEPATH;
	}
	if (videoArray[activeVideo].effectArray.includes('fadeIn')) {
		FadeInCheckImage.src = CHECKIMAGEPATH;
	} else {
		FadeInCheckImage.src = PLUSIMAGEPATH;
	}
	if (videoArray[activeVideo].effectArray.includes('fadeOut')) {
		FadeOutCheckImage.src = CHECKIMAGEPATH;
	} else {
		FadeOutCheckImage.src = PLUSIMAGEPATH;
	}
}

function playVideo() {
	videoCurrent.play();
	timer = setInterval(changeTimer, 100);
}

function pauseVideo() {
	videoCurrent.pause();
	clearInterval(timer);
}

function changeTotaltimer() {
	totalTimeIndicator.innerHTML = secondsToHms(total);
}

function changeTimer() {
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
}

function secondsToHms(d) {
	d = Number(d);
	let h = Math.floor(d / 3600);
	let m = Math.floor(d % 3600 / 60);
	let s = Math.floor(d % 3600 % 60);
	let final = h + ':' + m + ':' + s;

	return final;
}