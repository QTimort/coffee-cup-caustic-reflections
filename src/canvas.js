const RayDrawer = require('./raydrawer.js');

const canvas = document.querySelector('canvas');
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

powerSpeedSlider.value = powerIncrSpeed;
pointsSlider.value = drawer.getPoints();
lineOpacitySlider.value = drawer.lineOpacity;
trailingSlider.value = 1 - drawer.clearOpacity;
rotationSpeedSlider.value = rotationSpeed;

powerSpeedSlider.oninput = function() {
    powerIncrSpeed = parseFloat(this.value);
};
pointsSlider.oninput = function() {
    drawer.points = parseFloat(this.value);
};
lineOpacitySlider.oninput = function() {
    drawer.lineOpacity = parseFloat(this.value);
};
trailingSlider.oninput = function() {
    drawer.clearOpacity = 1 - parseFloat(this.value);
};
rotationSpeedSlider.oninput = function() {
    rotationSpeed = parseFloat(this.value);
};

function animate() {
    //requestAnimationFrame(animate);
    drawer.clear();
    drawer.power += powerIncrSpeed;
    drawer.incrRotation(rotationSpeed);
    drawer.draw();
}

setInterval(animate, 40);
