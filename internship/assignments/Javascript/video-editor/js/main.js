let videoLengthRatio;
let total; 
let rangeDuration;

function main(videoArray ,videoList) {
	total = getTotal(videoArray);
	loadVideo(videoArray, video_list);
	videoLengthRatio = seekRatio(videoArray ,total);
	setRatio(videoLengthRatio);
	setDivs(videoArray);
	rangeDuration = findRanges(videoArray);
}

function getTotal(videoArray){
	total = 0;
	for (let index = 0; index < videoArray.length; index++) {
		total += videoArray[index].length;
	}
	return total;
}

function seekRatio(videoArray, total) {
	let totalRatio = []
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

function findRanges(videoArray){
	let arr = [];
	let prev = 0;
	for (let index = 0; index < videoArray.length; index++) {
		arr.push([prev, prev + parseFloat(videoArray[index].ratio)]);
		prev = parseFloat(videoArray[index].ratio);
	}
	return arr;
}
