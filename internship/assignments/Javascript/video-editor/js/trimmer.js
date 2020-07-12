let trimDiv = document.querySelector('.main-container .trim');
let trimImage = document.querySelector('.main-container .trim .trim-heading img');
let trimDivUl = document.querySelector('.main-container .box-content-dropdown ul');
let trimDivHeading = document.querySelector('.main-container .trim .trim-heading');
let trimDivEndDiv = document.querySelector('.main-container .box-content-dropdown .end');
let trimDivStartDiv = document.querySelector('.main-container .box-content-dropdown .start');

let endTrimWarningDiv = trimDivEndDiv.children[2];
let startTrimWarningDiv = trimDivStartDiv.children[2];

trimDivHeading.addEventListener('click', function () {
	if (!trimDivUl.style.display || trimDivUl.style.display == 'none') {
		trimDivUl.style.display = 'block';
		trimImage.src = CROSSIMAGEPATH;
	} else {
		resetDivShowing();
	}
})

function resetDivShowing(){
	trimImage.src = DOWNIMAGEPATH;
	trimDivUl.style.display = 'none';
	endTrimWarningDiv.innerHTML = '';
	startTrimWarningDiv.innerHTML = '';
	trimDivEndDiv.style.display = 'none';
	trimDivStartDiv.style.display = 'none';
	videoArray[activeVideo].hideStartSlider();
	videoArray[activeVideo].hideEndSlider();
	videoArray[activeVideo].startSlider.value = 0;
	videoArray[activeVideo].endSlider.value = 100;
	videoArray[activeVideo].resetBackground();
}

let fromStartDivContainer = trimDivUl.children[0].children[0];

fromStartDivContainer.addEventListener('click', function () {
	if (trimDivStartDiv.style.display == 'block') {
		trimDivStartDiv.style.display = 'none';
		startTrimWarningDiv.innerHTML = '';
		videoArray[activeVideo].startSlider.value = 0;
		videoArray[activeVideo].hideStartSlider();

	} else {
		trimDivEndDiv.style.display = 'none';
		trimDivStartDiv.style.display = 'block';
		videoArray[activeVideo].startSlider.value = 0;
		videoArray[activeVideo].hideEndSlider();
		videoArray[activeVideo].showStartSlider();
	}
	
	videoArray[activeVideo].resetBackground();
});

let cancelStartTrimBtn = trimDivStartDiv.children[0];
	cancelStartTrimBtn.addEventListener('click', () => {
		trimDivStartDiv.style.display = 'none';
		startTrimWarningDiv.innerHTML = '';
		videoArray[activeVideo].startSlider.value = 0;
		videoArray[activeVideo].hideStartSlider();
		videoArray[activeVideo].resetBackground();
});

let startTrimBtn = trimDivStartDiv.children[1];
startTrimBtn.addEventListener('click', () => {
	if (startTrimButtonHandler(parseInt(videoArray[activeVideo].startSlider.value))) {
		videoArray[activeVideo].startSlider.value = 0;
		startTrimWarningDiv.innerHTML = '';
	}
});

function startTrimButtonHandler(inputSliderValue, color) {
	if (inputSliderValue <= (videoArray[activeVideo].endPosition / videoArray[activeVideo].length * 100 - 2)) {
		let time = inputSliderValue / 100 * videoArray[activeVideo].length;
		trimFromStart(time, inputSliderValue);
		trimDivStartDiv.style.display = 'none';
		startTrimWarningDiv.innerHTML = '';
		videoArray[activeVideo].startSlider.value = 0;
		videoArray[activeVideo].hideStartSlider();

		return true;
	} else {
		startTrimWarningDiv.innerHTML = 'Result video too short';
		return false;
	}
}
let fromEndDivContainer = trimDivUl.children[1].children[0];

fromEndDivContainer.addEventListener('click', function () {
	if (trimDivEndDiv.style.display == 'block') {
		trimDivEndDiv.style.display = 'none';
		videoArray[activeVideo].endSlider.value = 100;
		videoArray[activeVideo].hideEndSlider();

	} else {
		trimDivStartDiv.style.display = 'none';
		trimDivEndDiv.style.display = 'block';
		endTrimWarningDiv.innerHTML = '';
		videoArray[activeVideo].endSlider.value = 100;
		videoArray[activeVideo].hideStartSlider();
		videoArray[activeVideo].showEndSlider();
	}
	videoArray[activeVideo].resetBackground();
});

let cancelEndTrimBtn = trimDivEndDiv.children[0];
	cancelEndTrimBtn.addEventListener('click', () => {
		trimDivEndDiv.style.display = 'none';
		videoArray[activeVideo].endSlider.value = 100;
		videoArray[activeVideo].hideEndSlider();
		videoArray[activeVideo].resetBackground();
});

let endTrimBtn = trimDivEndDiv.children[1];
endTrimBtn.addEventListener('click', () => {
	if (endTrimButtonHandler(parseInt(videoArray[activeVideo].endSlider.value))) {
		videoArray[activeVideo].endSlider.value = 100;
		endTrimWarningDiv.innerHTML = '';
	}
});

function endTrimButtonHandler(inputSliderValue, color) {
	if (inputSliderValue >= (videoArray[activeVideo].startPosition / videoArray[activeVideo].length * 100 + 2)) {
		let time = inputSliderValue / 100 * videoArray[activeVideo].length;
		trimFromEnd(time, inputSliderValue);
		trimDivEndDiv.style.display = 'none';
		videoArray[activeVideo].endSlider.value = 100;
		videoArray[activeVideo].hideEndSlider();

		return true;
	} else {
		endTrimWarningDiv.innerHTML = 'Result video too short';
		return false;
	}
}

function trimFromStart(changeTime, sliderValue) {
	videoArray[activeVideo].setStartPosition(changeTime);
	if (videoArray[activeVideo].endTrimmed) {
		let endPosPercentage = videoArray[activeVideo].endPosition / videoArray[activeVideo].length * 100;
		videoArray[activeVideo].div.style.background = 'linear-gradient(90deg, #434655 ' + sliderValue + '%,' +  videoArray[activeVideo].color + ' ' + sliderValue + '% ' + endPosPercentage + '%,' + '#434655 ' + + endPosPercentage + '%)';
	} else {
		videoArray[activeVideo].div.style.background = 'linear-gradient(90deg, #434655 ' + sliderValue + '%,' + '#3a69c6' + ' 0%)';
	}
}

function trimFromEnd(changeTime, sliderValue) {
	videoArray[activeVideo].setEndPosition(changeTime);
	if (videoArray[activeVideo].endTrimmed) {
		let startPosPercentage = videoArray[activeVideo].startPosition / videoArray[activeVideo].length * 100;
		videoArray[activeVideo].div.style.background = 'linear-gradient(90deg,' + '#434655 ' + startPosPercentage + '%, ' +  videoArray[activeVideo].color + ' ' + startPosPercentage + '% ' + (sliderValue) + '%' + ', #434655 ' + sliderValue + '%)';
	} else {
		videoArray[activeVideo].div.style.background = 'linear-gradient(90deg,' +  videoArray[activeVideo].color + ' ' + ' ' + sliderValue + '%' + ', #434655 0%)';
	}
}
