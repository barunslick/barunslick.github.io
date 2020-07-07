class Video {
	constructor(src, length , pos) {
		this.urlSource = src;
		this.length = length;
		this.position = pos;
		this.filterArray = [];
		this.effectArray =[]
	}

	setRatioLength(ratio){
		this.ratio = ratio.toFixed(2);
	}

	setPosition(pos){
		this.position = pos;
	}

	setDiv(containerDiv, index){
		this.div = document.createElement('div');
		this.div.classList.add('animation-div');
		if(index % 2 == 0){
			this.div.classList.add('even-animation-div');
		}else{
			this.div.classList.add('odd-animation-div');
		}
		this.div.id = this.position;
		this.div.style.width = this.ratio -0.4 + '%';
		containerDiv.appendChild(this.div);
		this.div.addEventListener('click', this.handleClick.bind(this));
	}

	addFilter(filterName){
		this.filterArray.push(filterName);
	}

	removeFilter(filterName){
		this.filterArray = this.filterArray.filter(filter => filter !== filterName);
	}

	addEffect(effectName){
		this.effectArray.push(effectName);
	}

	removeEffect(effectName){
		this.effectArray = this.effectArray.filter(effect => effect !== effectName);
	}

	handleClick(){
		/* pauseVideo();
		videoCurrent.src = this.urlSource;
		activeVideo = this.position;
		slider.value = rangeDuration[this.position][0] / total * 100;
		console.log(slider.value) */
	}
}

