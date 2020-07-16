let slider = document.querySelector('.timeline .slider input');
slider.value = 0;

slider.oninput = function () {
	pauseVideo();
	changeTimerOnSlide();
	if (slider.value == 100) {
		videoArray[activeVideo].resetColor();
		activeVideo = 0;
		videoArray[activeVideo].changeColor();
		videoCurrent.src = videoArray[activeVideo].urlSource;
		videoCurrent.currentTime = 0;
		currentGlobalTime = 0;
		changeIcons();
	} else {
		changeVideoTimeBySlider();
		changeAudioTimeBySlider()
		changeTextBySlider();
	}
}

function changeVideoTimeBySlider() {
	let [newVideoIndex, relativeSliderValue] = determineVideoIndex(slider.value);
	if (newVideoIndex != activeVideo) {
		fileNameDiv.innerHTML = videoArray[newVideoIndex].fileName;
		videoArray[activeVideo].resetColor();
		resetDivShowing();
		activeVideo = newVideoIndex;
		videoArray[activeVideo].changeColor();
		videoCurrent.src = videoArray[activeVideo].urlSource;
		changeIcons();
	}
	videoCurrent.currentTime = relativeSliderValue * videoArray[activeVideo].length / 100;
}


function changeAudioTimeBySlider() {
	let [newAudioIndex, relativeSliderValueAudio] = determineAudioIndex(slider.value);
	currentGlobalTime = slider.value / 100 * total;
	if (newAudioIndex !== null && newAudioIndex != activeAudio) {
		if (activeAudio !== null) { musicArray[activeAudio].resetColor(); }
		activeAudio = newAudioIndex;
		musicArray[activeAudio].changeColor();
		audioCurrent.src = musicArray[activeAudio].urlSource;
	} else if (newAudioIndex == null) {
		if (activeAudio !== null) { musicArray[activeAudio].resetColor() }
		activeAudio = null;
	}
	if (newAudioIndex !== null) {
		audioCurrent.currentTime = relativeSliderValueAudio * musicArray[activeAudio].length / 100;
	}
}

function changeTextBySlider() {
	let newTextIndex = determineTextIndex(slider.value);
	if (newTextIndex !== null && newTextIndex != activeText) {
		if (activeText !== null) {
			textArray[activeText].hideTextArea();
			textArray[activeText].resetColor();
		}
		activeText = newTextIndex;
		textArray[activeText].changeColor();
		textArray[activeText].showTextArea();
	} else if (newTextIndex == null) {
		if (activeText !== null) {
			textArray[activeText].hideTextArea();
			textArray[activeText].resetColor();
		}
		activeText = null;
	}
}




/**
 * Changes the value of slider based on given value
 * @param {Number} change Value of slider as changed by user
 */
function changeSlider(change) {
	slider.value = change;
}

/**
 * Determines the index of video on which the slider currently exists and also calcuates the relative position of slider
 * based on the video.
 * @param {Number} sliderValue Value of slider as changed by user
 * @returns {Array} Array of video index and relative location of slider based on the video
 */
function determineVideoIndex(sliderValue) {
	for (let index = 0; index < rangeDuration.length; index++) {
		if (sliderValue >= rangeDuration[index][0] && sliderValue < rangeDuration[index][1]) {

			//p5map maps value of slider to from 0 to 100% to video's length
			return [index, p5map(sliderValue, rangeDuration[index][0], rangeDuration[index][1], 0, 100)];
		}
	}

}

function determineAudioIndex(sliderValue) {
	for (let index = 0; index < audioRangeDuration.length; index++) {
		if (sliderValue >= audioRangeDuration[index][0] && sliderValue <= audioRangeDuration[index][1]) {

			//p5map maps value of slider to from 0 to 100% to video's length
			return [index, p5map(sliderValue, audioRangeDuration[index][0], audioRangeDuration[index][1], 0, 100)];
		}
	}
	return [null, null];
}

function determineTextIndex(sliderValue) {
	for (let index = 0; index < textRangeDuration.length; index++) {
		if (sliderValue >= textRangeDuration[index][0] && sliderValue <= textRangeDuration[index][1]) {
			//p5map maps value of slider to from 0 to 100% to video's length
			return index;
		}
	}
	return null;
}




/**
 * Converts the slider value based on length of video its currently on.
 * @param {Number} sliderValue Value of slider from 0 to 100
 * @param {Number} start1 Left Range of slider ie. 0
 * @param {Number} stop1 Right Range of slider ie. 100
 * @param {Number} start2 New Start Range
 * @param {Number} stop2 New End Range
 * @returns {Number} New value based on given new ranges
 */
function p5map(sliderValue, start1, stop1, start2, stop2) {
	return ((sliderValue - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};

/**
 * Changes the current time value when slider moves
 * @returns {undefined}
 */
function changeTimerOnSlide() {
	if (activeVideo != 0) {
		// Get the length of videos before it, if its not the first video.
		let time = videoArray.slice(0, activeVideo).reduce(function (acc, value) {
			return acc += value.length;
		}, 0);
		currentTimeIndicator.innerHTML = secondsToHms(videoCurrent.currentTime + time);
	} else {
		currentTimeIndicator.innerHTML = secondsToHms(videoCurrent.currentTime);
	}
	return;
}