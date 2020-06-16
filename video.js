
var player;
function startPlayer() {
	player = new YT.Player('videoElement', {
		videoId: 'vU_K_tmNGEg',
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
let origRot = false
let question = true;
let started = false;

function updateYaw() {
	window.requestAnimationFrame(updateYaw)
	if (!isActive) return

	const prop = player.getSphericalProperties()
	const deg = prop.yaw / 57.3248

	if (started && deg !== lastRotation) {
		setTimeout(() => {
			servoSnd.play();
			rotateHead(deg);
		}, 300);
		lastRotation = deg;
	}

	if (question && started) {
		setTimeout(() => {
			questionSnd1.play()
			origRot = prop.yaw


			setTimeout(() => {
				if (origRot == player.getSphericalProperties().yaw) {
					questionSnd2.play()
				}
			}, 6000);
		}, 3000);
		question = false;
	}
}

window.addEventListener('DOMContentLoaded', function() {
	document.getElementById("startButton").addEventListener("click", function() {
		document.getElementById("prototype").className = "expand"
		document.getElementById("start").style.display = "none"
		started = true

		questionSnd1.play()
		questionSnd2.play()
		servoSnd.play()

		setTimeout(() => {
			questionSnd1.pause()
			questionSnd2.pause()
			servoSnd.pause()
		}, 1)

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

	var ask = false
	document.getElementById("controlsAsk").addEventListener("click", function() {
		ask = !ask

		if (ask) {
			document.getElementById("controlsAsk").getElementsByClassName("controlsAlt")[0].style.display = "block"
			document.getElementById("controlsAsk").getElementsByClassName("controlsMain")[0].style.display = "none"
		}
		else {
			document.getElementById("controlsAsk").getElementsByClassName("controlsAlt")[0].style.display = "none"
			document.getElementById("controlsAsk").getElementsByClassName("controlsMain")[0].style.display = "block"
		}
	})

	var geluid = false
	document.getElementById("controlsGeluid").addEventListener("click", function() {
		geluid = !geluid

		if (geluid) {
			document.getElementById("controlsGeluid").getElementsByClassName("controlsAlt")[0].style.display = "block"
			document.getElementById("controlsGeluid").getElementsByClassName("controlsMain")[0].style.display = "none"
		}
		else {
			document.getElementById("controlsGeluid").getElementsByClassName("controlsAlt")[0].style.display = "none"
			document.getElementById("controlsGeluid").getElementsByClassName("controlsMain")[0].style.display = "block"
		}
	})

	var mic = false
	document.getElementById("controlsMic").addEventListener("click", function() {
		mic = !mic

		if (mic) {
			document.getElementById("controlsMic").getElementsByClassName("controlsAlt")[0].style.display = "block"
			document.getElementById("controlsMic").getElementsByClassName("controlsMain")[0].style.display = "none"
		}
		else {
			document.getElementById("controlsMic").getElementsByClassName("controlsAlt")[0].style.display = "none"
			document.getElementById("controlsMic").getElementsByClassName("controlsMain")[0].style.display = "block"
		}
	})
})
