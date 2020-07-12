let videoArray = [];
let musicArray = []
let musicList = ['assets/music/music.mp3'];
let videoList = ['assets/videos/apple_low.mp4', 'assets/videos/hp_low.mp4'];


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
		video.setAttribute('preload', 'auto');
		video.src = src;
		video.oncanplaythrough = function () {
			resolve(video);
		};
		video.onerror  = function () {
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
}, function (errImg) {
	alert('Failed to load videos. Your connection might be slow. Please, try again later.')
});

/* function preloadMusic(srcs) {
	function loadMusic(src) {
		return new Promise(function (resolve, reject) {
			var audio = document.createElement('audio');
			audio.setAttribute('preload', 'auto');
			audioo.src = src;
			audio.oncanplaythrough = function () {
				resolve(audio);
			};
			audio.onerror = audio.onabort = function () {
				reject(src);
			};
		});
	}
	let promises = [];
	for (let i = 0; i < srcs.length; i++) {
		promises.push(loadMusic(srcs[i]));
	}
	return Promise.all(promises);
}

preloadMusi(videoList).then(function (audios) {
	for (var i = 0; i < audios.length; i++) {
		let video = new Video(audios[i].src, videos[i].duration, i);
		videoArray.push(video);
	}
	main(videoArray, videoList);
}, function (errImg) {
	alert('Failed to load videos. Your connection might be slow. Please, try again later.')
});
 */