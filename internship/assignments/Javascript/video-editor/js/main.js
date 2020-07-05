let videoLengthRatio;
function main() {
	videoLengthRatio = seekRatio(videoArray);
	setRatio(videoLengthRatio);
	setDivs(videoArray);
}

function seekRatio(videoArray) {
	let total = 0;
	let totalRatio = []
	for (let index = 0; index < videoArray.length; index++) {
		total += videoArray[index].length;
	}
	for (let index = 0; index < videoArray.length; index++) {
		let ratio = videoArray[index].length / total * 100;
		totalRatio.push(ratio);
	}
	return totalRatio;
}

function setRatio(videoLengthRatio) {
	for (let index = 0; index < videoArray.length; index++) {
		videoArray[index].setRatioLength(videoLengthRatio[index]);
	}
}

function setDivs(videoArray){
	let animationDiv = document.querySelector('.timeline .video-pane');
	for (let index = 0; index < videoArray.length; index++) {
		let div = document.createElement('div');
		div.classList.add('animation-div');
		if(index % 2 == 0){
			div.classList.add('even-animation-div');
		}else{
			div.classList.add('odd-animation-div');
		}
		div.style.width = videoArray[index].ratio -0.4 + '%';
		animationDiv.appendChild(div)
	}
}
