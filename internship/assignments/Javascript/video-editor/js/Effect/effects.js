/**
 * Apply fade in to current frame by changing the opacity based on current time
 * @param {Array} frame Current frame taken from video element
 * @returns {Array} Return frame after changing opacity
 */
function fadeIn(frame) {
  let returnFrame = frame;
  let l = frame.data.length / 4;
  for (let i = 0; i < l; i++) {
    returnFrame.data[i * 4 + 3] = (videoCurrent.currentTime - videoArray[activeVideo].startPosition) / (FADEINRANGE * videoArray[activeVideo].endPosition) * 255;
  }

  return returnFrame;
}

/**
 * Apply fade out to current frame by changing the opacity based on current time
 * @param {Array} frame Current frame taken from video element
 * @returns {Array} Return frame after changing opacity
 */
function fadeOut(frame) {
  let returnFrame = frame;
  let l = frame.data.length / 4;
  for (let i = 0; i < l; i++) {
    returnFrame.data[i * 4 + 3] = 255 - (videoCurrent.currentTime - FADEOUTRANGE * videoArray[activeVideo].endPosition) * 255;
  }

  return returnFrame;
}