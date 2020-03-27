var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
	console.log("l")
	player = new YT.Player('videoElement', {
		videoId: 'xuk_9sS4C_A',
		playerVars: {
			controls: 0,
			start: 16,
			autoplay: 1,
			modestbranding: 1,
			loop: 1,
			mute: 1,
		},
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	console.log(event)
	event.target.playVideo();
	updateYaw()
}

let isActive = false
function onPlayerStateChange(event) {
	console.log(event )
	if (event.data == YT.PlayerState.PLAYING) {
		isActive = true
	}
	else {
		isActive = false
	}
}

function updateYaw() {
	window.requestAnimationFrame(updateYaw)
	if (!isActive) return
	
	console.log(player.getSphericalProperties())
}
