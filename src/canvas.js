const RayDrawer = require('./raydrawer.js');

const canvas = document.querySelector('canvas');
const playPause = document.getElementById('playpause');
const powerValue = document.getElementById('power');
const powerSpeedSlider = document.getElementById('powerSpeed');
const pointsSlider = document.getElementById('points');
const lineOpacitySlider = document.getElementById('lineOpacity');
const trailingSlider = document.getElementById('trailing');
const rotationSpeedSlider = document.getElementById('rotationSpeed');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const drawer = new RayDrawer(ctx, canvas.width, canvas.height);
let powerIncrSpeed = 0.001;
let rotationSpeed = 0;

function animate() {
    requestAnimationFrame(animate);
    if (!playPause.checked) {
        drawer.clear();
        // todo check delta time and incr accordingly
        drawer.power += powerIncrSpeed;
        powerValue.value = parseFloat(drawer.power).toFixed(3);
        drawer.incrRotation(rotationSpeed);
        drawer.draw();
    }
}

// Init sliders value
powerValue.value = drawer.power;
powerSpeedSlider.value = powerIncrSpeed;
pointsSlider.value = drawer.getPoints();
lineOpacitySlider.value = drawer.lineOpacity;
trailingSlider.value = 1 - drawer.clearOpacity;
rotationSpeedSlider.value = rotationSpeed;

// Setup sliders callback
powerValue.oninput = function() {drawer.power = parseFloat(this.value);};
powerSpeedSlider.oninput = function() {powerIncrSpeed = parseFloat(this.value);};
pointsSlider.oninput = function() {drawer.points = parseFloat(this.value);};
lineOpacitySlider.oninput = function() {drawer.lineOpacity = parseFloat(this.value);};
trailingSlider.oninput = function() {drawer.clearOpacity = 1 - parseFloat(this.value);};
rotationSpeedSlider.oninput = function() {rotationSpeed = parseFloat(this.value);};

animate();
//setInterval(animate, 50);
