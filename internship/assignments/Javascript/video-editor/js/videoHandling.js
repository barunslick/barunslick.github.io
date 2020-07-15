let videoCurrent = document.getElementById('video-current');

videoCurrent.addEventListener('ended', changeVideo);

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
	if (videoArray[activeVideo].muteAudio == true){
		muteVideoAudioCheckImage.src = CHECKIMAGEPATH;
	}else{
		muteVideoAudioCheckImage.src = PLUSIMAGEPATH;
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