let finalCanvas = document.querySelector('.video-all .all-video-holder canvas');
let finalCanvasCtx = finalCanvas.getContext('2d');

let tmpCanvas = document.createElement('canvas');
let tmpCanvasCtx = tmpCanvas.getContext('2d');

videoCurrent.addEventListener('play', timerCallback);

function timerCallback(){
    if (videoCurrent.paused) return;
    tmpCanvas.setAttribute('width', videoCurrent.videoWidth);
    tmpCanvas.setAttribute('height', videoCurrent.videoHeight);
    finalCanvas.setAttribute('width', videoCurrent.videoWidth);
    finalCanvas.setAttribute('height', videoCurrent.videoHeight);
    computeFrame();
    setTimeout(function() {
        timerCallback();
      }, 24);
}

function computeFrame(videoWidth, videoHeight){
    tmpCanvasCtx.drawImage(videoCurrent, 0, 0, videoCurrent.videoWidth, videoCurrent.videoHeight);
    let frame = tmpCanvasCtx.getImageData(0, 0, videoCurrent.videoWidth, videoCurrent.videoHeight);
    finalCanvasCtx.putImageData(frame,0,0);
    return;
}