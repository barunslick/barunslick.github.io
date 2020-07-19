let videoArray = [];
let musicArray = []
let musicList = ['assets/music/music1.mp3'];
let videoList = ['assets/videos/nature.mp4', 'assets/videos/sunset1.mp4'];

let loaderDiv = document.querySelector('.loader');
let mainDiv = document.querySelector('.wrapper');


/**
 *	Returns a promise to load video or music
 * @param {String} src Source of file
 * @param {String} type Whether it is a music or a video
 * @returns {Promise} Promise that loads the given file
 */
function loadAssets(src, type) {

  return new Promise(function (resolve, reject) {
    let obj;
    if (type === 'audio') {
      obj = document.createElement('audio');
    } else {
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

/**
 * Loops through all the resources list provided and loads them
 * @param {Array} srcs Array of either array of videos or music
 * @returns {Promise} Promise object that is resolved
 */
function preloadAssets(srcs) {
  let promises = [];
  for (let i = 0; i < srcs.length; i++) {
    let type = i == 0 ? 'video' : 'audio';
    for (let j = 0; j < srcs[i].length; j++) {
      promises.push(loadAssets(srcs[i][j], type));
    }
  }

  return Promise.all(promises);
}

// Perfoms operation on the resolved or rejected promise objects.
preloadAssets([videoList, musicList]).then(function (objects) {
  let videoObjects = objects.slice(0, videoList.length);
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