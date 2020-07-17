class Audio{
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
    setDiv(containerDiv, total) {
		this.div = document.createElement('div');
		this.div.classList.add('music-div');
		this.div.style.background = this.color;
		this.div.id = this.position;
		this.div.style.width = this.length/total * 100 - 0.5 + '%';
		this.div.style.position = 'relative';
		containerDiv.appendChild(this.div);
		/* this.addTrimSliders(containerDiv);*/
		this.addName();
		this.addEventListeners();
		this.addTrimSliders();
	}
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
	addTrimSliders(containerDiv) {
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
	setStartFinal() {
		let time = this.startSlider.value / 100 * musicArray[activeAudio].length;
		if(this.startSlider.value <= 100 -2 ) this.setStartPosition(time);
		this.resetBackground();
		this.hideStartSlider();
	}

	setEndFinal() {
		let time = this.endSlider.value / 100 * musicArray[activeAudio].length;
		if(this.endSlider.value >= 2 ) this.setEndPosition(time);
		this.resetBackground();
		this.hideEndSlider();
	}

	startSliderChange() {
		let endPosPercentage = this.endPosition / this.length * 100;
		if (this.endTrimmed) {
			if (this.startTrimmed && this.startSlider.value == 0) return;
			if (this.startSlider.value > endPosPercentage - 2) {
				this.startSlider.value = endPosPercentage - 2;
			} else {
				this.div.style.background = 'linear-gradient(90deg, white ' + this.startSlider.value + '%,' + '#3a69c6 ' + this.startSlider.value + '% ' + endPosPercentage + '%,' + '#434655 ' + endPosPercentage + '%)';
			}
		}
		else if (this.startTrimmed && this.startSlider.value == 0) {
			return;
		}
		else {
			this.div.style.background = 'linear-gradient(90deg, white ' + this.startSlider.value + '%,' + '#3a69c6' + ' 0%)';
		}
	}

	endSliderChange() {
		let startPosPercentage = this.startPosition / this.length * 100;
		if (this.startTrimmed) {
			if (this.endTrimmed && this.endSlider.value == 100) return;
			if (this.endSlider.value < (startPosPercentage + 2)) {
				this.endSlider.value = startPosPercentage + 2;
			} else {
				this.div.style.background = 'linear-gradient(90deg,' + '#434655 ' + startPosPercentage + '%, ' + '#3a69c6 ' + startPosPercentage + '% ' + (this.endSlider.value) + '%' + ', white ' + this.endSlider.value + '%)';
			}
		}
		else if (this.endTrimmed && this.endSlider.value == 100) {
			return;
		}
		else {
			this.div.style.background = 'linear-gradient(90deg,' + '#3a69c6' + ' ' + (this.endSlider.value) + '%' + ', white 0%)';
		}
	}

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

	showStartSlider() {
		this.startSlider.style.display = 'block';
	}

	showEndSlider() {
		this.endSlider.style.display = 'block';
	}

	hideStartSlider() {
		this.startSlider.style.display = 'none';
	}

	hideEndSlider() {
		this.endSlider.style.display = 'none';
	}

	setStartPosition(position) {
		this.startPosition = position;
		this.startTrimmed = true;
	}

	setEndPosition(position) {
		this.endPosition = position;
		this.endTrimmed = true;
	}

    setRatio(ratio){
        this.ratio = ratio.toFixed(2);
	}
	
	addEventListeners(){
		let musicText = document.querySelector('.timeline .music-pane');
		
		this.div.addEventListener('mousedown',(e)=>{
			pauseVideo();
			this.initialX = e.clientX - this.xOffset;
			if (e.target == this.div){
				this.active = true;
			}
		});
		this.div.addEventListener('mouseup', (e)=>{
			this.initialX = this.currentX;
			this.active = false;
		});
		this.div.addEventListener('mousemove', (e)=>{
			if (this.active){
				this.currentX = e.clientX - this.initialX;
				if (this.currentX > 0 && this.currentX + this.div.clientWidth < musicText.clientWidth){
					this.xOffset = this.currentX;
					this.div.style.left = this.currentX + 'px';
					
				}else if(this.currentX + this.div.clientWidth > musicText.clientWidth){
					this.currentX = musicText.clientWidth - this.div.clientWidth;
				}else{
					this.currentX = 0;
					this.xOffset = this.currentX;
					this.div.style.left = this.currentX + 'px';
				}
				this.changeRangeDuration();
				this.checkIfNewactive();
			}
		});
	}

	changeRangeDuration(){
		let musicText = document.querySelector('.timeline .music-pane');
		let rangeDurationAudio = audioRangeDuration[this.position];
		rangeDurationAudio[0] = this.currentX/ musicText.clientWidth * 100;
		rangeDurationAudio[1] = (this.currentX + this.div.clientWidth)/ musicText.clientWidth * 100;
		audioRangeDuration[this.position] = rangeDurationAudio;
		
	}

	checkIfNewactive(){
		let currentPlayPercentage = currentGlobalTime/total * 100;
		if (currentPlayPercentage >= audioRangeDuration[this.position][0] && currentPlayPercentage <= audioRangeDuration[this.position][1]){
			if (activeAudio !== this.position){
				activeAudio = this.position;
			}
			let relativePositionAudio = p5map(currentPlayPercentage, audioRangeDuration[this.position][0], audioRangeDuration[this.position][1], 0, 100);
			audioCurrent.currentTime = (relativePositionAudio * this.length/100).toFixed(2); 
			this.changeColor();
		}else{
			this.resetColor();
			activeAudio = null;
			
		}
	}

	changeColor() {
		if (this.color !== '#3a69c6'){
			this.color = '#3a69c6';
		}
		this.resetBackground();
	}

	resetColor() {
		this.color = '#1c3c77';
		this.resetBackground();
	}

	mute(){
		if (this.muteAudio === false){
			console.log('here')
			this.muteAudio = true;	
		}else{
			console.log('here down')
			this.muteAudio = false;
		}
	}

}