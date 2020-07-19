let trimDivAudio = document.querySelector('.main-container .tools-resources .trim-audio');
let trimImageAudio = document.querySelector('.main-container .tools-resources .trim-audio .trim-audio-heading img');
let trimDivUlAudio = document.querySelector('.main-container .tools-resources .box-content-dropdown ul');
let trimDivHeadingAudio = document.querySelector('.main-container .tools-resources .trim-audio .trim-audio-heading');
let trimDivEndDivAudio = document.querySelector('.main-container .tools-resources .box-content-dropdown .end');
let trimDivStartDivAudio = document.querySelector('.main-container .tools-resources .box-content-dropdown .start');

// Show trim options when trim heading is clicked for audio
trimDivHeadingAudio.addEventListener('click', function () {
  if (!trimDivUlAudio.style.display || trimDivUlAudio.style.display === 'none') {
    if (activeAudio === null) {
      showPopUp('audio');
      return;
    }
    trimDivUlAudio.style.display = 'block';
    trimImageAudio.src = CROSSIMAGEPATH;
  } else {
    resetDivShowingAudio();
  }
})

/**
 * Reset the background the audio div in animation pane when trim div is closed.
 * @returns {undefined}
 */
function resetDivShowingAudio() {
  trimImageAudio.src = DOWNIMAGEPATH;
  trimDivUlAudio.style.display = 'none';
  trimDivEndDivAudio.style.display = 'none';
  trimDivStartDivAudio.style.display = 'none';
  musicArray[activeAudio].hideStartSlider();
  musicArray[activeAudio].hideEndSlider();
  musicArray[activeAudio].endSlider.value = 100;

  return;
}

let fromStartDivContainerAudio = trimDivUlAudio.children[0].children[0];

// Show/Hide start trim slider when start trim div is clicked for audio
fromStartDivContainerAudio.addEventListener('click', function () {
  if (trimDivStartDivAudio.style.display === 'block') {
    trimDivStartDivAudio.style.display = 'none';
    musicArray[activeAudio].hideStartSlider();

  } else {
    if (activeAudio === null) {
      showPopUp('audio');
      return;
    }
    trimDivEndDivAudio.style.display = 'none';
    trimDivStartDivAudio.style.display = 'block';
    musicArray[activeAudio].hideEndSlider();
    musicArray[activeAudio].showStartSlider();
  }
});

let fromEndDivContainerAudio = trimDivUlAudio.children[1].children[0];

// Show/Hide end trim slider when end trim div is clicked for audio
fromEndDivContainerAudio.addEventListener('click', function () {
  if (trimDivEndDivAudio.style.display === 'block') {
    trimDivEndDivAudio.style.display = 'none';
    musicArray[activeAudio].hideEndSlider();

  } else {
    if (activeAudio === null) {
      showPopUp('audio');
      return;
    }
    trimDivStartDivAudio.style.display = 'none';
    trimDivEndDivAudio.style.display = 'block';
    musicArray[activeAudio].hideStartSlider();
    musicArray[activeAudio].showEndSlider();
  }
});

