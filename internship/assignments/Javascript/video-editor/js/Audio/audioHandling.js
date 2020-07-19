let audioCurrent = document.getElementById('audio-currnent');

audioCurrent.addEventListener('ended', changeAudio);

activeAudio = 0;

/**
 * Loads the given audio file.
 * @param {*} musicArray array of all the music objects
 * @returns {undefined}
 */
function loadAudio(musicArray) {
	audioCurrent.src = musicArray[activeAudio].urlSource;
	audioCurrent.setAttribute('preload', 'auto');
	audioCurrent.load();
	audioFileNameDiv.innerHTML = musicArray[activeAudio].fileName;

	return;
}

/**
 * Checks which audio needs to be played at the current instant.
 * @returns {undefined}
 */
function checkAudioPlayBack() {
	//determine the current audio to be played based
	let currentAudioIndex = determineAudioToBePlayed();

	if (currentAudioIndex !== null && currentAudioIndex === activeAudio) {
		if (audioCurrent.paused) {
			audioCurrent.play();
		}
		if (audioCurrent.currentTime < musicArray[activeAudio].startPosition || audioCurrent.currentTime > musicArray[activeAudio].endPosition) {
			audioCurrent.muted = true;
		} else if (!musicArray[activeAudio].muteAudio) {
			audioCurrent.muted = false;
		}
		if (musicArray[activeAudio].muteAudio) {
			audioCurrent.muted = true;
		}
	} else if (currentAudioIndex !== null && currentAudioIndex !== activeAudio) {
		if (activeAudio !== null) musicArray[activeAudio].resetColor();
		activeAudio = currentAudioIndex;
		musicArray[activeAudio].changeColor();
		audioFileNameDiv.innerHTML = musicArray[activeAudio].fileName;
		if (audioCurrent.paused) {
			audioCurrent.play();
		}
	} else {
		audioFileNameDiv.innerHTML = 'None';
	}

	return;
}

/**
 * Determines the index of current audio that needs to be played.
 * @returns {Number} Index of current audio that needs to be played or null.
 */
function determineAudioToBePlayed() {
	let currentPercentPlayed = currentGlobalTime / total * 100;
	for (let index = 0; index < audioRangeDuration.length; index++) {
		if (currentPercentPlayed >= audioRangeDuration[index][0] && currentPercentPlayed <= audioRangeDuration[index][1]) {
			return index;
		}
	}
	return null;
}

/**
 * Reset the audio div color
 * @returns {undefined}
 */
function changeAudio() {
	musicArray[activeAudio].resetColor();
	
	return;
}

/**
 * Move the current time to selected Audio position.
 * @param {Number} position Position of audio in musicArray
 * @returns {undefined}
 */
function moveCurrentTimeToAudioLocation(position) {
	slider.value = audioRangeDuration[position][0] + 0.05;
	changeTimerOnSlide();
	changeVideoTimeBySlider();
	changeAudioTimeBySlider()
	changeTextBySlider();

	return;
}