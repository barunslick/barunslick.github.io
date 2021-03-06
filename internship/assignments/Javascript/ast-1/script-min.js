(function () { // whole code is wrapper in iffe to prevent collision with other libraries and packages.

  var carousalContainer = document.querySelector('.carousel-container');
  var carouselImageWrapper = document.querySelector('.carousel-image-wrapper');
  var image = document.querySelectorAll('.carousel-container img');
  var imageSize = image.clientWidth;

  var carouselImageWrapper = document.createElement('div');
  carouselImageWrapper.style.position = 'absolute';
  carouselImageWrapper.style.top = '0px';
  carouselImageWrapper.style.left = '-1000px';
  carouselImageWrapper.style.wdith = '7000px';
  carouselImageWrapper.style.height = '550px';
  carouselImageWrapper.style.display = 'inline-block';
  carouselImageWrapper.classList.add('clearfix');

  for (let j = 0; j < image.length; j++) {
    carouselImageWrapper.appendChild(image[j]);
    image[j].classList.add('images');
  }
  carousalContainer.appendChild(carouselImageWrapper);
  console.log(image);
  console.log(carouselImageWrapper);

  //cloning first and last images
  function createClone(carouselImageWrapper) {
    var firstImage = carouselImageWrapper.firstElementChild;
    var lastImage = carouselImageWrapper.lastElementChild;
    var firstImageCopy = firstImage.cloneNode(true);
    var lastImageCopy = lastImage.cloneNode(true);
    carouselImageWrapper.prepend(lastImageCopy);
    carouselImageWrapper.appendChild(firstImageCopy);
  }
  createClone(carouselImageWrapper);

  function createSideButtons(outerContainer, btnSize){
    btnLeftRef = createLeftButton(btnSize);
    btnRightRef = createRightButton(btnSize);
    outerContainer.appendChild(btnLeftRef);
    outerContainer.appendChild(btnRightRef);
    return [btnLeftRef, btnRightRef]
  }

  function createLeftButton(btnSize){
    var btnLeft = document.createElement('div');
    btnLeft.style.position = 'absolute';
    btnLeft.style.height = btnSize + 'px';
    btnLeft.style.width = btnSize + 'px';
    btnLeft.style.borderRadius = btnSize / 2 + 'px';
    btnLeft.style.backgroundColor = '#677381';
    btnLeft.style.top = '50%';
    btnLeft.style.left = '20px';
    btnLeft.style.cursor = 'pointer';
    return btnLeft;
  }

  function createRightButton(btnSize){
    var btnRight = document.createElement('div');
    btnRight.style.position = 'absolute';
    btnRight.style.height = btnSize + 'px';
    btnRight.style.width = btnSize + 'px';
    btnRight.style.borderRadius = btnSize / 2 + 'px';
    btnRight.style.backgroundColor = '#677381';
    btnRight.style.top = '50%';
    btnRight.style.right = '20px';
    btnRight.style.cursor = 'pointer';
    return btnRight;
  }
  var btnSize = 40;
  var [btnLeft, btnRight] = createSideButtons(carousalContainer ,btnSize);
  console.log(btnLeft);

  var imgSize = 15;
  var img = document.createElement("img");
  img.src = "images/fwd-white.png";
  img.style.height = imgSize + 'px';
  img.style.width = imgSize + 'px';
  img.style.position = 'relative';
  img.style.top = '50%';
  img.style.transform = 'translateY(-50%)';
  img.style.left = '50%';
  img.style.objectFit = 'cover';
  img.style.marginLeft = -imgSize / 2 + 'px';
  btnRight.appendChild(img);

  var img_2 = document.createElement("img");
  img_2.src = "images/bwd-white.png";
  img_2.style.height = imgSize + 'px';
  img_2.style.width = imgSize + 'px';
  img_2.style.position = 'relative';
  img_2.style.top = '50%';
  img_2.style.transform = 'translateY(-50%)';
  img_2.style.left = '50%';
  img_2.style.marginLeft = -imgSize / 2 + 'px';
  btnLeft.appendChild(img_2);

  var indicatorHolder = document.createElement('div');
  indicatorHolder.style.position = 'absolute';
  indicatorHolder.style.width = '100%';
  indicatorHolder.style.borderRadius = btnSize / 2 + 'px';
  indicatorHolder.style.bottom = '40px';
  indicatorHolder.style.textAlign = 'center';
  carousalContainer.appendChild(indicatorHolder);
  indicatorHolder.addEventListener('click', function (e) {
    var targetIndex = e.target.value;
    var currentIndicatorIndex = currentIndex - 1;
    if (targetIndex != undefined && targetIndex != currentIndicatorIndex) changeDot(currentIndicatorIndex, targetIndex);
  })


  function addIndicators(outerContainer, arrayIndicators, indicatorValue) {
    var indicator = document.createElement('div');
    indicator.value = indicatorValue;
    indicator.style.display = 'inline-block';
    indicator.style.height = indicatorSize + 'px';
    indicator.style.width = indicatorSize + 'px';
    indicator.style.borderRadius = (indicatorSize + 2) / 2 + 'px';
    indicator.style.border = '1px solid #677381';
    indicator.style.backgroundColor = 'none';
    indicator.style.marginRight = '5px';
    indicator.style.cursor = 'pointer';
    outerContainer.appendChild(indicator);
    arrayIndicators.push(indicator);
  }

  var indicatorSize = 12;
  var arrayIndicators = [];
  var noOfImages = carouselImageWrapper.childElementCount - 2;

  for (let i = 0; i < noOfImages; i++) {
    addIndicators(indicatorHolder, arrayIndicators, i);
  }
  arrayIndicators[0].classList.add('dot-active');

  currentIndex = 1;
  btnRight.addEventListener('click', function () {
    var currentPos = -(currentIndex * imageSize);
    var requiredPos = currentPos - imageSize;
    slide(currentPos, requiredPos, -1); //-1 meaning to go right and 1 for left
  })

  btnLeft.addEventListener('click', function () {
    var currentPos = -(currentIndex * imageSize);
    var requiredPos = currentPos + imageSize;
    slide(currentPos, requiredPos, 1);
  })

  function changeDot(currentDot, requiredDot) {
    changeDotColor(currentDot, currentDot);
    var jump = Math.abs(requiredDot - currentDot);
    var currentPos = -(currentIndex * imageSize);
    var requiredPos = (requiredDot) * (-imageSize) - imageSize;
    var direction = (requiredDot > currentDot) ? -1 : 1;
    slide(currentPos, requiredPos, direction, jump);
  }

  function changeDotColor(oldDot, newDot) {
    arrayIndicators[oldDot].classList.remove('dot-active');
    arrayIndicators[newDot].classList.add('dot-active');
  }

  var speed = 0.04 * imageSize;
  function slide(current, required, direction, jump = 1) { //jump is used to boost speed if indictor is used to select images and also to update index
    var tempIndex = currentIndex;
    updateIndex(direction, jump);
    changeDotColor(tempIndex - 1, currentIndex - 1);
    var notComplete = true;
    function animate() {
      current += (direction * speed * jump);
      carouselImageWrapper.style.left = current + 'px';
      if ((direction == -1 && current <= required) || (direction == 1 && current >= required)) notComplete = false;
      if (notComplete) window.requestAnimationFrame(animate);
    }
    animate();
  }

  function updateIndex(direction, jump) {
    currentIndex += -(direction * jump);
    currentIndex = currentIndex == 0 ? noOfImages : currentIndex;
    currentIndex = currentIndex == noOfImages + 1 ? 1 : currentIndex;
  }

}());