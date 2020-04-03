
var player;
function startPlayer() {
	player = new YT.Player('videoElement', {
		videoId: 'xuk_9sS4C_A',
		playerVars: {
			controls: 0,
			start: 16,
			autoplay: 1,
			modestbranding: 1,
			loop: 1,
			mute: 1,
			disablekb: 1,
			fs: 0,
			playsinline: 1,
			rel: 0,
		},
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	event.target.playVideo();
	updateYaw()
}

let isActive = false
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING) {
		isActive = true

	}
	else {
		isActive = false
	}
}

const servoSnd = new Audio('audio/servo.wav');
let lastRotation;

function updateYaw() {
	window.requestAnimationFrame(updateYaw)
	if (!isActive) return

	const prop = player.getSphericalProperties()
	const deg = prop.yaw / 57.3248
	if (deg !== lastRotation) {
		setTimeout(() => {
			servoSnd.play();
			rotateHead(deg);
		}, 300);
		lastRotation = deg;
	}
}
