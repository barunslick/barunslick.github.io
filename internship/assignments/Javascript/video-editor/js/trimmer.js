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
		/* videoArray[activeVideo].div.style.background = color; */
	}
})

let fromStartDivContainer = trimDivUl.children[0].children[0];

fromStartDivContainer.addEventListener('click', function () {
	let prevBackground = videoArray[activeVideo].div.style.background;
	let color = activeVideo % 2 == 0 ? '#3a69c6' : '#1c3c77';
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
		/* videoArray[activeVideo].div.style.background = color; */
	}
	let cancelTrimBtn = trimDivStartDiv.children[0];
	let startTrimBtn = trimDivStartDiv.children[1];
	cancelTrimBtn.addEventListener('click', () => { 
		trimDivStartDiv.style.display = 'none';
		startTrimWarningDiv.innerHTML = '';
		videoArray[activeVideo].startSlider.value = 0;
		videoArray[activeVideo].hideStartSlider();
		videoArray[activeVideo].div.style.background = prevBackground || color;
	});
	startTrimBtn.addEventListener('click', () => { 
		if(startTrimButtonHandler(parseInt(videoArray[activeVideo].startSlider.value, color))){
			videoArray[activeVideo].startSlider.value = 0;
			/* videoArray[activeVideo].div.style.background = color; */
			startTrimWarningDiv.innerHTML = '';
		} 
	});

});


function startTrimButtonHandler(inputSliderValue, color) {
	if (inputSliderValue > 2 && inputSliderValue < 98) {
		let time = inputSliderValue / 100 * videoArray[activeVideo].length;
		trimFromStart(time, inputSliderValue);
		trimDivStartDiv.style.display = 'none';
		startTrimWarningDiv.innerHTML = '';
		videoArray[activeVideo].startSlider.value = 0;
		videoArray[activeVideo].hideStartSlider();
		/* videoArray[activeVideo].div.style.background = color */;
		return true;
	}else{
		startTrimWarningDiv.innerHTML = 'Result video too short';
		return false;
	}
}
let fromEndDivContainer = trimDivUl.children[1].children[0];

fromEndDivContainer.addEventListener('click', function () {
	let prevBackground = videoArray[activeVideo].div.style.background;
	let color = activeVideo % 2 == 0 ? '#3a69c6' : '#1c3c77';
	if (trimDivEndDiv.style.display == 'block') {
		trimDivEndDiv.style.display = 'none';
		videoArray[activeVideo].endSlider.value = 100;
		videoArray[activeVideo].hideEndSlider();
		/* videoArray[activeVideo].div.style.background = color; */
		
	} else {
		trimDivStartDiv.style.display = 'none';
		trimDivEndDiv.style.display = 'block';
		endTrimWarningDiv.innerHTML = '';
		videoArray[activeVideo].endSlider.value = 100;
		videoArray[activeVideo].hideStartSlider();
		videoArray[activeVideo].showEndSlider();
		/* videoArray[activeVideo].div.style.background = color; */
	}
	let cancelTrimBtn = trimDivEndDiv.children[0];
	let endTrimBtn = trimDivEndDiv.children[1];
	cancelTrimBtn.addEventListener('click', () => { 
		trimDivEndDiv.style.display = 'none';
		videoArray[activeVideo].endSlider.value = 100;
		videoArray[activeVideo].hideEndSlider();
		videoArray[activeVideo].div.style.background = prevBackground || color;
	});
	endTrimBtn.addEventListener('click', () => { 
		if(endTrimButtonHandler(parseInt(videoArray[activeVideo].endSlider.value,color))){
			videoArray[activeVideo].endSlider.value = 100;
			/* videoArray[activeVideo].div.style.background = color; */
			endTrimWarningDiv.innerHTML = '';
		} 
	}); 
});

function endTrimButtonHandler(inputSliderValue, color) {
	if (inputSliderValue > 2 && inputSliderValue < 98) {
		let time = inputSliderValue/ 100 * videoArray[activeVideo].length;
		trimFromEnd(time, inputSliderValue);
		trimDivEndDiv.style.display = 'none';
		videoArray[activeVideo].endSlider.value = 100;
		videoArray[activeVideo].hideEndSlider();
		/* videoArray[activeVideo].div.style.background = color; */
		return true;
	}else{
		endTrimWarningDiv.innerHTML = 'Result video too short';
		return false;
	}
}

function trimFromStart(changeTime, sliderValue) {
	videoArray[activeVideo].setStartPosition(changeTime);
	if (videoArray[activeVideo].endTrimmed){
		let endPosPercentage = videoArray[activeVideo].endPosition / videoArray[activeVideo].length * 100;
		console.log(sliderValue);
		console.log(videoArray[activeVideo].endPosition, endPosPercentage, 'end');
		videoArray[activeVideo].div.style.background = 'linear-gradient(90deg, #434655 ' + sliderValue + '%,' + '#3a69c6 '  + sliderValue + '% ' + endPosPercentage + '%,'+'#434655 '+ + endPosPercentage + '%)';
	}else{
		videoArray[activeVideo].div.style.background = 'linear-gradient(90deg, #434655 ' + sliderValue + '%,' + '#3a69c6' + ' 0%)';
	}
}

function trimFromEnd(changeTime, sliderValue) {
	videoArray[activeVideo].setEndPosition(changeTime);
	if (videoArray[activeVideo].endTrimmed){
		let startPosPercentage = videoArray[activeVideo].startPosition / videoArray[activeVideo].length * 100;
		videoArray[activeVideo].div.style.background = 'linear-gradient(90deg,'+ '#434655 '+ startPosPercentage + '%, '+ '#3a69c6 '+ startPosPercentage +'% '+(sliderValue) + '%' + ', #434655 '+ sliderValue + '%)' ;
	}else{
		videoArray[activeVideo].div.style.background = 'linear-gradient(90deg,' + '#3a69c6' + ' '+ sliderValue + '%' + ', #434655 0%)' ;
	}
}
