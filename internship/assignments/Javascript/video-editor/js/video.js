class Video {
	constructor(src, length ,ref, pos) {
		this.urlSource = src;
		this.length = length;
		this.ref = ref;
		this.setPosition(pos);
	}

	setRatioLength(ratio){
		this.ratio = ratio.toFixed(2);
	}
	setPosition(pos){
		this.position = pos;
	}
}