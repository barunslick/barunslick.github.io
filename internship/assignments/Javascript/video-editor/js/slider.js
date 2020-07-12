let slider = document.querySelector('.timeline .slider input');
slider.value = 0;


slider.oninput = function () {
	pauseVideo();
	if (slider.value == 100) {
		activeVideo = 0;
		videoCurrent.src = videoArray[activeVideo].urlSource;
		videoCurrent.currentTime = 0;
		changeIcons();
	} else {
		let [newVideoIndex, relativeSliderValue] = determineIndex(slider.value);
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
}

function changeSlider(change) {
	slider.value = change;
}

function determineIndex(sliderValue) {
	for (let index = 0; index < rangeDuration.length; index++) {
		if (sliderValue >= rangeDuration[index][0] && sliderValue < rangeDuration[index][1]) {
			return [index, p5map(sliderValue, rangeDuration[index][0], rangeDuration[index][1], 0, 100)];
		}
	}
}

//this is a handy function taken from p5js which maps certain value to new range.
function p5map(n, start1, stop1, start2, stop2) {
	return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};