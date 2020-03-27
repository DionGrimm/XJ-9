let protoElement = false

window.addEventListener('load', () => {
	protoElement = document.getElementById('prototype')
	checkVisible()
})

function checkVisible() {
	var rect = protoElement.getBoundingClientRect();

	if (rect.top<  window.innerHeight) {
		startPlayer()
	}
	else {
		setTimeout(checkVisible, 200)
	}
}
