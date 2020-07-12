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
		this.color = '#1c3c77';
	}

	changeColor(){
		this.color = '#3a69c6';
		this.resetBackground();
	}

	resetColor(){
		this.color = '#1c3c77';
		this.resetBackground();
	}

	resetBackground() {
		let startPosPercentage = this.startPosition / this.length * 100;
		let endPosPercentage = this.endPosition / this.length * 100;
		if (this.startTrimmed && this.endTrimmed) {
			this.div.style.background = this.div.style.background = 'linear-gradient(90deg, #434655 ' + startPosPercentage + '%,' +  this.color + ' ' + startPosPercentage + '% ' + endPosPercentage + '%,' + '#434655 ' + + endPosPercentage + '%)';
		} else if (videoArray[activeVideo].startTrimmed) {
			this.div.style.background = videoArray[activeVideo].div.style.background = 'linear-gradient(90deg, #434655 ' + startPosPercentage + '%,' +  this.color + ' ' + ' 0%)';
		} else if (videoArray[activeVideo].endTrimmed) {
			this.div.style.background = 'linear-gradient(90deg,' + '#3a69c6' + ' ' + endPosPercentage + '%' + ', #434655 0%)';
		} else {
			this.div.style.background = this.color;
		}
	
	}

	setRatioLength(ratio) {
		this.ratio = ratio.toFixed(2);
	}

	setPosition(pos) {
		this.position = pos;
	}

	setDiv(containerDiv, index) {
		this.div = document.createElement('div');
		this.div.classList.add('animation-div');
		this.div.style.background  = this.color;
		this.div.id = this.position;
		this.div.style.width = this.ratio - 0.5 + '%';
		this.div.style.position = 'relative';
		containerDiv.appendChild(this.div);
		this.addTrimSliders(containerDiv);
		/* this.div.addEventListener('click', this.handleClick.bind(this)); */
		this.addName();
	}

	addName(){
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

	addTrimSliders(containerDiv){
		this.startSlider = document.createElement('input');
		this.startSlider.setAttribute('type','range');
		this.startSlider.style.position = 'absolute';
		this.startSlider.style.top = '50%';
		this.startSlider.style.width = '100%';
		this.startSlider.value = 0;
		this.startSlider.style.display = 'none';
		this.div.appendChild(this.startSlider); 
		this.startSlider.oninput = this.startSliderChange.bind(this)
		this.endSlider = document.createElement('input');
		this.endSlider.setAttribute('type','range');
		this.endSlider.style.position = 'absolute';
		this.endSlider.style.top = '50%';
		this.endSlider.style.width = '100%';
		this.endSlider.value = 100;
		this.endSlider.style.display = 'none';
		this.endSlider.oninput = this.endSliderChange.bind(this)
		this.div.appendChild(this.endSlider); 
	}

	startSliderChange(){
		let endPosPercentage = this.endPosition / this.length * 100;
		if (this.endTrimmed){
			if(this.endTrimmed && this.startSlider.value > endPosPercentage){
				this.startSlider.value = endPosPercentage;
			}else{
			this.div.style.background = 'linear-gradient(90deg, white ' + this.startSlider.value + '%,' + '#3a69c6 '  + this.startSlider.value + '% ' + endPosPercentage + '%,'+'#434655 '+ endPosPercentage + '%)';
			}
		}else{
			this.div.style.background = 'linear-gradient(90deg, white ' + this.startSlider.value + '%,' + '#3a69c6' + ' 0%)';
		}
		
	}
	endSliderChange(){
		let startPosPercentage = this.startPosition / this.length * 100;
		if (this.startTrimmed){
			if(this.endSlider.value < (startPosPercentage)){
				this.endSlider.value = startPosPercentage;
			}else{
				this.div.style.background = 'linear-gradient(90deg,'+ '#434655 '+ startPosPercentage + '%, '+ '#3a69c6 '+ startPosPercentage +'% '+(this.endSlider.value) + '%' + ', white '+ this.endSlider.value + '%)' ;
			}
		}else{
			this.div.style.background = 'linear-gradient(90deg,' + '#3a69c6' + ' '+(this.endSlider.value) + '%' + ', white 0%)' ;
		}
		
	}

	showStartSlider(){
		this.startSlider.style.display = 'block';
	}

	showEndSlider(){
		this.endSlider.style.display = 'block';
	}

	hideStartSlider(){
		this.startSlider.style.display = 'none';
	}

	hideEndSlider(){
		this.endSlider.style.display = 'none';
	}

	addFilter(filterName) {
		this.filterArray.push(filterName);
	}

	removeFilter(filterName) {
		this.filterArray = this.filterArray.filter(filter => filter !== filterName);
	}

	addEffect(effectName) {
		this.effectArray.push(effectName);
	}

	removeEffect(effectName) {
		this.effectArray = this.effectArray.filter(effect => effect !== effectName);
	}

	handleClick() {
		/* pauseVideo();
		videoCurrent.src = this.urlSource;
		activeVideo = this.position;
		slider.value = rangeDuration[this.position][0] / total * 100;
		console.log(slider.value) */
	}

	setStartPosition(position) {
		this.startPosition =  position;
		this.startTrimmed = true;
	}

	setEndPosition(position) {
		this.endPosition = position;
		this.endTrimmed = true;
	}

	changeLengthBy(trimedLength) {
		/* this.length = this.length - trimedLength; */
	}

}

