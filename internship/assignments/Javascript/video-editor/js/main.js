let total;
let rangeDuration;
let videoLengthRatio;

let fileNameDiv = document.querySelector('.main-container .effects-filters .current-filename');

/**
 * Responsible for setting up the necessary divs in animation pane
 * @returns {undefinded}
 */
function main() {
	total = getTotal();
	loadVideo(videoArray, videoList);
	videoLengthRatio = seekRatio(videoArray, total);
	setRatio();
	setDivs();
	rangeDuration = findRanges();
	fileNameDiv.innerHTML = videoArray[activeVideo].fileName;
	videoArray[activeVideo].changeColor();
	//testText = new Text();
	return;
}

/**
 * Calculates the total time of videos
 * @returns {Number} Total duration of videos in seconds 
 */
function getTotal() {
	total = 0;
	for (let index = 0; index < videoArray.length; index++) {
		total += videoArray[index].length;
	}
	return total;
}

/**
 * Calculates the ratio of video lengths
 * @returns {Array} Array of ratios of videos to the total length
 */
function seekRatio() {
	let totalRatio = []
	for (let index = 0; index < videoArray.length; index++) {
		let ratio = videoArray[index].length / total * 100;
		totalRatio.push(ratio);
	}
	return totalRatio;
}

/**
 * adds ratio to Video Objects
 *@returns {undefined}
 */
function setRatio() {
	for (let index = 0; index < videoArray.length; index++) {
		videoArray[index].setRatioLength(videoLengthRatio[index]);
	}
	return;
}

/**
 * Adds the Div in video section of animation pane
 * @returns {undefined}
 */
function setDivs() {
	let animationDiv = document.querySelector('.timeline .video-pane');
	for (let index = 0; index < videoArray.length; index++) {
		videoArray[index].setDiv(animationDiv, index);
	}
	return;
}

/**
 * Calculates the ranges of video lengths like [[0,4], [4,8]]
 * @returns {Array} Array of array of ranges of video lengths
 */
function findRanges() {
	let arr = [];
	let prev = 0;
	for (let index = 0; index < videoArray.length; index++) {
		arr.push([prev, prev + parseFloat(videoArray[index].ratio)]);
		prev = prev + parseFloat(videoArray[index].ratio);
	}
	return arr;
}

