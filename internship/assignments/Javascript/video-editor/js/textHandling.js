let activeText = null;

function updateIndex(){
    if (textArray.length == 1){
        textArray[0].setPosition(0);
        return
    }
    for (let index = 0; textArray <= textArray.length; index++) {
        textArray[index].setPosition(index);
    }
}

function  moveCurrentTimeToTextLocation(position, right){
    slider.value = right ? textRangeDuration[position][1] - 0.1 : textRangeDuration[position][0] + 0.1;
    changeTimerOnSlide();
    changeVideoTimeBySlider();
	changeAudioTimeBySlider()
	changeTextBySlider();
}
