let videoCurrent = document.getElementById('video-current');
let playButton = document.querySelector('.controls .playpause .play');
let pauseButton = document.querySelector('.controls .playpause .pause');
let totalTimeIndicator = document.querySelector('.timeline .time .total-time');
let currentTimeIndicator = document.querySelector('.timeline .time .current-time');

playButton.addEventListener('click', playVideo);
pauseButton.addEventListener('click', pauseVideo);
videoCurrent.addEventListener('ended', changeVideo);
videoCurrent.addEventListener('timeupdate', checkStartPosition)

let timer;
let activeVideo = 0;


function loadVideo(videoArray, videoList) {
	videoCurrent.src = videoArray[activeVideo].urlSource;
	videoCurrent.setAttribute('preload', 'auto');
	videoCurrent.load();
	changeTotaltimer();
}

function checkStartPosition() {
	if (videoArray[activeVideo].trimmed && videoCurrent.currentTime <= videoArray[activeVideo].startPosition) {
		videoCurrent.currentTime = videoArray[activeVideo].startPosition + 0.01; // start from 0.01 more of start position so that it doesnt get stuck
	}
	if (videoArray[activeVideo].trimmed && videoCurrent.currentTime > (videoArray[activeVideo].endPosition)) {
		changeVideo();
	}
}


function changeVideo() {
	clearInterval(timer);
	if (activeVideo < videoArray.length - 1) {
		activeVideo++;
		videoCurrent.src = videoArray[activeVideo].urlSource;
		videoCurrent.load();
		checkStartPosition();
		playVideo();
	} else {
		activeVideo = 0;
		pauseVideo();
		videoCurrent.src = videoArray[activeVideo].urlSource;
		videoCurrent.currentTime = 0;
	}
	changeIcons();
}


function changeIcons() {
	if (videoArray[activeVideo].filterArray.includes('blackAndWhite')) {
		BlackAndWhiteCheckImage.src = "assets/images/check.png";
	} else {
		BlackAndWhiteCheckImage.src = "assets/images/plus.png";
	}
	if (videoArray[activeVideo].effectArray.includes('fadeIn')) {
		FadeInCheckImage.src = "assets/images/check.png";
	} else {
		FadeInCheckImage.src = "assets/images/plus.png";
	}
	if (videoArray[activeVideo].effectArray.includes('fadeOut')) {
		FadeOutCheckImage.src = "assets/images/check.png";
	} else {
		FadeOutCheckImage.src = "assets/images/plus.png";
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
		sliderChange = videoCurrent.currentTime + time - videoArray[activeVideo].startPosition;
		currentTimeIndicator.innerHTML = secondsToHms(videoCurrent.currentTime + time - videoArray[activeVideo].startPosition);
		changeSlider(sliderChange / total * 100)
	} else {
		sliderChange = videoCurrent.currentTime - videoArray[activeVideo].startPosition;
		currentTimeIndicator.innerHTML = secondsToHms(videoCurrent.currentTime - videoArray[activeVideo].startPosition);
		changeSlider(sliderChange / total * 100)
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