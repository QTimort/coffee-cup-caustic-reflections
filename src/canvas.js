const RayDrawer = require('./raydrawer.js');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const drawer = new RayDrawer(ctx, canvas.width, canvas.height, 1000, 1);

function animate() {
    //requestAnimationFrame(animate);
    drawer.clear();
    drawer.power += 0.001;
    drawer.draw();
}

setInterval(animate, 40);
