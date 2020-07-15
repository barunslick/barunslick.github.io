let audioCurrent = document.getElementById('audio-currnent');

audioCurrent.addEventListener('ended', changeAudio);

activeAudio = 0;

function loadAudio(musicArray, musicList) {
	audioCurrent.src = musicArray[activeAudio].urlSource;
	audioCurrent.setAttribute('preload', 'auto');
	audioCurrent.load();
}

function checkAudioPlayBack() {
	let currentAudioIndex = determineAudioToBePlayed();
	if (currentAudioIndex !== null) {
		activeAudio = currentAudioIndex;
		musicArray[activeAudio].changeColor();
		if (audioCurrent.paused) {
			audioCurrent.play();
		}
	}
}

function determineAudioToBePlayed() {
	let currentPercentPlayed = currentGlobalTime / total * 100;
	for (let index = 0; index < audioRangeDuration.length; index++) {
		if (currentPercentPlayed >= audioRangeDuration[index][0] && currentPercentPlayed < audioRangeDuration[index][1]) {
			return index;
		}
	}
	return null;
}

function changeAudio() {
	musicArray[activeAudio].resetColor();
}