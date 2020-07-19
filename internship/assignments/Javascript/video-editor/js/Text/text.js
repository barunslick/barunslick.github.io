class Text {

  constructor(position) {
    this.addDiv();
    this.active = false;
    this.resizing = false;
    this.paneDivResizingRight = false;
    this.paneDivResizingleft = false;
    this.range;
    this.color = ACTIVECOLOR;
    this.addPaneDiv();
    this.addEventListenerSliding();
    this.addSideButttons();
    this.addStrechEvent();
    this.position = position;
    this.oldMousePos = 0;
    this.bold = false;
    this.italics = false;
    this.underline = false;
    this.textFontSize = 12;
  }

  /**
 * Add text div in animation pane.
 * @memberof Text
 */
  addPaneDiv() {
    this.containerDivAnimationPane = document.querySelector('.timeline .video-audio .text-pane');
    this.div = document.createElement('div');
    this.div.classList.add('text-pane-div');
    this.div.style.backgroundColor = this.color;
    this.width = MINIMUMTEXTTIME / total * 100;
    this.minimumWidth = (this.width - 0.5) * this.containerDivAnimationPane.clientWidth / 100;
    this.div.style.width = this.width - 0.5 + '%';
    this.div.style.position = 'absolute';
    let currentPosPercentage = currentGlobalTime / total * 100;
    this.div.style.left = currentPosPercentage / 100 * this.containerDivAnimationPane.clientWidth + 'px';
    this.containerDivAnimationPane.appendChild(this.div);
    this.range = [currentPosPercentage, currentPosPercentage + this.width]
    textRangeDuration.push(this.range);
  }

  /**
 * Add Side buttins for increasing length time for texts.
 * @memberof Text
 */
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

  /**
   * Add event listeners that allow for streching time that text is shown. i.e it's display time/ length. 
   * @memberof Text
   */
  addStrechEvent() {
    this.direction;

    this.div.addEventListener('mouseenter', (e) => {
      this.leftStrech.style.display = 'block';
      this.rightStrech.style.display = 'block';
    });

    this.div.addEventListener('mouseleave', (e) => {
      if (!this.paneDivResizingRight || !this.paneDivResizingRight) {
        this.leftStrech.style.display = 'none';
        this.rightStrech.style.display = 'none';
      }
    });

    this.leftStrech.addEventListener('mousedown', (e) => this.leftStrechMouseDown(e));

    this.rightStrech.addEventListener('mousedown', (e) => this.rightStrechMouseDown(e));
  }

  /**
   * Increase the div length and range when streching left.
   * @param {Event} e Mouse down event for left strech button
   * @memberof Text
   */
  leftStrechMouseDown(e) {
    e.preventDefault();
    this.oldMousePos = e.pageX;
    this.originalPaneDivWidth = parseFloat(getComputedStyle(this.div, null).getPropertyValue('width').replace('px', ''));
    this.originalPaneDivX = parseFloat(getComputedStyle(this.div, null).getPropertyValue('left').replace('px', ''));
    this.originalPaneDivMouseX = e.pageX;
    this.paneDivResizingLeft = true;

    window.addEventListener('mouseup', (e) => {
      this.paneDivResizingLeft = false;
    });

    window.addEventListener('mousemove', (e) => this.leftStrechMouseMove(e));
  }

  /**
   * Increase the div length and range when streching right.
   * @param {Event} e Mouse down event for right strech button
   * @memberof Text
   */
  rightStrechMouseDown(e) {
    e.preventDefault();
    this.oldMousePos = e.pageX;
    this.originalPaneDivWidth = parseFloat(getComputedStyle(this.div, null).getPropertyValue('width').replace('px', ''));
    this.originalPaneDivX = parseFloat(getComputedStyle(this.div, null).getPropertyValue('left').replace('px', ''));
    this.originalPaneDivMouseX = e.pageX;
    this.paneDivResizingRight = true;

    window.addEventListener('mouseup', (e) => {
      this.paneDivResizingRight = false;
    });

    window.addEventListener('mousemove', (e) => this.rightStrechMouseMove(e));
  }

  /**
   * Increase the with and range when streching left.
   * @param {Event} e Mouse move event on left strech button.
   * @memberof Text
   */
  leftStrechMouseMove(e) {
    if (this.paneDivResizingLeft) {
      let tempLeft = this.originalPaneDivX + (e.pageX - this.originalPaneDivMouseX);
      let tempWidth = this.originalPaneDivWidth - (e.pageX - this.originalPaneDivMouseX);
      if (e.pageX < this.oldMousePos) {
        this.direction = 'left'
      } else if (e.pageX > this.oldMousePos) {
        this.direction = 'right';
      } else {
        this.direction = null;
      }
      this.oldMousePos = e.pageX;
      if (this.checkOverlapWhileStreching(tempWidth, tempLeft) === 'leftTouch' && this.direction === 'left') {
        this.paneDivResizingLeft = false;
      }
      if (tempLeft > 0 && tempWidth >= this.minimumWidth) {
        this.div.style.width = tempWidth + 'px';
        this.xOffsetDiv = tempLeft;
        this.div.style.left = tempLeft + 'px';
        this.changeRange();
        moveCurrentTimeToTextLocation(this.position);
      }
    }

  }

  /**
   * Increase the with and range when streching right.
   * @param {Event} e Mouse move event on right strech button.
   * @memberof Text
   */
  rightStrechMouseMove(e) {
    if (this.paneDivResizingRight) {
      let width = this.originalPaneDivWidth + (e.clientX - this.originalPaneDivMouseX);
      if (e.pageX < this.oldMousePos) {
        this.direction = 'left'
      } else if (e.pageX > this.oldMousePos) {
        this.direction = 'right';
      } else {
        this.direction = null;
      }
      this.oldMousePos = e.pageX;
      if (this.checkOverlapWhileStreching(width) === 'rightTouch' && this.direction === 'right') {
        this.paneDivResizingRight = false;
      }
      if (this.originalPaneDivX + width < this.containerDivAnimationPane.offsetWidth && width >= this.minimumWidth) {
        this.div.style.width = width + 'px';
        this.changeRange();
        moveCurrentTimeToTextLocation(this.position, true);
      }
    }
  }

  /**
   * Checks if text div is overlaping with other divs when streching.
   * @param {Number} width New width after streching
   * @param {Number} tempLeft New value of left after streching
   * @returns {String} Whether it touches in left or right part when div is streched.
   * @memberof Text
   */
  checkOverlapWhileStreching(width, tempLeft) {
    let left = (tempLeft || this.originalPaneDivX) / this.containerDivAnimationPane.clientWidth * 100;
    let right = left + (width) / this.containerDivAnimationPane.clientWidth * 100;
    for (let index = 0; index < textRangeDuration.length; index++) {
      if (index === this.position) continue;
      if (left <= textRangeDuration[index][1] - 0.5 && right >= textRangeDuration[index][0] - 0.5) {
        return 'rightTouch';
      }
      if (left >= textRangeDuration[index][1] && (left - textRangeDuration[index][1]) <= 0.5) {
        return 'leftTouch';
      }
    }
    return false;
  }

  /**
 * Add the required event listeners when the div is slid.
 * @memberof Text
 */
  addEventListenerSliding() {
    this.currentXDiv = 0;
    this.initialXDiv;
    this.xOffsetDiv = parseFloat(getComputedStyle(this.div, null).getPropertyValue('left').replace('px', ''));
    this.checker = true;
    this.div.addEventListener('mousedown', (e) => this.slidingMouseDown(e));
  }

  /**
   * Initaites other events required for handling sliding of div.
   * @param {Event} e Mouse down event on text div on animaiotn pane.
   * @memberof Text
   */
  slidingMouseDown(e) {
    pauseVideo();
    e.preventDefault();
    moveCurrentTimeToTextLocation(this.position);
    textCustomizationDiv.style.display = 'block';
    if (e.target === this.div) {
      this.activeDiv = true;
      this.oldMousePos = e.pageX;
      this.initialXDiv = e.clientX - this.xOffsetDiv;
    }
    window.addEventListener('mouseup', (e) => {
      this.initialXDiv = this.currentXDiv;
      this.activeDiv = false;
      textCustomizationDiv.style.display = 'block';
    });
    window.addEventListener('mousemove', (e) => this.handleDivSlidingEvent(e));
  }

  /**
   *  Slide the repsective div of text in anitaion pane.
   * @param {Event} e Mouse Move event on animation pane div of text.
   * @memberof Text
   */
  handleDivSlidingEvent(e) {
    if (this.activeDiv) {
      if (e.pageX < this.oldMousePos) {
        this.direction = 'left'
      } else if (e.pageX > this.oldMousePos) {
        this.direction = 'right';
      } else {
        this.direction = null;
      }
      this.oldMousePos = e.pageX;
      this.checker = this.checkOverlap();
      if ((this.checker[0] === 'rightTouch' && this.direction === 'right')) {
        this.activeDiv = false;
      } else if ((this.checker[0] === 'leftTouch' && this.direction === 'left')) {
        this.activeDiv = false;
      } else {
        this.currentXDiv = e.clientX - this.initialXDiv;
      }
      if (!this.checker && this.activeDiv) {
        this.slideDiv();
      }
    }
  }

  /**
   * Performs the actual sliding of div of respective text in animation pane.
   * @memberof Text
   */
  slideDiv() {
    if (this.currentXDiv > 0 && this.currentXDiv + this.div.clientWidth <= this.containerDivAnimationPane.clientWidth) {
      this.xOffsetDiv = this.currentXDiv;
      this.div.style.left = this.currentXDiv + 'px';

    } else if (this.currentXDiv + this.div.clientWidth >= this.containerDivAnimationPane.clientWidth) {
      this.currentXDiv = this.containerDivAnimationPane.clientWidth - this.div.clientWidth;
    } else {
      this.currentXDiv = 0;
      this.xOffsetDiv = this.currentXDiv;
      this.div.style.left = this.currentXDiv + 'px';
    }

    this.changeRange();
    changeTextBySlider();
    moveCurrentTimeToTextLocation(this.position);
  }


  /**
 * Change the range duration global value whenever the div is slid and positioned in new position
 * @memberof Text
 */
  changeRange() {
    let containerDivPane = document.querySelector('.timeline .video-audio .text-pane');
    let rangeDurationText = textRangeDuration[this.position];
    rangeDurationText[0] = this.xOffsetDiv / containerDivPane.clientWidth * 100;
    rangeDurationText[1] = (this.xOffsetDiv + this.div.clientWidth) / containerDivPane.clientWidth * 100;
    textRangeDuration[this.position] = rangeDurationText;
  }

  /**
   * Checks if text div is overlaping with other divs, when sliding.
   * @returns {Array} When the div is touching other divs, it returns whether it is touching in right or left section and index of div that is touched.
   * @memberof Text
   */
  checkOverlap() {
    let containerDivPane = document.querySelector('.timeline .video-audio .text-pane');
    let left = this.currentXDiv / containerDivPane.clientWidth * 100;
    let right = (this.currentXDiv + this.div.clientWidth) / containerDivPane.clientWidth * 100;
    for (let index = 0; index < textRangeDuration.length; index++) {
      if (index === this.position) continue;
      if (left <= textRangeDuration[index][1] - 0.5 && right >= textRangeDuration[index][0] - 0.5) {
        return ['rightTouch', index];
      }
      if (left >= textRangeDuration[index][1] && (left - textRangeDuration[index][1]) <= 0.5) {
        return ['leftTouch', index];
      }
    }
    return false;
  }

  /**
   * Add text div that allows includes text area for entering text in canvas div.
   * @memberof Text
   */
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
    this.addEventListenersTextArea();
  }

  /**
   * Add resize and remove button for text input area.
   * @memberof Text
   */
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

  /**
 * Add the required event listeners for input text area, like sliding, resizind and removing.
 * @memberof Text
 */
  addEventListenersTextArea() {
    this.xOffset = 0;
    this.yOffset = 0;
    this.textDiv.addEventListener('mousedown', (e) => this.textDivMouseDown(e));

    this.removeDiv.addEventListener('click', _ => {
      this.textDiv.style.display = 'none';
      this.div.style.display = 'none';
      textArray.splice(this.position, 1);
      textRangeDuration.splice(this.position, 1);
      updateIndex();
    });

    this.resizeDiv.addEventListener('mousedown', (e) => this.resizeMouseDown(e));
  }

  /**
   * Initates other event handlers required when mouse down on text div.
   * @param {Event} e Mouse down event in text area div present in canvas.
   * @memberof Text
   */
  textDivMouseDown(e) {
    activeText = this.position;
    this.initialX = e.clientX - this.xOffset;
    this.initialY = e.clientY - this.yOffset;
    fontSizeInputField.value = this.textFontSize;
    if (e.target === this.textDiv || e.target === this.textArea) {
      this.active = true;
      window.addEventListener('mouseup', (e) => {
        this.initialX = this.currentX;
        this.initialY = this.currentY;
        this.active = false;
      });
      window.addEventListener('mousemove', (e) => this.textDivMouseMove(e));
    }
  }

  /**
   * Moves the text input div when mouse move occurs within the boundry of canvas.
   * @param {Event} e Mouse move event on text div present inside canvas.
   * @memberof Text
   */
  textDivMouseMove(e) {
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
  }

  /**
   * Initiate other event listeners required to reize the div.
   * @param {Event} e Mouse down Event on resize button on text input div.
   * @memberof Text
   */
  resizeMouseDown(e) {
    activeText = this.position;
    if (e.target === this.resizeDiv || e.target === this.rText) {
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
      window.addEventListener('mousemove', (e) => this.resizeMouseMoveEvent(e));
    }
  }

  /**
   * Perform the actual resizing of div when mouse move event over resize icon occurs.
   * @param {Event} e Mouse move Event on resize button on text input div.
   * @memberof Text
   */
  resizeMouseMoveEvent(e) {
    if (this.resizing) {
      let width = this.originalWidth + (e.clientX - this.originalMouseX);
      let height = this.originalHeight + (e.clientY - this.originalMouseY);
      if (this.xOffset + width < this.containerDiv.offsetWidth && this.yOffset + height < this.containerDiv.offsetHeight) {
        this.textDiv.style.height = height + 'px';
        this.textDiv.style.width = width + 'px';
      }
    }
  }

  /**
   * Change the style text to bold.
   * @memberof Text
   */
  makeBold() {
    if (!this.bold) {
      this.textArea.style.fontWeight = '800';
      this.bold = true;
    } else {
      this.textArea.style.fontWeight = '300';
      this.bold = false;
    }
  }

  /**
   * Change the font style to italics.
   * @memberof Text
   */
  makeItalics() {
    if (!this.italics) {
      this.textArea.style.fontStyle = 'italic';
      this.italics = true;
    } else {
      this.textArea.style.fontStyle = 'normal';
      this.italics = false;
    }
  }

  /**
   * Change the text decoration to underline.
   * @memberof Text
   */
  makeUnderline() {
    if (!this.underline) {
      this.textArea.style.textDecoration = 'underline';
      this.underline = true;
    } else {
      this.textArea.style.textDecoration = 'none';
      this.underline = false;
    }
  }

  /**
   * Change color of text area to desired color.
   * @param {String} color Desired new color
   * @memberof Text
   */
  colorText(color) {
    this.textArea.style.color = color;
  }

  /**
   * Change the background color of text Area.
   * @param {String} color Desired new color
   * @memberof Text
   */
  colorBackground(color) {
    this.textArea.style.backgroundColor = color;
  }

  /**
   * Change the font size of text Area.
   * @param {Number} fontSize Desired new color
   * @memberof Text
   */
  changeFontSize(fontSize) {
    this.textFontSize = fontSize;
    this.textArea.style.fontSize = fontSize + 'px';
  }

  /**
 * Change the color of div to active div color.
 * @memberof Text
 */
  changeColor() {
    if (this.color !== ACTIVECOLOR) {
      this.color = ACTIVECOLOR;
      this.div.style.background = this.color;
    }
  }

  /**
 * Change the color of div to inactive div color.
 * @memberof Audio
 */
  resetColor() {
    if (this.color !== INACTIVECOLOR) {
      this.color = INACTIVECOLOR;
      this.div.style.background = this.color;
    }
  }

  /**
   * Hide the text area.
   * @memberof Text
   */
  hideTextArea() {
    this.textDiv.style.display = 'none';
  }

  /**
   * Show the text area.
   * @memberof Text
   */
  showTextArea() {
    this.textDiv.style.display = 'block';
    this.textDiv.style.border = ' 2px dotted white';
    this.resizeDiv.style.display = 'block';
    this.removeDiv.style.display = 'block';
  }

  /**
   * Show only the text and hide borders and resize, remove icons when playing.
   * @memberof Text
   */
  showWhilePlaying() {
    this.textDiv.style.display = 'block';
    this.textDiv.style.border = 'none';
    this.resizeDiv.style.display = 'none';
    this.removeDiv.style.display = 'none';
  }

  /**
   * Set the position based on object's posiiton on textArray.
   * @param {Number} index Index of text in textArray.
   * @memberof Text
   */
  setPosition(index) {
    this.position = index;
  }
}
