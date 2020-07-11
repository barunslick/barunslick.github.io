function fadeIn(frame) {
  let returnFrame = frame;
  let l = frame.data.length / 4;
  for (let i = 0; i < l; i++) {
    returnFrame.data[i * 4 + 3] = (videoCurrent.currentTime - videoArray[activeVideo].startPosition) / (FADEINRANGE * videoArray[activeVideo].endPosition) * 255;
  }
  return returnFrame;

}

function fadeOut(frame) {
  let returnFrame = frame;
  let l = frame.data.length / 4;
  for (let i = 0; i < l; i++) {
    returnFrame.data[i * 4 + 3] = 255 - (videoCurrent.currentTime - FADEOUTRANGE * videoArray[activeVideo].endPosition ) * 255;
  }
  return returnFrame;

}