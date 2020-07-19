class Audio {
	constructor(src, length, pos) {
		this.urlSource = src;
		this.length = length;
		this.position = pos;
		this.startTrimmed = false;
		this.endTrimmed = false;
		this.startPosition = 0;
		this.endPosition = this.length;
		this.fileName = this.urlSource.replace(/^.*(\\|\/|\:)/, '');
		this.color = '#1c3c77';
		this.active = false;
		this.currentX = 0;
		this.initialX;
		this.xOffset = 0;
		this.muteAudio = false;

	}

	/**
	 * Creates div element for animation pane and adds it.
	 * @param {HTMLDivElement} containerDiv Parent div  for new div to be appended
	 * @param {Number} total Total length of videos in seconds
	 * @memberof Audio
	 */
	setDiv(containerDiv, total) {
		this.div = document.createElement('div');
		this.div.classList.add('music-div');
		this.div.style.background = this.color;
		this.div.id = this.position;
		this.div.style.width = this.length / total * 100 - 0.5 + '%';
		this.div.style.position = 'relative';
		containerDiv.appendChild(this.div);

		//Adds name of file to div
		this.addName();
		this.addEventListeners();
		this.addTrimSliders();
	}

	/**
	 * Adds name of audio file to div in animation pane.
	 * @memberof Audio
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
	 * Add sliders which allow trimming of audio.
	 * @memberof Audio
	 */
	addTrimSliders() {
		// Add sliders to trim from start
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

		// Add sliders to trim from end
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
	 * Changes the start time when trim sliders are used to trim audios.
	 * @memberof Audio
	 */
	setStartFinal() {
		let time = this.startSlider.value / 100 * musicArray[activeAudio].length;
		if (this.startSlider.value <= 100 - 2) this.setStartPosition(time);
		this.resetBackground();
		this.hideStartSlider();
		trimDivStartDivAudio.style.display = 'none';

	}

	/**
	 * Changes the end time when trim sliders are used to trim audios.
	 * @memberof Audio
	 */
	setEndFinal() {
		let time = this.endSlider.value / 100 * musicArray[activeAudio].length;
		if (this.endSlider.value >= 2) this.setEndPosition(time);
		this.resetBackground();
		this.hideEndSlider();
		trimDivEndDivAudio.style.display = 'none';
	}

	/**
	 * Changes the portion under the slider to white/dark color when input to start sliders are changed.
	 * @returns {undefined}
	 * @memberof Audio
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
	 * Changes the portion under the slider to white when input to end sliders are changed.
	 * @returns {undefined}
	 * @memberof Audio
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
	 * Resets the background of main div according to start value and end value position.
	 * @memberof Audio
	 */
	resetBackground() {
		let startPosPercentage = this.startPosition / this.length * 100;
		let endPosPercentage = this.endPosition / this.length * 100;
		if (this.startTrimmed && this.endTrimmed) {
			this.div.style.background = this.div.style.background = 'linear-gradient(90deg, #434655 ' + startPosPercentage + '%,' + this.color + ' ' + startPosPercentage + '% ' + endPosPercentage + '%,' + '#434655 ' + + endPosPercentage + '%)';
		} else if (this.startTrimmed) {
			this.div.style.background = this.div.style.background = 'linear-gradient(90deg, #434655 ' + startPosPercentage + '%,' + this.color + ' ' + ' 0%)';
		} else if (this.endTrimmed) {
			this.div.style.background = 'linear-gradient(90deg,' + this.color + ' ' + endPosPercentage + '%' + ', #434655 0%)';
		} else {
			this.div.style.background = this.color;
		}

	}

	/**
	 * Displays start slider for trimming.
	 * @memberof Audio
	 */
	showStartSlider() {
		this.startSlider.style.display = 'block';
	}

	/**
	 * Displays end slider for trimming.
	 * @memberof Audio
	 */
	showEndSlider() {
		this.endSlider.style.display = 'block';
	}

	/**
	 * Hides start slider for trimming.
	 * @memberof Audio
	 */
	hideStartSlider() {
		this.startSlider.style.display = 'none';
	}

	/**
	 * Hides end slider for trimming.
	 * @memberof Audio
	 */
	hideEndSlider() {
		this.endSlider.style.display = 'none';
	}

	/**
	 * Changes the starting position of audio based on trimming
	 * @param {Number} position  Indicator of where the audio should start after trimming
	 * @memberof Audio
	 */
	setStartPosition(position) {
		this.startPosition = position;
		this.startTrimmed = true;
	}

	/**
	 * Changes the end position of audio based on trimming
	 * @param {Number} position  Indicator of where the audio should end after trimming
	 * @memberof Audio
	 */
	setEndPosition(position) {
		this.endPosition = position;
		this.endTrimmed = true;
	}

	/**
	 * Sets its ratio based on its lendth and total length
	 * @param {Number} ratio Its length by total length of all the audio
	 * @memberof Audio
	 */
	setRatio(ratio) {
		this.ratio = ratio.toFixed(2);
	}

	/**
	 * Add the required event listeners when the div is slid.
	 * @memberof Audio
	 */
	addEventListeners() {
		this.musicText = document.querySelector('.timeline .music-pane');

		this.div.addEventListener('mousedown', (e) => {
			pauseVideo();
			this.initialX = e.clientX - this.xOffset;
			if (e.target === this.div) {
				this.active = true;
				moveCurrentTimeToAudioLocation(this.position);
			}
		});
		this.div.addEventListener('mouseup', (e) => {
			this.initialX = this.currentX;
			this.active = false;
			//redoing this action because somtimes when div is slid too fast, the div wont be active
			moveCurrentTimeToAudioLocation(this.position);
		});
		this.div.addEventListener('mousemove', (e) => this.slidDiv(e));
	}

	/** 
	 * Handles sliding of div
	 * @param {Event} e Click event
	 * @memberof Audio
	 */
	slidDiv(e){
			if (this.active) {
				moveCurrentTimeToAudioLocation(this.position);
				this.currentX = e.clientX - this.initialX;
				if (this.currentX > 0 && this.currentX + this.div.clientWidth < this.musicText.clientWidth) {
					this.xOffset = this.currentX;
					this.div.style.left = this.currentX + 'px';

				} else if (this.currentX + this.div.clientWidth > this.musicText.clientWidth) {
					this.currentX = this.musicText.clientWidth - this.div.clientWidth;
				} else {
					this.currentX = 0;
					this.xOffset = this.currentX;
					this.div.style.left = this.currentX + 'px';
				}
				this.changeRangeDuration();
				this.checkIfNewactive();
			}
	}

	/**
	 * Change the range duration global value whenever the div is slid and positioned in new position
	 * @memberof Audio
	 */
	changeRangeDuration() {
		let musicText = document.querySelector('.timeline .music-pane');
		let rangeDurationAudio = audioRangeDuration[this.position];
		rangeDurationAudio[0] = this.currentX / musicText.clientWidth * 100;
		rangeDurationAudio[1] = (this.currentX + this.div.clientWidth) / musicText.clientWidth * 100;
		audioRangeDuration[this.position] = rangeDurationAudio;
	}

	/**
	 * Check if new audio is active whenever it is slid to new position
	 * @memberof Audio
	 */
	checkIfNewactive() {
		let currentPlayPercentage = currentGlobalTime / total * 100;
		if (currentPlayPercentage >= audioRangeDuration[this.position][0] && currentPlayPercentage <= audioRangeDuration[this.position][1]) {
			if (activeAudio !== this.position) {
				activeAudio = this.position;
				audioFileNameDiv.innerHTML = this.fileName;
			}
			let relativePositionAudio = p5map(currentPlayPercentage, audioRangeDuration[this.position][0], audioRangeDuration[this.position][1], 0, 100);
			audioCurrent.currentTime = (relativePositionAudio * this.length / 100).toFixed(2);
			this.changeColor();
		} else {
			this.resetColor();
			activeAudio = null;
			audioFileNameDiv.innerHTML = 'None';
		}
	}

	/**
	 * Change the color of div to active div color.
	 * @memberof Audio
	 */
	changeColor() {
		if (this.color !== ACTIVECOLOR) {
			this.color = ACTIVECOLOR;
		}
		this.resetBackground();
	}

	/**
	 * Change the color of div to inactive div color.
	 * @memberof Audio
	 */
	resetColor() {
		this.color = INACTIVECOLOR;
		this.resetBackground();
	}

	/**
	 * Toggle the mute flag.
	 * @memberof Audio
	 */
	mute() {
		if (this.muteAudio === false) {
			this.muteAudio = true;
		} else {
			this.muteAudio = false;
		}
	}

}