(function (global) { // whole code is wrapper in iffe to prevent collision with other libraries and packages.

  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;  

  var Carousal = function (carousalContainerClass, transitionTime = 0, holdTime = 0){
    return new Carousal.init(carousalContainerClass, transitionTime, holdTime); //returning new so that end user doesnt have to type new and just use shorthand C$() just like injquery
  }

  Carousal.init = function(carousalContainerClass, transitionTime, holdTime){
    var self = this;
    self.currentIndex = 1;
    self.transitionTime = transitionTime;
    self.holdTime = holdTime;
    self.arrayIndicators = [];
    self.carousalContainer = document.querySelector( '.' + carousalContainerClass);
    self.carouselImageWrapper = self.carousalContainer.children[0];
    self.imageSize = self.carouselImageWrapper.children[0].clientWidth;
    self.carouselImageWrapper.style.left = - self.imageSize + 'px';
    self.createClone(self.carouselImageWrapper);
    self.noOfImages = self.carouselImageWrapper.childElementCount - 2;
    [self.leftBtn, self.rightBtn] = self.createSideButtons(self.carousalContainer);
    self.leftBtn.element.addEventListener('click',function(imageSize){
      self.leftBtn.leftClick(self,self.imageSize);
    })
    self.rightBtn.element.addEventListener('click',function(imageSize){
      self.rightBtn.rightClick(self,self.imageSize);
    })
    self.indicatorHolder = self.createIndicators(self.carousalContainer, self.arrayIndicators ,self.noOfImages);
    self.indicatorHolder.addEventListener('click', function(e){
      var targetIndex = e.target.value;
      var currentIndicatorIndex = self.currentIndex - 1;
      if (targetIndex != undefined && targetIndex != currentIndicatorIndex) self.changeDot(currentIndicatorIndex, targetIndex);
    })

  }

  Carousal.init.prototype = Carousal.prototype; //making sure init's prototype protype property and Carousal prototype are same
  global.Carousal = global.C$ = Carousal; //exposing Carousal to global object and making shorthand reference of C$ to be able to create new objects using it for end use

  Carousal.prototype.createClone = function (carouselImageWrapper){
    this.firstImage = carouselImageWrapper.firstElementChild;
    this.lastImage = carouselImageWrapper.lastElementChild;
    this.firstImageCopy = this.firstImage.cloneNode(true);
    this.lastImageCopy = this.lastImage.cloneNode(true);
    carouselImageWrapper.prepend(this.lastImageCopy);
    carouselImageWrapper.appendChild(this.firstImageCopy);
  }

  Carousal.prototype.createSideButtons = function (outerContainer, btnSize = 40){
    var btnLeftRef =  new Button('left', btnSize);
    var btnRightRef = new Button('right', btnSize);
    outerContainer.appendChild(btnLeftRef.element);
    outerContainer.appendChild(btnRightRef.element);
    return [btnLeftRef, btnRightRef];
  }
  
  Carousal.prototype.updateIndex = function(direction, jump){
    this.currentIndex += -(direction * jump);
    this.currentIndex = this.currentIndex == 0 ? 5 : this.currentIndex;
    this.currentIndex = this.currentIndex == 5 + 1 ? 1 : this.currentIndex;
  }

  Carousal.prototype.changeDot = function(currentDot, requiredDot){
    var jump = Math.abs(requiredDot - currentDot);
    var currentPos = -(this.currentIndex * this.imageSize);
    var requiredPos = (requiredDot) * (-this.imageSize) - this.imageSize;
    var direction = (requiredDot > currentDot) ? -1 : 1;
    this.slide(currentPos, requiredPos, direction, jump);
  }

  Carousal.prototype.changeDotColor = function (oldDot, newDot){
    this.arrayIndicators[oldDot].indicator.classList.remove('dot-active');
    this.arrayIndicators[newDot].indicator.classList.add('dot-active');
  }

  Carousal.prototype.createIndicators = function(outerContainer, arrayIndicators , noOfImages){
    var indicatorHolder = document.createElement('div');
    indicatorHolder.classList.add('indicator-holder');
    outerContainer.appendChild(indicatorHolder);
    for (let i = 0; i < noOfImages; i++) {
      arrayIndicators.push(new addSingleIndicator(indicatorHolder, i));
    }
    arrayIndicators[0].indicator.classList.add('dot-active');
    return indicatorHolder;
  }

  Carousal.prototype.slide = function (current, required, direction, jump = 1) { //jump is used to boost speed if indictor is used to select images and also to update index
    var tempIndex = this.currentIndex;
    this.updateIndex(direction, jump);
    this.changeDotColor(tempIndex - 1, this.currentIndex - 1);
    console.log(jump);
    this.animate = this.getAnimate(current, required, direction, jump); //sending this varaibles as arguments to set it into the closure of returning function
    this.animate();
  };

  Carousal.prototype.getAnimate = function (current, required, direction, jump){
    var self = this;
    var notComplete = true;
    return function(){
      current += (direction * 40 * jump);
      self.carouselImageWrapper.style.left = current + 'px';
      if ((direction == -1 && current <= required) || (direction == 1 && current >= required)) notComplete = false;
      if (notComplete) requestAnimationFrame(self.animate);
    }
  }

  var addSingleIndicator = function (outerContainer, indicatorValue) {
    this.indicatorSize = 12;
    this.indicator = document.createElement('div');
    this.indicator.value = indicatorValue;
    this.indicator.classList.add('dot')
    this.indicator.style.height = this.indicatorSize + 'px';
    this.indicator.style.width = this.indicatorSize + 'px';
    this.indicator.style.borderRadius = (this.indicatorSize + 2) / 2 + 'px';
    outerContainer.appendChild(this.indicator);
  }

  var Button = function (btnDirection, btnSize){
    this.element = document.createElement('div');
    this.btnDirection = btnDirection;
    this.element.classList.add('side-buttons');
    this.element.style.height = btnSize + 'px';
    this.element.style.paddingTop = btnSize/5 + 'px';  // using 5 as magic number for now..will find a general solution later
    this.element.style.width = btnSize + 'px';
    this.element.style.borderRadius = btnSize / 2 + 'px';
    
    if (btnDirection == 'left'){
      this.element.style.left = '20px';
      this.element.innerHTML = '&#9001;';
    }else{
      this.element.style.right= '20px';
      this.element.innerHTML = '&#9002;';
    }
  }

  Button.prototype.leftClick = function (self, imageSize){
    var currentPos = -(self.currentIndex * imageSize);
    var requiredPos = currentPos + imageSize;
    self.slide(currentPos, requiredPos, 1);
  };

  Button.prototype.rightClick = function (self, imageSize){
    var currentPos = -(self.currentIndex * imageSize);
    var requiredPos = currentPos - imageSize;
    self.slide(currentPos, requiredPos, -1);
  };



}(typeof window !== undefined ? window : this));