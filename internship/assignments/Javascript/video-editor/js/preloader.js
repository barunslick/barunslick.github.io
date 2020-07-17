let videoArray = [];
let musicArray = []
let musicList = ['assets/music/music1.mp3'];
let videoList = ['assets/videos/nature.mp4','assets/videos/sunset1.mp4'];

let loaderDiv = document.querySelector('.loader');
let mainDiv = document.querySelector('.wrapper');

function loadAssets(src, type) {
	return new Promise(function (resolve, reject) {
		let obj;
		if (type == 'audio'){
			obj = document.createElement('audio');
		}else{
			obj = document.createElement('video');
		}
		obj.setAttribute('preload', 'auto');
		obj.src = src;
		obj.oncanplaythrough = function () {
			resolve(obj);
		};
		obj.onerror = function () {
			reject(src);
		};
	});
}

function preloadAssets(srcs) {
	let promises = [];
	for (let i = 0; i < srcs.length; i++) {
		let type = i == 0 ? 'video' : 'audio';
		for (let j = 0; j < srcs[i].length; j++) {
			promises.push(loadAssets(srcs[i][j],type));	
		}
	}
	return Promise.all(promises);
}

preloadAssets([videoList, musicList]).then(function (objects) {
	let videoObjects = objects.slice(0,videoList.length);
	let audioObjects = objects.slice(videoList.length, objects.length);
	for (var i = 0; i < videoObjects.length; i++) {
		let video = new Video(videoObjects[i].src, videoObjects[i].duration, i);
		videoArray.push(video);
	}
	for (let i = 0; i < audioObjects.length; i++) {
		let audio = new Audio(audioObjects[i].src, audioObjects[i].duration, i);
		musicArray.push(audio);
	}
	main();
	loaderDiv.style.display = 'none';
	mainDiv.style.display = 'block';

}, function (errssss) {
	alert('Failed to load assets. Your connection might be slow. Please, try again later.')
});