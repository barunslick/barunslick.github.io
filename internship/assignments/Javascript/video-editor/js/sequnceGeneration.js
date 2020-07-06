let finalCanvas = document.querySelector('.video-all .all-video-holder canvas');
let finalCanvasCtx = finalCanvas.getContext('2d');

let tmpCanvas = document.createElement('canvas');
let tmpCanvasCtx = tmpCanvas.getContext('2d');

videoCurrent.addEventListener('play', timerCallback);

function timerCallback(){
    if (videoCurrent.paused || videoCurrent.ended) return;
    tmpCanvas.setAttribute('width', videoCurrent.videoWidth);
    tmpCanvas.setAttribute('height', videoCurrent.videoHeight);
    finalCanvas.setAttribute('width', videoCurrent.videoWidth);
    finalCanvas.setAttribute('height', videoCurrent.videoHeight);
    computeFrame();
    setTimeout(function() {
        timerCallback();
    }, 0);
}

function computeFrame(videoWidth, videoHeight){
    if (videoCurrent.videoWidth != 0 && videoCurrent.videoHeight!= 0){
        tmpCanvasCtx.drawImage(videoCurrent, 0, 0, videoCurrent.videoWidth, videoCurrent.videoHeight);
        let frame = tmpCanvasCtx.getImageData(0, 0, videoCurrent.videoWidth, videoCurrent.videoHeight);
        let filtersToApply = videoArray[activeVideo].filterArray;
        if (filtersToApply.length != 0){
            let modifiedFrame;
            for (let index = 0; index < filtersToApply.length; index++) {
                let filterFunction = determineFilter(filtersToApply[index]);
                modifiedFrame = filterFunction(frame);
            }
            finalCanvasCtx.putImageData(modifiedFrame || frame,0,0);
        }else{
            finalCanvasCtx.putImageData(frame,0,0);
        }
        return;
    }
}

function determineFilter(filterNumber){
    switch (filterNumber) {
        case 'blackAndWhite':
            return blackAndWhite;
            break;
        default:
            break;
    }
}