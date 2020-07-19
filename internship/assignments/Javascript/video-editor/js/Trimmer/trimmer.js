let trimDiv = document.querySelector('.main-container .trim');
let trimImage = document.querySelector('.main-container .trim .trim-heading img');
let trimDivUl = document.querySelector('.main-container .effects-filters .box-content-dropdown ul');
let trimDivHeading = document.querySelector('.main-container .effects-filters .trim .trim-heading');
let trimDivEndDiv = document.querySelector('.main-container .effects-filters .box-content-dropdown .end');
let trimDivStartDiv = document.querySelector('.main-container .effects-filters .box-content-dropdown .start');

// Show trim options when trim heading is clicked for video
trimDivHeading.addEventListener('click', function () {
  if (!trimDivUl.style.display || trimDivUl.style.display === 'none') {
    trimDivUl.style.display = 'block';
    trimImage.src = CROSSIMAGEPATH;
  } else {
    resetDivShowing();
  }
})

/**
 * Reset the background the video div in animation pane when trim div is closed.
 * @returns {undefined}
 */
function resetDivShowing() {
  trimImage.src = DOWNIMAGEPATH;
  trimDivUl.style.display = 'none';
  trimDivEndDiv.style.display = 'none';
  trimDivStartDiv.style.display = 'none';
  videoArray[activeVideo].hideStartSlider();
  videoArray[activeVideo].hideEndSlider();
  videoArray[activeVideo].endSlider.value = 100;

  return;
}

let fromStartDivContainer = trimDivUl.children[0].children[0];

// Show/Hide start trim slider when start trim div is clicked for video
fromStartDivContainer.addEventListener('click', function () {
  if (trimDivStartDiv.style.display === 'block') {
    trimDivStartDiv.style.display = 'none';
    videoArray[activeVideo].hideStartSlider();
  } else {
    trimDivEndDiv.style.display = 'none';
    trimDivStartDiv.style.display = 'block';
    videoArray[activeVideo].hideEndSlider();
    videoArray[activeVideo].showStartSlider();
  }

  videoArray[activeVideo].resetBackground();
});

let fromEndDivContainer = trimDivUl.children[1].children[0];

// Show/Hide end trim slider when end trim div is clicked for video
fromEndDivContainer.addEventListener('click', function () {
  if (trimDivEndDiv.style.display === 'block') {
    trimDivEndDiv.style.display = 'none';
    videoArray[activeVideo].hideEndSlider();

  } else {
    trimDivStartDiv.style.display = 'none';
    trimDivEndDiv.style.display = 'block';
    videoArray[activeVideo].hideStartSlider();
    videoArray[activeVideo].showEndSlider();
  }
  videoArray[activeVideo].resetBackground();
});

