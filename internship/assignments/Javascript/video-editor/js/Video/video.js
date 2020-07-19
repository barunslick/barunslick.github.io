class Video {
  constructor(src, length, pos) {
    this.urlSource = src;
    this.length = length;
    this.position = pos;
    this.filterArray = [];
    this.effectArray = [];
    this.startTrimmed = false;
    this.endTrimmed = false;
    this.startPosition = 0;
    this.endPosition = this.length;
    this.fileName = this.urlSource.replace(/^.*(\\|\/|\:)/, '');
    this.color = INACTIVECOLOR;
    this.muteAudio = false;
  }

	/**
	 * Change the color of div to active div color.
	 * @memberof Video
	 */
  changeColor() {
    this.color = ACTIVECOLOR;
    this.resetBackground();
  }

	/**
	 * Change the color of div to inactive div color.
	 * @memberof Video
	 */
  resetColor() {
    this.color = INACTIVECOLOR;
    this.resetBackground();
  }

	/**
	 * Resets the background of main div according to start value and end value position.
	 * @memberof Video
	 */
  resetBackground() {
    let startPosPercentage = this.startPosition / this.length * 100;
    let endPosPercentage = this.endPosition / this.length * 100;
    if (this.startTrimmed && this.endTrimmed) {
      this.div.style.background = this.div.style.background = 'linear-gradient(90deg, #434655 ' + startPosPercentage + '%,' + this.color + ' ' + startPosPercentage + '% ' + endPosPercentage + '%,' + '#434655 ' + + endPosPercentage + '%)';
    } else if (videoArray[activeVideo].startTrimmed) {
      this.div.style.background = videoArray[activeVideo].div.style.background = 'linear-gradient(90deg, #434655 ' + startPosPercentage + '%,' + this.color + ' ' + ' 0%)';
    } else if (videoArray[activeVideo].endTrimmed) {
      this.div.style.background = 'linear-gradient(90deg,' + this.color + ' ' + endPosPercentage + '%' + ', #434655 0%)';
    } else {
      this.div.style.background = this.color;
    }

  }

	/**
	 * Sets its ratio based on its lendth and total length.
	 * @param {Number} ratio Its length by total length of all the video
	 * @memberof Video
	 */
  setRatioLength(ratio) {
    this.ratio = ratio.toFixed(2);
  }

	/**
	 * Sets the objects value position based on poisiton in video array.
	 * @param {Number} pos Index of video in video array
	 * @memberof Video
	 */
  setPosition(pos) {
    this.position = pos;
  }

	/**
	 * Creates div element for animation pane and adds it.
	 * @param {HTMLDivElement} containerDiv Parent div  for new div to be appended
	 * @memberof Video
	 */
  setDiv(containerDiv) {
    this.div = document.createElement('div');
    this.div.classList.add('animation-div');
    this.div.style.background = this.color;
    this.div.id = this.position;
    this.div.style.width = this.ratio - 0.5 + '%';
    this.div.style.position = 'relative';
    containerDiv.appendChild(this.div);
    this.div.addEventListener('click', this.handleClick.bind(this));

    this.addName();
    this.addTrimSliders();
  }

	/**
	 * Adds name of video file to div in animation pane.
	 * @memberof Video
	 */
  addName() {
    this.nameDiv = document.createElement('div');
    this.nameSpan = document.createElement('span');
    this.nameSpan.style.color = 'white';
    this.nameSpan.style.fontSize = '14px';
    this.nameSpan.innerText = this.fileName;
    this.nameDiv.style.marginLeft = '10px';
    this.nameDiv.style.marginTop = '5px';
    this.nameDiv.appendChild(this.nameSpan);
    this.div.appendChild(this.nameDiv);
  }

	/**
	 * Add sliders which allow trimming of video.
	 * @memberof Video
	 */
  addTrimSliders() {
    this.startSlider = document.createElement('input');
    this.startSlider.setAttribute('type', 'range');
    this.startSlider.style.position = 'absolute';
    this.startSlider.style.top = '50%';
    this.startSlider.style.width = '100%';
    this.startSlider.value = 0;
    this.startSlider.style.display = 'none';
    this.div.appendChild(this.startSlider);

    this.startSlider.oninput = this.startSliderChange.bind(this);
    this.startSlider.onmouseup = this.setStartFinal.bind(this);

    this.endSlider = document.createElement('input');
    this.endSlider.setAttribute('type', 'range');
    this.endSlider.style.position = 'absolute';
    this.endSlider.style.top = '50%';
    this.endSlider.style.width = '100%';
    this.endSlider.value = 100;
    this.endSlider.style.display = 'none';

    this.endSlider.oninput = this.endSliderChange.bind(this);
    this.endSlider.onmouseup = this.setEndFinal.bind(this);
    this.div.appendChild(this.endSlider);
  }

	/**
	 * Changes the start time when trim sliders are used to trim videos.
	 * @memberof Video
	 */
  setStartFinal() {
    let time = this.startSlider.value / 100 * videoArray[activeVideo].length;
    if (this.startSlider.value <= 100 - 2) this.setStartPosition(time);
    this.resetBackground();
    this.hideStartSlider();
    trimDivStartDiv.style.display = 'none';
  }

	/**
	 * Changes the end time when trim sliders are used to trim videos.
	 * @memberof Video
	 */
  setEndFinal() {
    let time = this.endSlider.value / 100 * videoArray[activeVideo].length;
    if (this.endSlider.value >= 2) this.setEndPosition(time);
    this.resetBackground();
    this.hideEndSlider();
    trimDivEndDiv.style.display = 'none';
  }

	/**
	 * Changes the portion under the slider to white/dark color when input to start sliders are changed.
	 * @returns {undefined}
	 * @memberof Video
	 */
  startSliderChange() {
    let endPosPercentage = this.endPosition / this.length * 100;
    if (this.endTrimmed) {
      if (this.startTrimmed && Number(this.startSlider.value) === 0) return;
      if (this.startSlider.value > endPosPercentage - 2) {
        this.startSlider.value = endPosPercentage - 2;
      } else {
        this.div.style.background = 'linear-gradient(90deg, white ' + this.startSlider.value + '%,' + '#3a69c6 ' + this.startSlider.value + '% ' + endPosPercentage + '%,' + '#434655 ' + endPosPercentage + '%)';
      }
    }
    else if (this.startTrimmed && Number(this.startSlider.value) === 0) {
      return;
    }
    else {
      this.div.style.background = 'linear-gradient(90deg, white ' + this.startSlider.value + '%,' + '#3a69c6' + ' 0%)';
    }
  }

	/**
	 * Changes the portion under the slider to white/black when input to end sliders are changed.
	 * @returns {undefined}
	 * @memberof Video
	 */
  endSliderChange() {
    let startPosPercentage = this.startPosition / this.length * 100;
    if (this.startTrimmed) {
      if (this.endTrimmed && Number(this.endSlider.value) === 100) return;
      if (this.endSlider.value < (startPosPercentage + 2)) {
        this.endSlider.value = startPosPercentage + 2;
      } else {
        this.div.style.background = 'linear-gradient(90deg,' + '#434655 ' + startPosPercentage + '%, ' + '#3a69c6 ' + startPosPercentage + '% ' + (this.endSlider.value) + '%' + ', white ' + this.endSlider.value + '%)';
      }
    }
    else if (this.endTrimmed && Number(this.endSlider.value) === 100) {
      return;
    }
    else {
      this.div.style.background = 'linear-gradient(90deg,' + '#3a69c6' + ' ' + (this.endSlider.value) + '%' + ', white 0%)';
    }
  }

	/**
	 * Displays start slider for trimming.
	 * @memberof Video
	 */
  showStartSlider() {
    this.startSlider.style.display = 'block';
  }

	/**
	 * Displays end slider for trimming.
	 * @memberof Video
	 */
  showEndSlider() {
    this.endSlider.style.display = 'block';
  }

	/**
	 * Hides start slider for trimming.
	 * @memberof Video
	 */
  hideStartSlider() {
    this.startSlider.style.display = 'none';
  }

	/**
	 * Hides end slider for trimming.
	 * @memberof Video
	 */
  hideEndSlider() {
    this.endSlider.style.display = 'none';
  }

	/**
	 * Adds filter name to its filter array.
	 * @param {String} filterName Name of filter to add
	 * @memberof Video
	 */
  addFilter(filterName) {
    this.filterArray.push(filterName);
  }

	/**
	 * Remove filter name to its filter array.
	 * @param {String} filterName Name of filter to remove
	 * @memberof Video
	 */
  removeFilter(filterName) {
    this.filterArray = this.filterArray.filter(filter => filter !== filterName);
  }

	/**
	 * Adds effect name to its effect array.
	 * @param {String} effectName Name of effect to add
	 * @memberof Video
	 */
  addEffect(effectName) {
    this.effectArray.push(effectName);
  }

	/**
	 * Remove effect name to its effect array.
	 * @param {String} effectName Name of effect to remove
	 * @memberof Video
	 */
  removeEffect(effectName) {
    this.effectArray = this.effectArray.filter(effect => effect !== effectName);
  }

	/**
	 * Pause the video, and change time to its starting time when div is clicked.
	 * @memberof Video
	 */
  handleClick() {
    pauseVideo();
    moveCurrentTimeToVideoLocation(this.position);
  }

  /**
 * Changes the starting position of video based on trimming
 * @param {Number} position  Indicator of where the video should start after trimming
 * @memberof Video
 */
  setStartPosition(position) {
    this.startPosition = position;
    this.startTrimmed = true;
  }

	/**
	 * Changes the end position of video based on trimming
	 * @param {Number} position  Indicator of where the video should end after trimming
	 * @memberof Video
	 */
  setEndPosition(position) {
    this.endPosition = position;
    this.endTrimmed = true;
  }

	/**
	 * Toggle the mute flag
	 * @memberof Video
	 */
  mute() {
    if (this.muteAudio === false) {
      this.muteAudio = true;
    } else {
      this.muteAudio = false;
    }
  }


}

