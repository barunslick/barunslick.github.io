let sx, sy, cx, cy, scaleX, scaleY, width, height;

export function getBackgroundTop() {
	sx = 0;
	sy = 0;
	cx = 0;
	cy = 0;
	width = 144;
	height = 256;
	return [sx, sy, width, height, cx, cy, width * SCALE_FACTOR, height * SCALE_FACTOR];
};

export function getBackgroundBottom() {
	sx = 292;
	sy = 0;
	cx = 0;
	cy = 600;
	width = 168;
	height = 56;
	return [sx, sy, width, height, cx, cy, width * SCALE_FACTOR, height * SCALE_FACTOR];
};

export function getBird() {
	sx = 3;
	sy = 491;
	width = 17;
	height = 12;
	return [sx, sy, width, height];
};

export function getWelcome() {
	sx = 295;
	sy = 58;
	cx = 80;
	cy = 150;
	width = 92;
	height = 25;
	return [sx, sy, width, height, cx, cy, width * SCALE_FACTOR, height * SCALE_FACTOR];
};

export function getTapToStart() {
	sx = 292;
	sy = 91;
	cx = 130;
	cy = 270;
	width = 57;
	height = 48;
	return [sx, sy, width, height, cx, cy, width * SCALE_FACTOR, height * SCALE_FACTOR];
};

export function getObstaclesTop() {
	sx = 56;
	sy = 323;
	width = 26;
	height = 160;
	return [sx, sy, width, height];
};

export function getObstaclesBottom() {
	sx = 84;
	sy = 323;
	width = 26;
	height = 160;
	return [sx, sy, width, height];
};

export function gameOver() {
	sx = 395;
	sy = 59;
	cx = 80;
	cy = 150;
	width = 96;
	height = 21;
	return [sx, sy, width, height, cx, cy, width * SCALE_FACTOR, height * SCALE_FACTOR];
};
export function gameMedal() {
	sx = 3;
	sy = 259;
	cx = 55;
	cy = 250;
	width = 113;
	height = 57;
	return [sx, sy, width, height, cx, cy, width * SCALE_FACTOR, height * SCALE_FACTOR];

};

export function play() {
	sx = 354;
	sy = 118;
	cx = 55;
	cy = 450;
	width = 112;
	height = 29;
	return [sx, sy, width, height, cx, cy, width * SCALE_FACTOR, height * SCALE_FACTOR];
};

export function getNumbers() {
	var numArray = []
	numArray.push([138, 323, 6, 7]); //numbers were not in looping order so , manutally entering them
	numArray.push([141, 332, 3, 7]);
	numArray.push([138, 349, 6, 7]);
	numArray.push([138, 358, 6, 7]);
	numArray.push([138, 375, 6, 7]);
	numArray.push([138, 384, 6, 7]);
	numArray.push([138, 401, 6, 7]);
	numArray.push([138, 410, 6, 7]);
	numArray.push([138, 427, 6, 7]);
	numArray.push([138, 436, 6, 7]);
	return numArray;
};