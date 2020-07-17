let trimDivAudio = document.querySelector('.main-container .tools-resources .trim-audio');
let trimImageAudio = document.querySelector('.main-container .tools-resources .trim-audio .trim-audio-heading img');
let trimDivUlAudio = document.querySelector('.main-container .tools-resources .box-content-dropdown ul');
let trimDivHeadingAudio = document.querySelector('.main-container .tools-resources .trim-audio .trim-audio-heading');
let trimDivEndDivAudio = document.querySelector('.main-container .tools-resources .box-content-dropdown .end');
let trimDivStartDivAudio = document.querySelector('.main-container .tools-resources .box-content-dropdown .start');

trimDivHeadingAudio.addEventListener('click', function () {
	if (!trimDivUlAudio.style.display || trimDivUlAudio.style.display == 'none') {
		trimDivUlAudio.style.display = 'block';
		trimImageAudio.src = CROSSIMAGEPATH;
	} else {
		resetDivShowingAudio();
	}
})

function resetDivShowingAudio(){
	trimImageAudio.src = DOWNIMAGEPATH;
	trimDivUlAudio.style.display = 'none';
/* 	endTrimWarningDiv.innerHTML = '';
	startTrimWarningDiv.innerHTML = ''; */
	trimDivEndDivAudio.style.display = 'none';
	trimDivStartDivAudio.style.display = 'none';
	musicArray[activeAudio].hideStartSlider();
	musicArray[activeAudio].hideEndSlider();
	/* videoArray[activeVideo].startSlider.value = videoArray[activeVideo].startPosition / videoArray[activeVideo].length * 100; */
	musicArray[activeAudio].endSlider.value = 100;
	/* videoArray[activeVideo].resetBackground(); */
}

let fromStartDivContainerAudio = trimDivUlAudio.children[0].children[0];

fromStartDivContainerAudio.addEventListener('click', function () {
    if (trimDivStartDivAudio.style.display == 'block') {
		trimDivStartDivAudio.style.display = 'none';
		/* startTrimWarningDiv.innerHTML = ''; */
		/* videoArray[activeVideo].startSlider.value = videoArray[activeVideo].startPosition / videoArray[activeVideo].length * 100; */
        musicArray[activeAudio].hideStartSlider();

	} else {
		trimDivEndDivAudio.style.display = 'none';
		trimDivStartDivAudio.style.display = 'block';
		/* videoArray[activeVideo].startSlider.value =  videoArray[activeVideo].startPosition / videoArray[activeVideo].length * 100; */
		musicArray[activeAudio].hideEndSlider();
		musicArray[activeAudio].showStartSlider();
	}
});

let fromEndDivContainerAudio = trimDivUlAudio.children[1].children[0];

fromEndDivContainerAudio.addEventListener('click', function () {
	if (trimDivEndDivAudio.style.display == 'block') {
		trimDivEndDivAudio.style.display = 'none';
		/* videoArray[activeVideo].endSlider.value = 100; */
		musicArray[activeAudio].hideEndSlider();

	} else {
		trimDivStartDivAudio.style.display = 'none';
		trimDivEndDivAudio.style.display = 'block';
		/* endTrimWarningDiv.innerHTML = ''; */
		/* videoArray[activeVideo].endSlider.value = 100 */;
		musicArray[activeAudio].hideStartSlider();
		musicArray[activeAudio].showEndSlider();
	}
}); 

