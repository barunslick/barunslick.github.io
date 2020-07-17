class Text {

    constructor(position) {
        this.addDiv();
        this.active = false;
        this.resizing = false;
        this.paneDivResizingRight = false;
        this.paneDivResizingleft = false;
        this.range;
        this.color = '#3a69c6';
        this.addPaneDiv();
        this.addEventListenerSliding();
        this.addSideButttons();
        this.showStrechEvent();
        this.position = position;
        this.oldMousePos = 0;
        this.bold = false;
        this.italics = false;
        this.underline = false;
        this.textFontSize = 12;
    }

    addPaneDiv() {
        let containerDiv = document.querySelector('.timeline .video-audio .text-pane');
        this.div = document.createElement('div');
        this.div.classList.add('text-pane-div');
        this.div.style.backgroundColor = this.color;
        this.width = MINIMUMTEXTTIME / total * 100;
        this.minimumWidth = (this.width - 0.5) * containerDiv.clientWidth/100;
        this.div.style.width = this.width - 0.5 + '%';
        this.div.style.position = 'absolute';
        let currentPosPercentage = currentGlobalTime / total * 100;
        this.div.style.left = currentPosPercentage / 100 * containerDiv.clientWidth + 'px';
        containerDiv.appendChild(this.div);
        this.range = [currentPosPercentage, currentPosPercentage + this.width]
        textRangeDuration.push(this.range);
        console.log(textRangeDuration)
    }

    addSideButttons() {
        this.leftStrech = document.createElement('div');
        this.leftStrech.classList.add('text-left-strech');
        this.leftStrech.style.display = 'none';
        this.div.appendChild(this.leftStrech);
        this.rightStrech = document.createElement('div');
        this.rightStrech.classList.add('text-right-strech');
        this.rightStrech.style.display = 'none';
        this.div.appendChild(this.rightStrech);
    }

    showStrechEvent() {
        let containerDiv = document.querySelector('.timeline .video-audio .text-pane');
        let direction;
        this.div.addEventListener('mouseenter', (e) => {
            this.leftStrech.style.display = 'block';
            this.rightStrech.style.display = 'block';
        });
        this.div.addEventListener('mouseleave', (e) => {
            if (!this.paneDivResizingRight || !this.paneDivResizingRight){
                this.leftStrech.style.display = 'none';
                this.rightStrech.style.display = 'none';
            }
        });

        this.leftStrech.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.oldMousePos = e.pageX;
            this.originalPaneDivWidth = parseFloat(getComputedStyle(this.div, null).getPropertyValue('width').replace('px', ''));
            this.originalPaneDivX = parseFloat(getComputedStyle(this.div, null).getPropertyValue('left').replace('px', ''));
            this.originalPaneDivMouseX = e.pageX;
            this.paneDivResizingLeft = true;
            window.addEventListener('mouseup', (e)=>{
                this.paneDivResizingLeft = false;
            });
            window.addEventListener('mousemove', (e)=>{
                if (this.paneDivResizingLeft) {
                    let tempLeft = this.originalPaneDivX + (e.pageX - this.originalPaneDivMouseX);
                    let tempWidth = this.originalPaneDivWidth - (e.pageX - this.originalPaneDivMouseX);
                    if (e.pageX < this.oldMousePos) {
                        direction = 'left'
                    } else if (e.pageX > this.oldMousePos) {
                        direction = 'right';
                    }else{
                        direction = null;
                    }
                    this.oldMousePos = e.pageX;
                    if (this.checkOverlapWhileStreching(tempWidth , tempLeft) == 'leftTouch' && direction == 'left'){
                        this.paneDivResizingLeft = false;
                    }
                    if (tempLeft > 0 && tempWidth >=  this.minimumWidth){
                        this.div.style.width = tempWidth  + 'px';
                        this.xOffsetDiv = tempLeft;
                        this.div.style.left = tempLeft + 'px';
                        this.changeRange();
                        moveCurrentTimeToTextLocation(this.position);
                    }
                }
                
            })
        })


        this.rightStrech.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.oldMousePos = e.pageX;
            this.originalPaneDivWidth = parseFloat(getComputedStyle(this.div, null).getPropertyValue('width').replace('px', ''));
            this.originalPaneDivX = parseFloat(getComputedStyle(this.div, null).getPropertyValue('left').replace('px', ''));
            this.originalPaneDivMouseX = e.pageX;
            this.paneDivResizingRight = true;
            window.addEventListener('mouseup', (e)=>{
                this.paneDivResizingRight = false;
            });
            window.addEventListener('mousemove', (e)=>{
                if (this.paneDivResizingRight) {
                    let width = this.originalPaneDivWidth + (e.clientX - this.originalPaneDivMouseX);
                    if (e.pageX < this.oldMousePos) {
                        direction = 'left'
                    } else if (e.pageX > this.oldMousePos) {
                        direction = 'right';
                    }else{
                        direction = null;
                    }
                    this.oldMousePos = e.pageX;
                    if (this.checkOverlapWhileStreching(width) == 'rightTouch' && direction == 'right'){
                        this.paneDivResizingRight = false;
                    }
                    if (this.originalPaneDivX + width < containerDiv.offsetWidth && width >= this.minimumWidth) {
                        this.div.style.width = width + 'px';
                        this.changeRange();
                        moveCurrentTimeToTextLocation(this.position, true);
                    }
                }
                
            })
            
        })
    }

    checkOverlapWhileStreching(width , tempLeft){
        let containerDivPane = document.querySelector('.timeline .video-audio .text-pane');
        let left = (tempLeft || this.originalPaneDivX)/ containerDivPane.clientWidth * 100;
        let right = left + (width)/ containerDivPane.clientWidth * 100;
        for (let index = 0; index < textRangeDuration.length; index++) {
            if (index == this.position) continue;
            console.log(left,right , textRangeDuration[index][0],textRangeDuration[index][1])
            if (left <= textRangeDuration[index][1]-0.5 && right >= textRangeDuration[index][0]-0.5){
                console.log('right')
                return 'rightTouch';
            }
            if (left >= textRangeDuration[index][1] && (left - textRangeDuration[index][1]) <= 0.5){
                console.log('left')
                return 'leftTouch';
            }
        }
        return false;
    }





    addEventListenerSliding() {
        this.currentXDiv = 0;
        this.initialXDiv;
        this.xOffsetDiv = parseFloat(getComputedStyle(this.div, null).getPropertyValue('left').replace('px', ''));
        let containerDivPane = document.querySelector('.timeline .video-audio .text-pane');
        let checker = true;
        let direction;
        this.div.addEventListener('mousedown', (e) => {
            pauseVideo();
            e.preventDefault();
            moveCurrentTimeToTextLocation(this.position);
            textCustomizationDiv.style.display = 'block';
            this.oldMousePos = e.pageX;
            this.initialXDiv = e.clientX - this.xOffsetDiv;
            if (e.target == this.div) {
                this.activeDiv = true;
            }
            window.addEventListener('mouseup', (e) => {
                this.initialXDiv = this.currentXDiv;
                this.activeDiv = false;
                textCustomizationDiv.style.display = 'block';
            });
            window.addEventListener('mousemove', (e) => {
                if (this.activeDiv) {
                    if (e.pageX < this.oldMousePos) {
                        direction = 'left'
                    } else if (e.pageX > this.oldMousePos) {
                        direction = 'right';
                    }else{
                        direction = null;
                    }
                    this.oldMousePos = e.pageX;
                    checker = this.checkOverlap();
                    if ((checker[0] == 'rightTouch' && direction == 'right')){
                        this.activeDiv = false;
                    }else if ((checker[0] == 'leftTouch' && direction == 'left')){ 
                        this.activeDiv = false;
                    }else{
                        this.currentXDiv = e.clientX - this.initialXDiv;
                    }
                    if (!checker && this.activeDiv){
                        if (this.currentXDiv > 0 && this.currentXDiv + this.div.clientWidth <= containerDivPane.clientWidth) {
                            this.xOffsetDiv = this.currentXDiv;
                            this.div.style.left = this.currentXDiv + 'px';

                        } else if (this.currentXDiv + this.div.clientWidth >= containerDivPane.clientWidth) {
                            this.currentXDiv = containerDivPane.clientWidth - this.div.clientWidth;
                        } else {
                            this.currentXDiv = 0;
                            this.xOffsetDiv = this.currentXDiv;
                            this.div.style.left = this.currentXDiv + 'px';
                        }
                        this.changeRange();
                        changeTextBySlider();
                        moveCurrentTimeToTextLocation(this.position);
                    }
                }
            });
        });
    }

    changeRange(){
        let containerDivPane = document.querySelector('.timeline .video-audio .text-pane');
        let rangeDurationText = textRangeDuration[this.position];
		rangeDurationText[0] = this.xOffsetDiv/ containerDivPane.clientWidth * 100;
		rangeDurationText[1] = (this.xOffsetDiv+ this.div.clientWidth)/ containerDivPane.clientWidth * 100;
        textRangeDuration[this.position] = rangeDurationText;
    }

    checkOverlap(){
        let containerDivPane = document.querySelector('.timeline .video-audio .text-pane');
        let left = this.currentXDiv/ containerDivPane.clientWidth * 100;
        let right = (this.currentXDiv + this.div.clientWidth)/ containerDivPane.clientWidth * 100;
        for (let index = 0; index < textRangeDuration.length; index++) {
            if (index == this.position) continue;
            if (left <= textRangeDuration[index][1]-0.5 && right >= textRangeDuration[index][0]-0.5){
                console.log('righTouch')
                return ['rightTouch', index];
            }
            if (left >= textRangeDuration[index][1] && (left - textRangeDuration[index][1]) <= 0.5){
                console.log('leftTouch')
                return ['leftTouch', index];
            }
        }
        return false;
    }

    addDiv() {
        this.containerDiv = document.querySelector('.video-all .all-video-holder');
        this.textDiv = document.createElement('div');
        this.textDiv.classList.add('text-div');
        this.textDiv.style.top = '0px';
        this.textArea = document.createElement('textarea');
        this.textArea.classList.add('inside-text-area');
        this.textArea.placeholder = 'Text';
        this.textArea.spellcheck = false;
        this.textArea.style.fontSize = this.textFontSize + 'px';
        this.textDiv.appendChild(this.textArea);
        this.containerDiv.appendChild(this.textDiv);
        this.addControlButtons();
        this.addEventListeners();
    }
    addControlButtons() {
        this.removeDiv = document.createElement('div');
        this.removeDiv.classList.add('remove-text-btn');
        this.xText = document.createElement('p');
        this.xText.innerText = '-';
        this.removeDiv.appendChild(this.xText);
        this.textDiv.appendChild(this.removeDiv);

        this.resizeDiv = document.createElement('div');
        this.resizeDiv.classList.add('resize-text-btn');
        this.rText = document.createElement('p');
        this.rText.innerText = '+';
        this.resizeDiv.appendChild(this.rText);
        this.textDiv.appendChild(this.resizeDiv);
    }

    addEventListeners() {
        this.xOffset = 0;
        this.yOffset = 0;
        this.textDiv.addEventListener('mousedown', (e) => {
            activeText = this.position;
            this.initialX = e.clientX - this.xOffset;
            this.initialY = e.clientY - this.yOffset;
            fontSizeInputField.value = this.textFontSize;
            if (e.target == this.textDiv || e.target == this.textArea) {
                this.active = true;
                window.addEventListener('mouseup', (e) => {
                    this.initialX = this.currentX;
                    this.initialY = this.currentY;
                    this.active = false;
                });
                window.addEventListener('mousemove', (e) => {
                    if (this.active) {
                        this.currentX = e.clientX - this.initialX;
                        this.currentY = e.clientY - this.initialY;

                        if (this.currentX <= 0) {
                            this.currentX = 0;
                        } else if (this.currentX + this.textDiv.offsetWidth >= this.containerDiv.offsetWidth) {
                            this.currentX = this.containerDiv.offsetWidth - this.textDiv.offsetWidth;
                        }

                        if (this.currentY <= 0) {
                            this.currentY = 0;
                        } else if (this.currentY + this.textDiv.offsetHeight >= this.containerDiv.offsetHeight) {
                            this.currentY = this.containerDiv.offsetHeight - this.textDiv.offsetHeight;
                        }

                        this.xOffset = this.currentX;
                        this.yOffset = this.currentY;
                        this.textDiv.style.top = this.currentY + 'px';
                        this.textDiv.style.left = this.currentX + 'px';
                    }
                });
            }
        });

        this.removeDiv.addEventListener('click', _ => {
            this.textDiv.style.display = 'none';
            this.div.style.display = 'none';
            textArray.splice(this.position,1);
            console.log(textArray, 'here')
            textRangeDuration.splice(this.position,1);
            console.log(textRangeDuration, ' check herer')
            updateIndex();
        });

        this.resizeDiv.addEventListener('mousedown', (e) => {
            activeText = this.position;
            if (e.target == this.resizeDiv || e.target == this.rText) {
                this.originalWidth = parseFloat(getComputedStyle(this.textDiv, null).getPropertyValue('width').replace('px', ''));
                this.originalHeight = parseFloat(getComputedStyle(this.textDiv, null).getPropertyValue('height').replace('px', ''));
                this.originalX = parseFloat(getComputedStyle(this.div, null).getPropertyValue('left').replace('px', ''));
                this.originalY = parseFloat(getComputedStyle(this.div, null).getPropertyValue('top').replace('px', ''));
                this.originalMouseX = e.pageX;
                this.originalMouseY = e.pageY;
                this.resizing = true;
                window.addEventListener('mouseup', (e) => {
                    this.resizing = false;
                });
                window.addEventListener('mousemove', (e) => {
                    if (this.resizing) {
                        let width = this.originalWidth + (e.clientX - this.originalMouseX);
                        let height = this.originalHeight + (e.clientY - this.originalMouseY);
                        if (this.xOffset + width < this.containerDiv.offsetWidth && this.yOffset + height < this.containerDiv.offsetHeight) {
                            this.textDiv.style.height = height + 'px';
                            this.textDiv.style.width = width + 'px';
                        }
                    }
                });
            }
        });
    }

    makeBold(){
        if (!this.bold){
            this.textArea.style.fontWeight = '800';
            this.bold = true;
        }else{
            this.textArea.style.fontWeight = '300';
            this.bold = false;
        }
    }
    makeItalics(){
        if (!this.italics){
            this.textArea.style.fontStyle = 'italic';
            this.italics = true;
        }else{
            this.textArea.style.fontStyle = 'normal';
            this.italics = false;
        }
    }
    makeUnderline(){
        if (!this.underline){
            this.textArea.style.textDecoration = 'underline';
            this.underline = true;
        }else{
            this.textArea.style.textDecoration = 'none';
            this.underline = false;
        }
    }

    colorText(color){
        this.textArea.style.color = color;
    }
    colorBackground(color){
        this.textArea.style.backgroundColor = color;
    }
    changeFontSize(fontSize){
        this.textFontSize = fontSize;
        this.textArea.style.fontSize = fontSize + 'px';
    }
    changeColor() {
		if (this.color !== '#3a69c6'){
			this.color = '#3a69c6';
			this.div.style.background = this.color;
		}
	}
	resetColor() {
        if (this.color != '#1c3c77'){
            this.color = '#1c3c77';
            this.div.style.background = this.color;
        }
    }
    
    hideTextArea(){
        this.textDiv.style.display = 'none';
    }

    showTextArea(){
        this.textDiv.style.display = 'block';
        this.textDiv.style.border = ' 2px dotted white';
        this.resizeDiv.style.display = 'block';
        this.removeDiv.style.display = 'block';
    }
    showWhilePlaying(){
        this.textDiv.style.display = 'block';
        this.textDiv.style.border = 'none';
        this.resizeDiv.style.display = 'none';
        this.removeDiv.style.display = 'none';
    }

    setPosition(index){
        this.position = index;
    }
}
