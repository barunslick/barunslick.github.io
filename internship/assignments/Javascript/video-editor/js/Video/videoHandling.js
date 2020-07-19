let videoCurrent = document.getElementById('video-current');

videoCurrent.addEventListener('ended', changeVideo);

let activeVideo = 0;

/**
 * Loads the given video file.
 * @param {*} videoArray Array of all the video objects
 * @returns {undefined}
 */
function loadVideo(videoArray) {
  videoCurrent.src = videoArray[activeVideo].urlSource;
  videoCurrent.setAttribute('preload', 'auto');
  videoCurrent.load();
  changeTotaltimer();
}

/**
 * Changes the video source when the current video has ended, and reset div color of previous active video.
 * @returns {undefined}
 */
function changeVideo() {
  clearInterval(timer);
  if (activeVideo < videoArray.length - 1) {
    videoArray[activeVideo].resetColor();
    activeVideo++;
    videoArray[activeVideo].changeColor();
    videoCurrent.src = videoArray[activeVideo].urlSource;
    videoCurrent.load();
    playVideo();
  } else {
    videoArray[activeVideo].resetColor();
    activeVideo = 0;
    videoArray[activeVideo].changeColor();
    pauseVideo();
    videoCurrent.src = videoArray[activeVideo].urlSource;
    videoCurrent.currentTime = 0;
  }

  fileNameDiv.innerHTML = videoArray[activeVideo].fileName;
  changeIcons();

  return;
}

/**
 * Change the icons of effects, filters based on current video.
 * @returns {undefined}
 */
function changeIcons() {
  if (videoArray[activeVideo].filterArray.includes('blackAndWhite')) {
    BlackAndWhiteCheckImage.src = CHECKIMAGEPATH;
  } else {
    BlackAndWhiteCheckImage.src = PLUSIMAGEPATH;
  }
  if (videoArray[activeVideo].effectArray.includes('fadeIn')) {
    FadeInCheckImage.src = CHECKIMAGEPATH;
  } else {
    FadeInCheckImage.src = PLUSIMAGEPATH;
  }
  if (videoArray[activeVideo].effectArray.includes('fadeOut')) {
    FadeOutCheckImage.src = CHECKIMAGEPATH;
  } else {
    FadeOutCheckImage.src = PLUSIMAGEPATH;
  }
  if (videoArray[activeVideo].muteAudio === true) {
    muteVideoAudioCheckImage.src = CHECKIMAGEPATH;
  } else {
    muteVideoAudioCheckImage.src = PLUSIMAGEPATH;
  }

  return;
}

/**
 * Move the current time to selected Video position.
 * @param {Number} position Position of video in videoArray
 * @returns {undefined}
 */
function moveCurrentTimeToVideoLocation(position) {
  if (activeVideo !== position) {
    slider.value = rangeDuration[position][0] + 0.05;
    changeTimerOnSlide();
    changeVideoTimeBySlider();
    changeAudioTimeBySlider()
    changeTextBySlider();
  }

  return;
}