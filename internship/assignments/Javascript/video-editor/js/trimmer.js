let trimDiv = document.querySelector('.main-container .trim');
let trimImage = document.querySelector('.main-container .trim .trim-heading img');
let trimDivUl = document.querySelector('.main-container .effects-filters .box-content-dropdown ul');
let trimDivHeading = document.querySelector('.main-container .effects-filters .trim .trim-heading');
let trimDivEndDiv = document.querySelector('.main-container .effects-filters .box-content-dropdown .end');
let trimDivStartDiv = document.querySelector('.main-container .effects-filters .box-content-dropdown .start');

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
/* 	endTrimWarningDiv.innerHTML = '';
	startTrimWarningDiv.innerHTML = ''; */
	trimDivEndDiv.style.display = 'none';
	trimDivStartDiv.style.display = 'none';
	videoArray[activeVideo].hideStartSlider();
	videoArray[activeVideo].hideEndSlider();
	/* videoArray[activeVideo].startSlider.value = videoArray[activeVideo].startPosition / videoArray[activeVideo].length * 100; */
	videoArray[activeVideo].endSlider.value = 100;
	/* videoArray[activeVideo].resetBackground(); */
}

let fromStartDivContainer = trimDivUl.children[0].children[0];

fromStartDivContainer.addEventListener('click', function () {
	if (trimDivStartDiv.style.display == 'block') {
		trimDivStartDiv.style.display = 'none';
		/* startTrimWarningDiv.innerHTML = ''; */
		/* videoArray[activeVideo].startSlider.value = videoArray[activeVideo].startPosition / videoArray[activeVideo].length * 100; */
		videoArray[activeVideo].hideStartSlider();

	} else {
		trimDivEndDiv.style.display = 'none';
		trimDivStartDiv.style.display = 'block';
		/* videoArray[activeVideo].startSlider.value =  videoArray[activeVideo].startPosition / videoArray[activeVideo].length * 100; */
		videoArray[activeVideo].hideEndSlider();
		videoArray[activeVideo].showStartSlider();
	}
	videoArray[activeVideo].resetBackground();
});

let fromEndDivContainer = trimDivUl.children[1].children[0];

fromEndDivContainer.addEventListener('click', function () {
	if (trimDivEndDiv.style.display == 'block') {
		trimDivEndDiv.style.display = 'none';
		/* videoArray[activeVideo].endSlider.value = 100; */
		videoArray[activeVideo].hideEndSlider();

	} else {
		trimDivStartDiv.style.display = 'none';
		trimDivEndDiv.style.display = 'block';
		/* endTrimWarningDiv.innerHTML = ''; */
		/* videoArray[activeVideo].endSlider.value = 100 */;
		videoArray[activeVideo].hideStartSlider();
		videoArray[activeVideo].showEndSlider();
	}
	videoArray[activeVideo].resetBackground();
});

