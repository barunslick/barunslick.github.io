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
	}

}