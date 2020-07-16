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
			activeAudio = null;
			this.resetColor();
		}
	}

	changeColor() {
		if (this.color !== '#3a69c6'){
			this.color = '#3a69c6';
			this.div.style.background = this.color;
		}
	}

	resetColor() {
		this.color = '#1c3c77';
		this.div.style.background = this.color;
	}

	mute(){
		if (this.muteAudio == false){
			this.muteAudio = true;	
		}else{
			this.muteAudio = false;
		}
	}

}