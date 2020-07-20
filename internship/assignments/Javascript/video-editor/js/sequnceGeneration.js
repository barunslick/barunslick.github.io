let tmpCanvas = document.createElement('canvas');
let tmpCanvasCtx = tmpCanvas.getContext('2d');

let finalCanvas = document.querySelector('.video-all .all-video-holder canvas');
let finalCanvasCtx = finalCanvas.getContext('2d');

videoCurrent.addEventListener('play', timerCallback);

/**
 * A recurring function that is reponsible for calling necessary functions to take the current video frame
 * and perform required operations and paint the final canvas
 * @returns {undefined}
 */
function timerCallback() {
  if (videoCurrent.paused || videoCurrent.ended) return;
  setCanvasDimension();
  computeFrame();
  setTimeout(function () {
    timerCallback();
  }, 0);
}

/**
 * Sets the dimension of final canvas according to video's dimension
 * @returns {undefined}
 */
function setCanvasDimension() {
  tmpCanvas.setAttribute('width', videoCurrent.videoWidth);
  tmpCanvas.setAttribute('height', videoCurrent.videoHeight);
  finalCanvas.setAttribute('width', videoCurrent.videoWidth);
  finalCanvas.setAttribute('height', videoCurrent.videoHeight);

  return;
}

/**
 * Takes the current video frame and applies the required effects and filters and paints the final canvas
 * @returns {undefined}
 */
function computeFrame() {
  if (videoCurrent.videoWidth !== 0 && videoCurrent.videoHeight !== 0) {

    // Draws the current video frame in temporary canvas that is hidden
    tmpCanvasCtx.drawImage(videoCurrent, 0, 0, videoCurrent.videoWidth, videoCurrent.videoHeight);
    // Gets current frame
    let frame = tmpCanvasCtx.getImageData(0, 0, videoCurrent.videoWidth, videoCurrent.videoHeight);

    if (videoCurrent.currentTime > videoArray[activeVideo].startPosition && videoCurrent.currentTime < videoArray[activeVideo].endPosition) {
      let filtersToApply = videoArray[activeVideo].filterArray;
      let modifiedFrame = frame;
      if (filtersToApply.length !== 0) {
        // Performs all the required filters and get the final frame
        modifiedFrame = getFrameAfterFiler(filtersToApply, modifiedFrame);
      }

      let effectsToApply = videoArray[activeVideo].effectArray;

      if (effectsToApply.length !== 0) {
        // Perform all the required effects and get the final frame
        modifiedFrame = getFrameAfterEffects(effectsToApply, modifiedFrame)
      }
      // Put the final frame in the final canvas i.e display canvas
      finalCanvasCtx.putImageData(modifiedFrame, 0, 0);

      return;
    }
  }
}

/**
 * Takes a frame and applies all the given filters to it
 * @param {Array} filtersToApply List of all the filters to apply
 * @param {Array} modifiedFrame Pixel data of the frame that is to be modified
 * @returns {Array} Final frame after all the filters are applied
 */
function getFrameAfterFiler(filtersToApply, modifiedFrame) {
  for (let index = 0; index < filtersToApply.length; index++) {
    let filterFunction = determineFilter(filtersToApply[index]);
    modifiedFrame = filterFunction(modifiedFrame);
  }

  return modifiedFrame;
}

/**
 * Takes a frame and applies all the given effects
 * @param {Array} effectsToApply List of effects to be applied
 * @param {Array} modifiedFrame Pixel data of current frame
 * @returns {Array} Final frame after effects are aplied
 */
function getFrameAfterEffects(effectsToApply, modifiedFrame) {
  for (let index = 0; index < effectsToApply.length; index++) {
    let effectFunction = determineEffect(effectsToApply[index]);
    if (!effectFunction) {
      continue;
    }
    modifiedFrame = effectFunction(modifiedFrame);
  }

  return modifiedFrame;
}

/**
 * Returns the required function, that applies filter on the given frame, based on given filter name
 * @param {String} filterName The name of filter to be applied
 * @returns {Function} The filter function based on given name
 */
function determineFilter(filterName) {
  switch (filterName) {
    case 'blackAndWhite':
      return blackAndWhite;
      break;

    default:
      break;
  }
}

/**
 * Returns the required function, that performs the effect on frame based, on the given effect name
 * @param {String} effectName The name of effect to be applied
 * @returns {Function} The effect applying function based on given name
 */
function determineEffect(effectName) {
  switch (effectName) {
    case 'fadeIn':
      // Fade is only performed at early stages of video duration
      if (videoCurrent.currentTime < ((FADEINRANGE * videoArray[activeVideo].length) + videoArray[activeVideo].startPosition)) {
        return fadeIn;
      } else {
        return null;
      }

      break;

    case 'fadeOut':
      // Fade out is performed only at later stages of videos duration
      if (videoCurrent.currentTime > (FADEOUTRANGE * videoArray[activeVideo].endPosition) && videoCurrent.currentTime < videoArray[activeVideo].endPosition) {
        return fadeOut;
      } else {
        return null;
      }

      break;

    default:
      break;
  }
}