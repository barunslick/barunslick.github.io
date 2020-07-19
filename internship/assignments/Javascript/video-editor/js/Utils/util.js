/**
 * Check if number lies between ceratin range (inclusive)
 * @param {Number} num Number to check
 * @param {Number} min Minimum of range
 * @param {Number} max Maximum of range
 * @returns
 */
function inBetween(num, min, max) {
	if (num >= min && num <= max) {
		return true;
	}
	return false;
}

/**
 * Change given seconds into Hour:Minute:Seconds format
 * @param {Number} time Time in seconds
 * @returns {String} Time in desired format
 */
function secondsToHms(time) {
	time = Number(time);
	let h = Math.floor(time / 3600);
	let m = Math.floor(time % 3600 / 60);
	let s = Math.floor(time % 3600 % 60);
	let final = h + ':' + m + ':' + s;

	return final;
}

/**
 * Converts the current slider value into new range value based on length of video its currently on.
 * Handy function taken from p5js
 * @param {Number} sliderValue Value of slider from 0 to 100
 * @param {Number} start1 Left Range of slider ie. 0
 * @param {Number} stop1 Right Range of slider ie. 100
 * @param {Number} start2 New Start Range
 * @param {Number} stop2 New End Range
 * @returns {Number} New value based on given new ranges
 */
function p5map(sliderValue, start1, stop1, start2, stop2) {
	return ((sliderValue - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};