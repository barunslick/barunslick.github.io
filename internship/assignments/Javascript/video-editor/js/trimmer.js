let trimDiv = document.querySelector('.main-container .tools-resources .trim');
let trimDivUl = document.querySelector('.main-container .box-content-dropdown ul');
let trimDivEndDiv = document.querySelector('.main-container .box-content-dropdown .end');
let trimDivStartDiv = document.querySelector('.main-container .box-content-dropdown .start');
let trimDivHeading = document.querySelector('.main-container .tools-resources .trim .trim-heading');


trimDivHeading.addEventListener('click', function () {
	if (!trimDivUl.style.display || trimDivUl.style.display == 'none') {
		trimDivUl.style.display = 'block';
	} else {
		trimDivUl.style.display = 'none';
		trimDivEndDiv.style.display = 'none';
		trimDivStartDiv.style.display= 'none';
	}
})

let fromStartDivContainer = trimDivUl.children[0].children[0];

fromStartDivContainer.addEventListener('click', function () {
	if (trimDivStartDiv.style.display == 'block') {
		trimDivStartDiv.style.display = 'none';
	} else {
		trimDivStartDiv.style.display = 'block';
	}
	let startTrimBtn = trimDivStartDiv.children[3];
	startTrimBtn.addEventListener('click', startTrimButtonHandler);

});

function startTrimButtonHandler() {
	let warningDiv = trimDivStartDiv.children[4];
	let trimHour = trimDivStartDiv.children[0].value;
	let trimMinutes = trimDivStartDiv.children[1].value;
	let trimSeconds = trimDivStartDiv.children[2].value;
	let output = validateTrimTime(trimHour, trimMinutes, trimSeconds);
	if (output === 'Done') {
		let time = Number(trimHour * 60 * 60) + Number(trimMinutes * 60) + Number(trimSeconds);
		trimFromStart(time);
	}
	warningDiv.innerHTML = output;
}

let fromEndDivContainer = trimDivUl.children[1].children[0];

fromEndDivContainer.addEventListener('click', function () {
	if (trimDivEndDiv.style.display == 'block') {
		trimDivEndDiv.style.display = 'none';
	} else {
		trimDivEndDiv.style.display = 'block';
	}
	let endTrimBtn = trimDivEndDiv.children[3];
	endTrimBtn.addEventListener('click', endTrimButtonHandler)
});

function endTrimButtonHandler() {
	let warningDiv = trimDivEndDiv.children[4];
	let trimHour = trimDivEndDiv.children[0].value;
	let trimMinutes = trimDivEndDiv.children[1].value;
	let trimSeconds = trimDivEndDiv.children[2].value;
	let output = validateTrimTime(trimHour, trimMinutes, trimSeconds);
	if (output === 'Done') {
		let time = Number(trimHour * 60 * 60) + Number(trimMinutes * 60) + Number(trimSeconds);
		trimFromEnd(time);
	}
	warningDiv.innerHTML = output;
}

function validateTrimTime(hour, minute, seconds) {
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
}

function trimFromStart(changeTime) {
	videoArray[activeVideo].setStartPosition(changeTime);
	videoArray[activeVideo].changeLengthBy(changeTime);
	total = getTotal(videoArray);
	changeTotaltimer();
	videoLengthRatio = seekRatio(videoArray, total);
	setRatio(videoLengthRatio);
	rangeDuration = findRanges(videoArray);
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
	for (let index = 0; index < videoArray.length; index++) {
		videoArray[index].div.style.width = videoArray[index].ratio - 0.3 + '%';
	}
}