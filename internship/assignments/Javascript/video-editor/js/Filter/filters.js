/**
 * Change the color of current frame pixels to grey
 * @param {Array} frame Current frame array from video element
 * @returns {Array} Frame after changing the color to grey
 */
function blackAndWhite(frame) {
	let returnFrame = frame
	let l = frame.data.length / 4;
	for (let i = 0; i < l; i++) {
		let grey = (returnFrame.data[i * 4 + 0] + returnFrame.data[i * 4 + 1] + returnFrame.data[i * 4 + 2]) / 3;
		returnFrame.data[i * 4 + 0] = grey;
		returnFrame.data[i * 4 + 1] = grey;
		returnFrame.data[i * 4 + 2] = grey;
		returnFrame.data[i * 4 + 3] = 255;
	}

	return returnFrame;
}