let trimDiv = document.querySelector('.main-container .trim');
let trimDivUl = document.querySelector('.main-container .box-content-dropdown ul');
let trimDivEndDiv = document.querySelector('.main-container .box-content-dropdown .end');
let trimDivStartDiv = document.querySelector('.main-container .box-content-dropdown .start');
let trimDivHeading = document.querySelector('.main-container .trim .trim-heading');

let endTrimWarningDiv = trimDivEndDiv.children[2];
let startTrimWarningDiv = trimDivStartDiv.children[2];

trimDivHeading.addEventListener('click', function () {
	if (!trimDivUl.style.display || trimDivUl.style.display == 'none') {
		trimDivUl.style.display = 'block';
	} else {
		let color = activeVideo % 2 == 0 ? '#3a69c6' : '#1c3c77';
		trimDivUl.style.display = 'none';
		endTrimWarningDiv.innerHTML = '';
		startTrimWarningDiv.innerHTML = '';
		trimDivEndDiv.style.display = 'none';
		trimDivStartDiv.style.display = 'none';
		videoArray[activeVideo].hideStartSlider();
		videoArray[activeVideo].hideEndSlider();
		videoArray[activeVideo].startSlider.value = 0;
		videoArray[activeVideo].endSlider.value = 100;
		videoArray[activeVideo].div.style.background = color;
	}
})

let fromStartDivContainer = trimDivUl.children[0].children[0];

fromStartDivContainer.addEventListener('click', function () {
	let color = activeVideo % 2 == 0 ? '#3a69c6' : '#1c3c77';
	if (trimDivStartDiv.style.display == 'block') {
		trimDivStartDiv.style.display = 'none';
		startTrimWarningDiv.innerHTML = '';
		videoArray[activeVideo].startSlider.value = 0;
		videoArray[activeVideo].hideStartSlider();
		videoArray[activeVideo].div.style.background = color;
	} else {
		trimDivEndDiv.style.display = 'none';
		trimDivStartDiv.style.display = 'block';
		videoArray[activeVideo].startSlider.value = 0;
		videoArray[activeVideo].hideEndSlider();
		videoArray[activeVideo].showStartSlider();
		videoArray[activeVideo].div.style.background = color;
	}
	/* let startTrimBtn = trimDivStartDiv.children[1];
	let inputSlider = trimDivStartDiv.children[0];
	inputSlider.oninput = function () {
		videoArray[activeVideo].div.style.background = 'linear-gradient(90deg, white ' + inputSlider.value + '%,' + color + ' 0%)';
	}
	*/
	let cancelTrimBtn = trimDivStartDiv.children[0];
	let startTrimBtn = trimDivStartDiv.children[1];
	cancelTrimBtn.addEventListener('click', () => { 
		trimDivStartDiv.style.display = 'none';
		startTrimWarningDiv.innerHTML = '';
		videoArray[activeVideo].startSlider.value = 0;
		videoArray[activeVideo].hideStartSlider();
		videoArray[activeVideo].div.style.background = color;
	});
	startTrimBtn.addEventListener('click', () => { 
		if(startTrimButtonHandler(parseInt(videoArray[activeVideo].startSlider.value, color))){
			videoArray[activeVideo].startSlider.value = 0;
			videoArray[activeVideo].div.style.background = color;
			startTrimWarningDiv.innerHTML = '';
		} 
	});

});


function startTrimButtonHandler(inputSliderValue, color) {
	console.log(inputSliderValue)
	if (inputSliderValue > 2 && inputSliderValue < 98) {
		let time = inputSliderValue / 100 * videoArray[activeVideo].length;
		trimFromStart(time);
		trimDivStartDiv.style.display = 'none';
		startTrimWarningDiv.innerHTML = '';
		videoArray[activeVideo].startSlider.value = 0;
		videoArray[activeVideo].hideStartSlider();
		videoArray[activeVideo].div.style.background = color;
		return true;
	}else{
		startTrimWarningDiv.innerHTML = 'Result video too short';
		return false;
	}
}

/* function startTrimButtonHandler() {
	let trimHour = trimDivStartDiv.children[0].value;
	let trimMinutes = trimDivStartDiv.children[1].value;
	let trimSeconds = trimDivStartDiv.children[2].value;
	let output = validateTrimTime(trimHour, trimMinutes, trimSeconds);
	if (output === 'Done') {
		let time = Number(trimHour * 60 * 60) + Number(trimMinutes * 60) + Number(trimSeconds);
		trimFromStart(time);
	}
	startTrimWarningDiv.innerHTML = output;
}
 */
let fromEndDivContainer = trimDivUl.children[1].children[0];

fromEndDivContainer.addEventListener('click', function () {
	let color = activeVideo % 2 == 0 ? '#3a69c6' : '#1c3c77';
	if (trimDivEndDiv.style.display == 'block') {
		trimDivEndDiv.style.display = 'none';
		videoArray[activeVideo].endSlider.value = 100;
		videoArray[activeVideo].hideEndSlider();
		videoArray[activeVideo].div.style.background = color;
		
	} else {
		trimDivStartDiv.style.display = 'none';
		trimDivEndDiv.style.display = 'block';
		endTrimWarningDiv.innerHTML = '';
		videoArray[activeVideo].endSlider.value = 100;
		videoArray[activeVideo].hideStartSlider();
		videoArray[activeVideo].showEndSlider();
		videoArray[activeVideo].div.style.background = color;
	}
	/* let endTrimBtn = trimDivEndDiv.children[1];
	let inputSlider = trimDivEndDiv.children[0];
	inputSlider.oninput = function () {
		videoArray[activeVideo].div.style.background = 'linear-gradient(90deg,' + color + ' '+(inputSlider.value) + '%' + ', white 0%)' ;
	}
	*/
	let cancelTrimBtn = trimDivEndDiv.children[0];
	let endTrimBtn = trimDivEndDiv.children[1];
	cancelTrimBtn.addEventListener('click', () => { 
		trimDivEndDiv.style.display = 'none';
		videoArray[activeVideo].endSlider.value = 100;
		videoArray[activeVideo].hideEndSlider();
		videoArray[activeVideo].div.style.background = color;
	});
	endTrimBtn.addEventListener('click', () => { 
		if(endTrimButtonHandler(parseInt(videoArray[activeVideo].endSlider.value,color))){
			videoArray[activeVideo].endSlider.value = 100;
			videoArray[activeVideo].div.style.background = color;
			endTrimWarningDiv.innerHTML = '';
		} 
	}); 
});

function endTrimButtonHandler(inputSliderValue, color) {
	if (inputSliderValue > 2 && inputSliderValue < 98) {
		let time = ( 100 - inputSliderValue)/ 100 * videoArray[activeVideo].length;
		trimFromEnd(time);
		trimDivEndDiv.style.display = 'none';
		videoArray[activeVideo].endSlider.value = 100;
		videoArray[activeVideo].hideEndSlider();
		videoArray[activeVideo].div.style.background = color;
		return true;
	}else{
		endTrimWarningDiv.innerHTML = 'Result video too short';
		return false;
	}
}

/* function endTrimButtonHandler() {
	let trimHour = trimDivEndDiv.children[0].value;
	let trimMinutes = trimDivEndDiv.children[1].value;
	let trimSeconds = trimDivEndDiv.children[2].value;
	let output = validateTrimTime(trimHour, trimMinutes, trimSeconds);
	if (output === 'Done') {
		let time = Number(trimHour * 60 * 60) + Number(trimMinutes * 60) + Number(trimSeconds);
		trimFromEnd(time);
	}
	endTrimwarningDiv .innerHTML = output;
}
 */
/* function validateTrimTime(hour, minute, seconds) {
	if (hour === "" && minute === "" && seconds === "") {
		return 'All fields Empty';
	}
	if (isNaN(hour) || isNaN(minute) || isNaN(seconds)) {
		return 'Number error';
	}
	if (hour > 60 * 60 || minute > 60 || seconds > 60 || hour < 0 || minute < 0 || seconds < 0) {
		return 'Invalid input';
	}
	let time = Number(hour * 60 * 60) + Number(minute * 60) + Number(seconds);
	if (time > videoArray[activeVideo].length - 2) { //video should be atleast 2 sec long after trimming
		return 'Trim length too long';
	}

	return 'Done';
} */

function trimFromStart(changeTime) {
	videoArray[activeVideo].setStartPosition(changeTime);
	videoArray[activeVideo].changeLengthBy(changeTime);
	total = getTotal(videoArray);
	changeTotaltimer();
	videoLengthRatio = seekRatio(videoArray, total);
	setRatio(videoLengthRatio);
	rangeDuration = findRanges(videoArray);
	videoCurrent.currentTime = videoArray[activeVideo].startPosition;
	changeTimer();
	for (let index = 0; index < videoArray.length; index++) {
		videoArray[index].div.style.width = videoArray[index].ratio - 0.3 + '%';
	}
}

function trimFromEnd(changeTime) {
	videoArray[activeVideo].setEndPosition(changeTime);
	videoArray[activeVideo].changeLengthBy(changeTime);
	total = getTotal(videoArray);
	changeTotaltimer();
	videoLengthRatio = seekRatio(videoArray, total);
	setRatio(videoLengthRatio);
	rangeDuration = findRanges(videoArray);
	videoCurrent.currentTime = videoArray[activeVideo].startPosition;
	changeTimer();
	for (let index = 0; index < videoArray.length; index++) {
		videoArray[index].div.style.width = videoArray[index].ratio - 0.3 + '%';
	}
}