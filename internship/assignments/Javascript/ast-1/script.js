var carousalContainer = document.querySelector('.carousel-container');
var carouselImageWrapper = document.querySelector('.carousel-image-wrapper');
var images = document.querySelector('.carousel-image-wrapper img');

var btnSize = 40;
var btnLeft = document.createElement('div');
btnLeft.style.position = 'absolute';
btnLeft.style.height = btnSize + 'px';
btnLeft.style.width = btnSize + 'px';
btnLeft.style.borderRadius = btnSize/2 + 'px';
btnLeft.style.backgroundColor = 'yellow';
btnLeft.style.top = '50%';
btnLeft.style.left = '20px';
carousalContainer.appendChild(btnLeft);

var btnRight = document.createElement('div');
btnRight.style.position = 'absolute';
btnRight.style.height = btnSize + 'px';
btnRight.style.width = btnSize + 'px';
btnRight.style.borderRadius = btnSize/2 + 'px';
btnRight.style.backgroundColor = 'yellow';
btnRight.style.top = '50%';
btnRight.style.right = '20px';
carousalContainer.appendChild(btnLeft);
carousalContainer.appendChild(btnRight);

var image_width = images.clientWidth;

