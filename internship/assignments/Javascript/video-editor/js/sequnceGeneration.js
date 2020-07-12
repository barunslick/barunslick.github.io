let finalCanvas = document.querySelector('.video-all .all-video-holder canvas');
let finalCanvasCtx = finalCanvas.getContext('2d');

let tmpCanvas = document.createElement('canvas');
let tmpCanvasCtx = tmpCanvas.getContext('2d');

videoCurrent.addEventListener('play', timerCallback);

function timerCallback() {
	if (videoCurrent.paused || videoCurrent.ended) return;
	setCanvasDimension();
	computeFrame();
	setTimeout(function () {
		timerCallback();
	}, 0);
}

function setCanvasDimension() {
	tmpCanvas.setAttribute('width', videoCurrent.videoWidth);
	tmpCanvas.setAttribute('height', videoCurrent.videoHeight);
	finalCanvas.setAttribute('width', videoCurrent.videoWidth);
	finalCanvas.setAttribute('height', videoCurrent.videoHeight);
}


function computeFrame() {
	if (videoCurrent.videoWidth != 0 && videoCurrent.videoHeight != 0) {
		tmpCanvasCtx.drawImage(videoCurrent, 0, 0, videoCurrent.videoWidth, videoCurrent.videoHeight);
		let frame = tmpCanvasCtx.getImageData(0, 0, videoCurrent.videoWidth, videoCurrent.videoHeight);
		if (videoCurrent.currentTime > videoArray[activeVideo].startPosition && videoCurrent.currentTime < videoArray[activeVideo].endPosition) {
			let filtersToApply = videoArray[activeVideo].filterArray;
			let modifiedFrame = frame;
			if (filtersToApply.length != 0) {
				modifiedFrame = getFrameAfterFiler(filtersToApply, modifiedFrame);
			}

			let effectsToApply = videoArray[activeVideo].effectArray;

			if (effectsToApply.length != 0) {
				modifiedFrame = getFrameAfterEffects(effectsToApply, modifiedFrame)
			}
			finalCanvasCtx.putImageData(modifiedFrame, 0, 0);

			return;
		}
	}
}

//getting final frame after all the filters are applied
function getFrameAfterFiler(filtersToApply, modifiedFrame) {
	for (let index = 0; index < filtersToApply.length; index++) {
		let filterFunction = determineFilter(filtersToApply[index]);
		modifiedFrame = filterFunction(modifiedFrame);
	}

	return modifiedFrame;
}

//getting final frame after all the effects are applied
function getFrameAfterEffects(effectsToApply, modifiedFrame) {
	for (let index = 0; index < effectsToApply.length; index++) {
		let effectFunction = determineEffect(effectsToApply[index]);
		if (!effectFunction) {
			continue;
		}
		modifiedFrame = effectFunction(modifiedFrame);
	}

	return modifiedFrame;
}



function determineFilter(filterNumber) {
	switch (filterNumber) {
		case 'blackAndWhite':
			return blackAndWhite;
			break;
		default:
			break;
	}
}

function determineEffect(effectNumber) {
	switch (effectNumber) {
		case 'fadeIn':
			if (videoCurrent.currentTime < ((FADEINRANGE * videoArray[activeVideo].length) + videoArray[activeVideo].startPosition)) {
				return fadeIn;
			} else {
				return null;
			}
			break;
		case 'fadeOut':
			if (videoCurrent.currentTime > (FADEOUTRANGE * videoArray[activeVideo].endPosition) && videoCurrent.currentTime < videoArray[activeVideo].endPosition) {
				console.log('here')
				return fadeOut;
			} else {
				return null;
			}
			break;
		default:
			break;
	}
}