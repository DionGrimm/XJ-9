let socket = io.connect("http://localhost:8070")
let player = 0

function startPlayer() {
	player = new YT.Player('videoElement', {
		videoId: 'vU_K_tmNGEg',
		playerVars: {
			controls: 0,
			start: 1010,
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
console.log("LAOD")
window.addEventListener('load', () => {
	startPlayer()
})

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
		rotateHead(deg);
		lastRotation = deg;
    }

    if (!started) {
        started = true
    }
}

function rotateHead(deg) {
    console.log("DEG", deg)
    socket.emit("dorot", deg)
}
