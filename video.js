
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

const questionSnd1 = new Audio('audio/vraag1.wav');
const questionSnd2 = new Audio('audio/vraag2.wav');
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
let question = true;

function updateYaw() {
	window.requestAnimationFrame(updateYaw)
	if (!isActive) return

	let prop = player.getSphericalProperties()
	rotateHead(prop.yaw / 57.3248)

	// if (question) {
	// 	setTimeout(() => {
	// 		questionSnd1.play()
	// 		setTimeout(() => {
	// 			questionSnd2.play()
	// 		}, 5000);
	// 	}, 3000);
	// 	question = false;
	// }
	//
	// const prop = player.getSphericalProperties()
	// const deg = prop.yaw / 57.3248
	// if (deg !== lastRotation) {
	// 	setTimeout(() => {
	// 		servoSnd.play();
	// 		rotateHead(deg);
	// 	}, 300);
	// 	lastRotation = deg;
	// }
}

window.addEventListener('DOMContentLoaded', function() {
	document.getElementById("startButton").addEventListener("click", function() {
		document.getElementById("prototype").className = "expand"
		document.getElementById("start").style.display = "none"

		setTimeout(function () {
			document.getElementById("protohead").style.opacity = 1
		}, 1200)
	})

	document.getElementById("controlsLeft").addEventListener("click", function() {
		let prop = player.getSphericalProperties()

		player.setSphericalProperties({
			yaw: prop.yaw + 10,
		})
	})

	document.getElementById("controlsRight").addEventListener("click", function() {
		let prop = player.getSphericalProperties()

		player.setSphericalProperties({
			yaw: prop.yaw - 10,
		})
	})
})
