let slider = document.querySelector('.timeline .slider input');
slider.value = 0;

//Perform changes when slider is changed by user input
slider.oninput = function () {
  pauseVideo();
  changeTimerOnSlide();

  if (slider.value === 100) {
    videoArray[activeVideo].resetColor();
    activeVideo = 0;
    videoArray[activeVideo].changeColor();
    videoCurrent.src = videoArray[activeVideo].urlSource;
    videoCurrent.currentTime = 0;
    currentGlobalTime = 0;
    //change the effects, filters and other icons regarding the first video
    changeIcons();
  } else {
    //change video time that is currently lying in slider position as the slider changes
    changeVideoTimeBySlider();
    //change audio time that is currently lying in slider position as the slider changes
    changeAudioTimeBySlider()
    //change text that is currently lying in slider position as the slider changes
    changeTextBySlider();
  }
}

/**
 * If a video lies in current slider posiiton, this function will sync the video time according
 * to changeing slider value, otherwise change the video source and sync the time
 * @returns {undefined}
 */
function changeVideoTimeBySlider() {
  // Determine the index of video lying on the current slider value and its relative video time
  let [newVideoIndex, relativeSliderValue] = determineVideoIndex(slider.value);

  // If the new video index is not currently playinf video then, change the video otherwise just change time
  if (newVideoIndex !== activeVideo) {
    fileNameDiv.innerHTML = videoArray[newVideoIndex].fileName;
    videoArray[activeVideo].resetColor();
    resetDivShowing();
    activeVideo = newVideoIndex;
    videoArray[activeVideo].changeColor();
    videoCurrent.src = videoArray[activeVideo].urlSource;
    changeIcons();
  }
  videoCurrent.currentTime = relativeSliderValue * videoArray[activeVideo].length / 100;

  return;
}

/**
 * If a audio lies in current slider posiiton, this function will sync the audio time according
 * to changeing slider value, otherwise change the audio soucrce and sync the time
 * @returns {undefined}
 */
function changeAudioTimeBySlider() {
  let [newAudioIndex, relativeSliderValueAudio] = determineAudioIndex(slider.value);
  currentGlobalTime = slider.value / 100 * total;

  if (newAudioIndex !== null && newAudioIndex !== activeAudio) {
    if (activeAudio !== null) { musicArray[activeAudio].resetColor(); }
    activeAudio = newAudioIndex;
    musicArray[activeAudio].changeColor();
    audioFileNameDiv.innerHTML = musicArray[activeAudio].fileName;
    audioCurrent.src = musicArray[activeAudio].urlSource;
  } else if (newAudioIndex === null) {
    if (activeAudio !== null) { musicArray[activeAudio].resetColor() }
    activeAudio = null;
    audioFileNameDiv.innerHTML = 'None';
  }

  if (newAudioIndex !== null) {
    audioFileNameDiv.innerHTML = musicArray[activeAudio].fileName;
    audioCurrent.currentTime = relativeSliderValueAudio * musicArray[activeAudio].length / 100;
  }

  return;
}

/**
 * Change the text according to the slider value
 * @returns {undefined}
 */
function changeTextBySlider() {
  // Determine text that lies in current slider value
  let newTextIndex = determineTextIndex(slider.value);

  // Check if the returned newindex is the current active Text
  if (newTextIndex !== null && newTextIndex !== activeText) {
    if (activeText !== null) {
      textArray[activeText].hideTextArea();
      textArray[activeText].resetColor();
      textCustomizationDiv.style.display = 'block';
    }
    activeText = newTextIndex;
    textArray[activeText].changeColor();
    textArray[activeText].showTextArea();
  } else if (newTextIndex === null) {
    if (activeText !== null) {
      textArray[activeText].hideTextArea();
      textArray[activeText].resetColor();
      textCustomizationDiv.style.display = 'none';
    }
    activeText = null;
    textCustomizationDiv.style.display = 'none';
  }

  return;
}

/**
 * Changes the value of slider based on given value
 * @param {Number} change Value of slider as changed by user
 */
function changeSlider(change) {
  slider.value = change;
}

/**
 * Determines the index of video in videoArray on which the slider currently exists and also calcuates the relative position of slider
 * based on the video length.
 * @param {Number} sliderValue Value of slider as changed by user
 * @returns {Array} Array of video index and relative location of slider based on the video
 */
function determineVideoIndex(sliderValue) {
  for (let index = 0; index < rangeDuration.length; index++) {
    if (sliderValue >= rangeDuration[index][0] && sliderValue < rangeDuration[index][1]) {

      //p5map maps value of slider to from 0 to 100% to video's length
      return [index, p5map(sliderValue, rangeDuration[index][0], rangeDuration[index][1], 0, 100)];
    }
  }

}

/**
 * Determines the index of audio in musicArray on which the slider currently exists and also calcuates the relative position of slider
 * based on the audio length.
 * @returns {Array} If slider lies on some audio, then it willl return the index an the relative time, otherwise, [null, null]
 */
function determineAudioIndex() {
  for (let index = 0; index < audioRangeDuration.length; index++) {
    if (slider.value >= audioRangeDuration[index][0] && slider.value <= audioRangeDuration[index][1]) {

      //p5map maps value of slider to from 0 to 100% to video's length
      return [index, p5map(slider.value, audioRangeDuration[index][0], audioRangeDuration[index][1], 0, 100)];
    }
  }

  return [null, null];
}

/**
 * Determine the index of text in textArray in which the slider currently resides
 * @returns {Number} If some text is present in current slider position then its index it returned, otherwise, null.
 */
function determineTextIndex() {
  for (let index = 0; index < textRangeDuration.length; index++) {
    if (slider.value >= textRangeDuration[index][0] && slider.value <= textRangeDuration[index][1]) {
      //p5map maps value of slider to from 0 to 100% to video's length
      return index;
    }
  }

  return null;
}

/**
 * Changes the current time value when slider moves
 * @returns {undefined}
 */
function changeTimerOnSlide() {
  if (activeVideo !== 0) {
    // Get the total length of videos before it, if its not the first video.
    let time = videoArray.slice(0, activeVideo).reduce(function (acc, value) {
      return acc += value.length;
    }, 0);
    currentTimeIndicator.innerHTML = secondsToHms(videoCurrent.currentTime + time);
  } else {
    currentTimeIndicator.innerHTML = secondsToHms(videoCurrent.currentTime);
  }

  return;
}