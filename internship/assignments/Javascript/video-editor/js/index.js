let video_list = ['assets/videos/apple_low.mp4', 'assets/videos/hp_low.mp4'];
let videoArray = [];

function preloadVideos(srcs) {
	function loadVideo(src) {
		return new Promise(function (resolve, reject) {
			var video = document.createElement('video');
			video.setAttribute('preload', 'auto');
			video.src = src;
			video.onloadedmetadata = function () {
				resolve(video);
			};
			video.onerror = video.onabort = function () {
				reject(src);
			};
		});
	}
	var promises = [];
	for (var i = 0; i < srcs.length; i++) {
		promises.push(loadVideo(srcs[i]));
	}
	return Promise.all(promises);
}

preloadVideos(video_list).then(function (videos) {
	for(var i = 0; i < videos.length; i++){
			let video = new Video(videos[i].src, videos[i].duration, videos[i], i);
			videoArray.push(video);
	}
	main(videoArray, video_list);
}, function (errImg) {
	alert('Failed to load videos. Your connection might be slow. Please, try again later.')
});

