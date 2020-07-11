class Video {
	constructor(src, length, pos) {
		this.urlSource = src;
		this.length = length;
		this.position = pos;
		this.filterArray = [];
		this.effectArray = [];
		this.trimmed = false;
		this.startPosition = 0;
		this.endPosition = this.length;
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
		if (index == 0) {
			this.div.classList.add('even-animation-div');
		} else {
			this.div.classList.add('odd-animation-div');
		}
		this.div.id = this.position;
		this.div.style.width = this.ratio - 0.3 + '%';
		this.div.style.position = 'relative';
		containerDiv.appendChild(this.div);
		this.addTrimSliders(containerDiv);
		this.div.addEventListener('click', this.handleClick.bind(this));
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
		this.div.style.background = 'linear-gradient(90deg, white ' + this.startSlider.value + '%,' + '#3a69c6' + ' 0%)';
	}
	endSliderChange(){
		this.div.style.background = 'linear-gradient(90deg,' + '#3a69c6' + ' '+(this.endSlider.value) + '%' + ', white 0%)' ;
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
		this.startPosition = this.startPosition + position;
		this.trimmed = true;
	}

	setEndPosition(position) {
		this.endPosition = this.endPosition - position;
		this.trimmed = true;
	}

	changeLengthBy(trimedLength) {
		this.length = this.length - trimedLength;
	}

}

