let animationDiv = document.querySelector('.timeline .video-pane');
let fadeInDiv = document.querySelector('.effects-filters .fade-in');
let fadeOutDiv = document.querySelector('.effects-filters .fade-out');

let playButton = document.querySelector('.controls .playpause .play');
let pauseButton = document.querySelector('.controls .playpause .pause');

let textBtn = document.getElementById('add-text-btn');
let fontSizeInputField = document.getElementById('font-size-input');
let textCustomizationDiv = document.querySelector('.header .text-controls');

let totalTimeIndicator = document.querySelector('.timeline .time .total-time');
let currentTimeIndicator = document.querySelector('.timeline .time .current-time');

let FadeInCheckImage = document.querySelector('.main-container .boxes .fade-in img');
let FadeOutCheckImage = document.querySelector('.main-container .boxes .fade-out img');
let muteVideoAudioCheckImage = document.querySelector('.effects-filters .mute-video-audio img');
let BlackAndWhiteCheckImage = document.querySelector('.main-container .boxes .black-and-white img');

let blackAndWhitedDiv = document.querySelector('.main-container .black-and-white');
let muteVideoAudioDiv = document.querySelector('.main-container .effects-filters .mute-video-audio');

let audioMuteDiv = document.querySelector('.main-container .tools-resources .mute-audio');
let audioMuteCheckImage = document.querySelector('.main-container .tools-resources .check-image-audio img');


playButton.addEventListener('click', playVideo);
pauseButton.addEventListener('click', pauseVideo);
fadeInDiv.addEventListener('click', fadeInIconChange);
audioMuteDiv.addEventListener('click', muteMusicAudio);
fadeOutDiv.addEventListener('click', fadeOutIconChange);
muteVideoAudioDiv.addEventListener('click', muteVideoAudio);
blackAndWhitedDiv.addEventListener('click', blackAndWhiteIconChange);

// Timer containes the reference to that setInterval function that is responsible for callling changeTimer functtion
// which performs all the operations that is required at that instant when video is palying
let timer;
let currentGlobalTime = 0;

/**
 * Plays a video if it is paused
 * @returns {undefined}
 */
function playVideo() {
  if (videoCurrent.paused) {
    videoCurrent.play();
    textCustomizationDiv.style.display = 'none';
    timer = setInterval(changeTimer, 100);
  }

  return;
}

/**
 * Pauses the video if it is played and also the audio
 * @returns {undefined
 */
function pauseVideo() {
  if (!audioCurrent.paused && activeAudio !== null) {
    audioCurrent.pause();
  }
  if (!videoCurrent.paused) videoCurrent.pause();
  clearInterval(timer);
  showTextOutlines();
  toggleTextTool();

  return;
}

/**
 * Toggles the mute flag in the audio object or show error if no audio is selected
 * @returns {undefined}
 */
function muteMusicAudio() {
  let currentAudioIndex = determineAudioToBePlayed();
  if (currentAudioIndex !== null) {
    musicArray[activeAudio].mute();
    if (musicArray[activeAudio].muteAudio === true) {
      audioMuteCheckImage.src = CHECKIMAGEPATH;
    } else {
      audioMuteCheckImage.src = PLUSIMAGEPATH;
    }
  } else {
    showPopUp('audio');
  }

  return;
}

/**
 * Toggles the mute flag in the video object
 * @returns {undefined}
 */
function muteVideoAudio() {
  videoArray[activeVideo].mute();
  if (videoArray[activeVideo].muteAudio === true) {
    muteVideoAudioCheckImage.src = CHECKIMAGEPATH;
  } else {
    muteVideoAudioCheckImage.src = PLUSIMAGEPATH;
  }

  return;
}

/**
 * Change the total timer indicator
 * @returns {undefined}
 */
function changeTotaltimer() {
  totalTimeIndicator.innerHTML = secondsToHms(total);

  return;
}

/**
 * Basically performs checks on all entities (video, audio and text) and determines which to show.
 * @returns {undefined}
 */
function changeTimer() {
  checkAudioMute();
  checkVideoPlayBack();
  checkAudioPlayBack();
  checkTextToShow();

  return;
}

/**
 * Check which video is to be played at current time and update the current time indicator
 * @returns {undefined}
 */
function checkVideoPlayBack() {
  if (activeVideo !== 0) {
    let time = videoArray.slice(0, activeVideo).reduce(function (acc, value) {
      return acc += value.length;
    }, 0);
    sliderChange = videoCurrent.currentTime + time;
    currentTimeIndicator.innerHTML = secondsToHms(videoCurrent.currentTime + time);
    changeSlider(sliderChange / total * 100);
  } else {
    sliderChange = videoCurrent.currentTime;
    currentTimeIndicator.innerHTML = secondsToHms(videoCurrent.currentTime);
    changeSlider(sliderChange / total * 100);
  }
  currentGlobalTime = sliderChange;

  return;
}

/**
 * Show text customization tool only when text is acutally selected
 * @returns {undefined}
 */
function toggleTextTool() {
  let currentTime = currentGlobalTime / total * 100;
  let index = determineTextIndex(currentTime);
  if (index === null) {
    textCustomizationDiv.style.display = 'none';
    return;
  };
  textCustomizationDiv.style.display = 'block';

  return;
}

/**
 * Check the status of mute flag of current audio
 * @returns {undefined}
 */
function checkAudioMute() {
  if (videoArray[activeVideo].muteAudio === true) {
    videoCurrent.muted = true;
  } else {
    videoCurrent.muted = false;
  }

  return;
}

/**
 * Shows the correct text based on the current time
 * @returns {undefined}
 */
function checkTextToShow() {
  let currentTime = currentGlobalTime / total * 100;
  let currentTextToShow = determineTextIndex(currentTime);

  if (currentTextToShow !== null) {
    for (let index = 0; index < textArray.length; index++) {
      if (index === currentTextToShow) continue;
      textArray[currentTextToShow].resetColor();
      textArray[currentTextToShow].hideTextArea();
    }

    activeText = currentTextToShow;
    // hides the border and resize area when the video is playing
    textArray[currentTextToShow].showWhilePlaying();
    textArray[currentTextToShow].changeColor();
  } else {
    activeText = null;
    //hide every other text other than current one
    textArray.forEach(element => {
      element.hideTextArea();
      element.resetColor();
    });
  }

  return;
}

/**
 * Shows the border and resize button when the video is paused.
 * @returns {undefined}
 */
function showTextOutlines() {
  if (activeText !== null) {
    textArray[activeText].showTextArea();
  }

  return;
}

/**
 * Checks if black and white filter is applied and changes icon accordingly
 * @returns {undefined}
 */
function blackAndWhiteIconChange() {
  if (videoArray[activeVideo].filterArray.includes('blackAndWhite')) {
    BlackAndWhiteCheckImage.src = PLUSIMAGEPATH;
    videoArray[activeVideo].removeFilter('blackAndWhite');
  } else {
    BlackAndWhiteCheckImage.src = CHECKIMAGEPATH;
    videoArray[activeVideo].addFilter('blackAndWhite');
  }
  return;
}

/**
 * Checks if fade out effect is applied and changes icon accordingly
 * @returns {undefined}
 */
function fadeInIconChange() {
  if (videoArray[activeVideo].effectArray.includes('fadeIn')) {
    FadeInCheckImage.src = PLUSIMAGEPATH;
    videoArray[activeVideo].removeEffect('fadeIn');
  } else {
    FadeInCheckImage.src = CHECKIMAGEPATH;
    videoArray[activeVideo].addEffect('fadeIn');
  }
  return;
}

/**
 * Checks if fade in effect is applied and changes icon accordingly
 * @returns {undefined}
 */
function fadeOutIconChange() {
  if (videoArray[activeVideo].effectArray.includes('fadeOut')) {
    FadeOutCheckImage.src = PLUSIMAGEPATH;
    videoArray[activeVideo].removeEffect('fadeOut');
  } else {
    FadeOutCheckImage.src = CHECKIMAGEPATH;
    videoArray[activeVideo].addEffect('fadeOut');
  }
}

// Add text if no text is present in current position
textBtn.addEventListener('click', (e) => {
  if (checkIfSpaceAvailable()) {
    let length = textArray.length;
    let newText = new Text(length);
    textArray.push(newText);
    activeText = length;
    textCustomizationDiv.style.display = 'block';
  } else {
    showPopUp('text');
  }
});

/**
 * Shows pop up warning when text, or music aciton is performed when none is selected
 * @param {String} context Context of warning, whether it is text related or music
 * @returns {undefined}
 */
function showPopUp(context) {
  let message = 'Error';
  let div = document.querySelector('.warning-popup');
  if (context === 'audio') {
    message = 'No Audio Source Selected.';
  } else if (context === 'text') {
    message = 'Cannot Add Text Here.';
  }
  div.innerText = message;
  div.style.bottom = div.clientHeight + 'px';
  setTimeout(function () {
    div.style.bottom = -div.clientHeight + 'px';
  }, 2000);

  return;
}

/**
 * Checks if space is available for new text to be placed
 * @returns {Boolean} True if space is available for text, otherwise False.
 */
function checkIfSpaceAvailable() {
  let newRangeLeft = currentGlobalTime / total * 100;
  let newRangeRight = newRangeLeft + MINIMUMTEXTTIME / total * 100;
  for (let index = 0; index < textRangeDuration.length; index++) {
    if (inBetween(newRangeLeft, textRangeDuration[index][0], textRangeDuration[index][1]) || inBetween(newRangeRight, textRangeDuration[index][0], textRangeDuration[index][1])) {
      return false;
    }
  }
  if (newRangeLeft > 100 - MINIMUMTEXTTIME / total * 100 && newRangeRight > 100) return false;
  return true;
}

// Apply desired operation on text
textCustomizationDiv.addEventListener('click', (e) => {
  let className = e.target.className;
  if (activeText === null) return;
  switch (className) {
    case 'bold-btn':
      textArray[activeText].makeBold();
      break;
    case 'italics-btn':
      textArray[activeText].makeItalics();
      break;
    case 'underline-btn':
      textArray[activeText].makeUnderline();
      break;
    default:
      break;
  }
  if (className.includes('tcolor')) {
    let color = (className.split(" "))[1];
    textArray[activeText].colorText(color);
  }
  if (className.includes('bcolor')) {
    let color = (className.split(" "))[1];
    textArray[activeText].colorBackground(color);
  }
})

// Validate given value of font size
fontSizeInputField.oninput = function () {
  if (activeText === null) {
    fontSizeInputField.value = '-';
  } else {
    let number = parseInt(fontSizeInputField.value);
    if (number < 0 || number > 100) {
      number = 14;
      fontSizeInputField.value = 14;
    }
    if (Number.isNaN(number)) {
      number = 0;
      fontSizeInputField.value = 0;
    }
    fontSizeInputField.value = parseInt(number, 10)
    textArray[activeText].changeFontSize(parseInt(number, 10));
  }
}