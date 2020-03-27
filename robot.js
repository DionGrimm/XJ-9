function rotateHead(deg) {
    const head = document.querySelector('#robot-head');
    head.object3D.rotation.set(0, deg, 0);
}