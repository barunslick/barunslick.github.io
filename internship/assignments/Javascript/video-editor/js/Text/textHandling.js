let activeText = null;

/**
 * Update the index of text objects when a text is removed.
 * @returns {undefined}
 */
function updateIndex() {
  activeText = null;
  if (textArray.length === 0) return;
  for (let index = 0; index < textArray.length; index++) {
    textArray[index].setPosition(index);
  }

  return;
}

/**
 * Move the current time to selected text position.
 * @param {Number} position Position of text in textArray
 * @param {Boolean} right Move the current time to end of the text length.
 * @returns {undefined}
 */
function moveCurrentTimeToTextLocation(position, right) {
  slider.value = right ? textRangeDuration[position][1] - 0.1 : textRangeDuration[position][0] + 0.1;
  changeTimerOnSlide();
  changeVideoTimeBySlider();
  changeAudioTimeBySlider()
  changeTextBySlider();

  return;
}
