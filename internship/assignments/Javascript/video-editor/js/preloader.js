let videoArray = [];
let musicArray = []
let musicList = ['assets/music/music.mp3'];
let videoList = ['assets/videos/nature.mp4', 'assets/videos/sunset1.mp4'];


function preloadVideos(srcs) {
	let promises = [];
	for (let i = 0; i < srcs.length; i++) {
		promises.push(loadVideos(srcs[i]));
	}
	return Promise.all(promises);
}


function loadVideos(src) {
	return new Promise(function (resolve, reject) {
		var video = document.createElement('video');
		video.src = src;
		video.oncanplaythrough = function () {
			resolve(video);
		};
		video.onerror = function () {
			reject(src);
		};
	});
}
preloadVideos(videoList).then(function (videos) {
	for (var i = 0; i < videos.length; i++) {
		let video = new Video(videos[i].src, videos[i].duration, i);
		videoArray.push(video);
	}
	main();
}, function (errVideo) {
	alert('Failed to load videos. Your connection might be slow. Please, try again later.')
});

/* function loadVideos(src, type) {
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

function preloadVideos(srcs) {
	let promises = [];
	for (let i = 0; i < srcs.length; i++) {
		let type = i == 0 ? 'video' : 'audio';
		for (let j = 0; j < srcs[i].length; j++) {
			promises.push(loadVideos(srcs[i][j],type));	
		}
	}
	return Promise.all(promises);
}

preloadVideos([videoList, musicList]).then(function (objects) {
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
}, function (errssss) {
	alert('Failed to load assets. Your connection might be slow. Please, try again later.')
}); */

/*
function preloadMusic(srcs) {
	let promises = [];
	for (let i = 0; i < srcs.length; i++) {
		promises.push(loadMusic(srcs[i]));
	}
	return Promise.all(promises);
}

function loadMusic(src) {
	return new Promise(function (resolve, reject) {
		let audio = document.createElement('audio');
		audio.src = src;
		console.log(audio)
		audio.oncanplaythrough = function () {
			resolve(audio);
		};
		audio.onerror = audio.onabort = function () {
			reject(src);
		};
	});
}

function preloader(){
	preloadVideos(videoList).then(function (videos) {
		for (var i = 0; i < videos.length; i++) {
			let video = new Video(videos[i].src, videos[i].duration, i);
			videoArray.push(video);
		}
		main();
	}, function (errVideo) {
		alert('Failed to load videos. Your connection might be slow. Please, try again later.')
	});

	preloadMusic(musicList).then(function (audios) {
		for (let i = 0; i < audios.length; i++) {
			let audio = new Audio(audios[i].src, audios[i].duration, i);
			musicArray.push(audio);
		}
	}, function (errMusic) {
		alert('Failed to load audio. Your connection might be slow. Please, try again later.')
	});
}
preloader(); */

