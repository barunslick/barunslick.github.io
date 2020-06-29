 // whole code is wrapper in iffe to prevent collision with other libraries and packages.
(function (global) {

  //caping fps to 60 so that animation doesnt run faster on higher refesh monitors
  var fps = 60; 
  var fpsInterval = 1000/fps;

  var requestAnimationFrame = global.requestAnimationFrame || gloabl.mozRequestAnimationFrame ||
                            global.webkitRequestAnimationFrame || gloabl.msRequestAnimationFrame;  

  var minAllowedTranisitionTime = 0.3;
  var maxAllowedTranisitionTime = 2;
  var minAllowedHoldTime = 3;
  var maxAllowedHoldTime = 20;

  //returning new so that end user doesnt have to type new and just use shorthand C$() just like injquery
  var Carousal = function (carousalContainerClass , transitionTime = minAllowedTranisitionTime, holdTime = minAllowedHoldTime){
    return new Carousal.init(carousalContainerClass, transitionTime, holdTime); 
  };

  Carousal.init = function(carousalContainerClass, transitionTime, holdTime){
    var self = this;
    self.currentIndex = 1;
    self.arrayIndicators = [];
    self.carousalContainer = document.querySelector(carousalContainerClass);
    self.carouselImageWrapper = self.carousalContainer.children[0];
    self.createClone(self.carouselImageWrapper);
    self.noOfImages = self.carouselImageWrapper.childElementCount - 2;
    self.carouselImageWrapper.style.width = (self.noOfImages +2)*100 + '%';
    self.setUpImageWidth();
    self.imageSize = self.carouselImageWrapper.children[0].clientWidth;
    self.currentWidth = self.carousalContainer.clientWidth;
    self.carouselImageWrapper.style.left = - 100 + '%';
    self.setHoldTime(holdTime);
    self.setTransitionTime(transitionTime);
    [self.leftBtn, self.rightBtn] = self.createSideButtons(self.carousalContainer);
    self.indicatorHolder = self.createIndicators(self.carousalContainer, self.arrayIndicators ,self.noOfImages);
    self.setUpEventListeners();
    self.selfAnimate();
  };

  Carousal.init.prototype = Carousal.prototype; //making sure init's prototype protype property and Carousal prototype are same
  global.Carousal = global.C$ = Carousal; //exposing Carousal to global object and making shorthand reference of C$ to be able to create new objects using it for end use

  Carousal.prototype.setTransitionTime = function (time){
    time = (time < minAllowedTranisitionTime || time > maxAllowedTranisitionTime) ? 0.3 : time;
    this.transitionTime = 100 / (fps * time);
  };

  Carousal.prototype.setUpEventListeners = function(){
    var self = this;
    self.leftBtn.element.addEventListener('click',function(){
      self.leftBtn.leftClick.call(self);
    });
    self.rightBtn.element.addEventListener('click',function(){
      self.rightBtn.rightClick.call(self);
    });
    self.indicatorHolder.addEventListener('click', function(e){
      var targetIndex = e.target.value;
      var currentIndicatorIndex = self.currentIndex - 1;
      if (targetIndex != undefined && targetIndex != currentIndicatorIndex) self.changeDot(currentIndicatorIndex, targetIndex);
    });
  }

  Carousal.prototype.setHoldTime = function (time){
    time = (time < minAllowedHoldTime || time > maxAllowedHoldTime) ? 4 : time;
    this.holdTime = time * 1000;
  };

  Carousal.prototype.createClone = function (carouselImageWrapper){
    this.firstImage = carouselImageWrapper.firstElementChild;
    this.lastImage = carouselImageWrapper.lastElementChild;
    this.firstImageCopy = this.firstImage.cloneNode(true);
    this.lastImageCopy = this.lastImage.cloneNode(true);
    carouselImageWrapper.prepend(this.lastImageCopy);
    carouselImageWrapper.appendChild(this.firstImageCopy);
  };

  Carousal.prototype.setUpImageWidth = function(){
    for (var i = 0; i < this.carouselImageWrapper.children.length; i++ ){ 
      this.carouselImageWrapper.children[i].style.width = 100/(this.noOfImages + 2) + '%';
    };
  };

  Carousal.prototype.createSideButtons = function (outerContainer){
    var btnLeftRef =  new Button('left');
    var btnRightRef = new Button('right');
    outerContainer.appendChild(btnLeftRef.element);
    outerContainer.appendChild(btnRightRef.element);
    return [btnLeftRef, btnRightRef];
  };
  
  Carousal.prototype.changeDot = function(currentDot, requiredDot){
    var jump = Math.abs(requiredDot - currentDot);
    var currentPos = -(this.currentIndex * 100);
    var direction = (requiredDot > currentDot) ? -1 : 1;
    var requiredPos = currentPos + (100 * direction * jump);
    this.slide(currentPos, requiredPos, direction, jump);
  };

  Carousal.prototype.changeDotColor = function (oldDot, newDot){
    this.arrayIndicators[oldDot].indicator.classList.remove('dot-active');
    this.arrayIndicators[newDot].indicator.classList.add('dot-active');
  };

  Carousal.prototype.createIndicators = function(outerContainer, arrayIndicators , noOfImages){
    var indicatorHolder = document.createElement('div');
    indicatorHolder.classList.add('indicator-holder');
    outerContainer.appendChild(indicatorHolder);
    for (let i = 0; i < noOfImages; i++) {
      arrayIndicators.push(new addSingleIndicator(indicatorHolder, i));
    };
    arrayIndicators[0].indicator.classList.add('dot-active');
    return indicatorHolder;
  };

  Carousal.prototype.updateIndex = function(direction, jump){
    this.currentIndex += -(direction * jump);
    this.currentIndex = this.currentIndex == 0 ? this.noOfImages : this.currentIndex;
    this.currentIndex = this.currentIndex == this.noOfImages + 1 ? 1 : this.currentIndex;
  };

  Carousal.prototype.slide = function (current, required, direction, jump = 1) { //jump is used to boost speed if indictor is used to select images and also to update index
    var tempIndex = this.currentIndex;
    this.animate = this.getAnimate(current, required, direction, jump); //sending this varaibles as arguments to set it into the closure of returning function
    this.animate();
    this.updateIndex(direction, jump);
    this.changeDotColor(tempIndex - 1, this.currentIndex - 1);
    
  };
  
  Carousal.prototype.getAnimate = function (current, required, direction, jump){
    var self = this;
    var notComplete = true;
    var then = performance.now();
    return function(){
      clearInterval(self.my_timer); //everytime a shift in image is done ..prevoius timer is cleared
      if (!notComplete) {
        self.selfAnimate();
        return;
      };
      requestAnimationFrame(self.animate);
      var now = performance.now();
      var elapsed = now - then;
      if (elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval); //since RAF repeats at 16ms for every 60fps screen..we need to make up for our fpsInterval not being mupltiple of 16.67;
        self.carouselImageWrapper.style.left = current + '%';
        if ((direction == -1 && Math.round(current) <= required) || (direction == 1 && Math.round(current) >= required)) {
          notComplete = false;
        }else{
          current += (direction * self.transitionTime * jump);
        };
      };
    };
  };

  Carousal.prototype.selfAnimate = function(){
    this.my_timer = setInterval(function(){ //making my_timer linked to main object so that it can be easy to kill it whenever needed
      this.rightBtn.rightClick.call(this);
    }.bind(this),this.holdTime);
  };

  //Dots are also added as seperate objects
  var addSingleIndicator = function (outerContainer, indicatorValue) {
    this.indicator = document.createElement('div');
    this.indicator.value = indicatorValue;
    this.indicator.classList.add('dot');
    outerContainer.appendChild(this.indicator);
  };

  //Buttons are created as seperate object
  var Button = function (btnDirection){
    this.element = document.createElement('div');
    this.btnDirection = btnDirection;
    this.element.classList.add('side-buttons');
    if (btnDirection == 'left'){
      this.element.classList.add('left-btn');
      this.element.innerHTML = '&#9001;';
    }else{
      this.element.classList.add('right-btn');
      this.element.innerHTML = '&#9002;';
    };
  };

  Button.prototype.leftClick = function (){
    var currentPos = -(this.currentIndex * 100);
    var requiredPos = currentPos + 100;
    this.slide(currentPos, requiredPos, 1);
    
  };

  Button.prototype.rightClick = function (){
    var currentPos = -(this.currentIndex * 100);
    var requiredPos = currentPos - 100;
    this.slide(currentPos, requiredPos, -1);
  };



}(typeof window !== undefined ? window : this));