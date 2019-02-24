const Utils = require('./utils.js');
const PI_2 = 2 * Math.PI;

class RayDrawer {

  // Constructor
  constructor(ctx, width, height) {
    this._ctx = ctx;
    this.width = width;
    this.height = height;
    this._clearOpacity = 0.8;
    this._gradientStart = "#7474BF";
    this._gradientEnd = "#348AC7";
    this.points = 512;
    this._rotation = -1.5707963268; // 90°
    this.lineOpacity = 0.4;
    this.updateRayon();
    this.power = 1;
  }

  // Setters
  set gradientStart(color) {
    this._gradientStart = color;
    this.regenGradient();
  }

  set gradientEnd(color) {
    this._gradientEnd = color;
    this.regenGradient();
  }

  set rayon(value) {
    this._rayon = value;
  }

  set height(value) {
    this._height = value;
    this.updateRayon();
  }

  set width(value) {
    this._width = value;
    this.updateRayon();
  }

  set clearOpacity(value) {
    this._clearOpacity = value;
  }

  set rotation(rad) {
    this._rotation = rad % PI_2;
  }

  set points(nb) {
    this._points = nb;
    this._halfPoints = this._points / 2;
    this._step = PI_2 / this._points;
    this.regenGradient();
  }

  set lineOpacity(opacity) {
    this._lineOpacity = opacity;
    this.regenGradient();
  }

  set power(power) {
    this._power = power;
  }

  // Getters
  get power() {
    return this._power;
  }

  get clearOpacity() {
    return this._clearOpacity;
  }

  get rotation() {
    return this._rotation;
  }

  get lineOpacity() {
    return this._lineOpacity;
  }

  getPoints() {
    return this._points;
  }

  // Functions
  clear() {
    this._ctx.rect(0, 0, this._width, this._height);
    this._ctx.fillStyle = "rgba(0,0,0," + this._clearOpacity + ")";
    this._ctx.fill();
  }

  /**
   * beginRad is the angular component of the polar coordinate of the beginning of the line
   * endRad is the angular component of the polar coordinate of the end of the line
   */
  draw() {
    for (let i = 1; i < this._points; ++i) {
      const beginRad = i * this._step + this._rotation;
      const endRad = (i * this._power % this._points) * this._step + this._rotation;
      const x0 = this._rayon * Math.sin(beginRad) + this._rayon;
      const y0 = this._rayon * Math.cos(beginRad) + this._rayon;
      const x1 = this._rayon * Math.sin(endRad) + this._rayon;
      const y1 = this._rayon * Math.cos(endRad) + this._rayon;
      this._ctx.beginPath();
      this._ctx.moveTo(x0, y0);
      this._ctx.lineTo(x1, y1);
      if (i >= this._halfPoints)
        this._ctx.strokeStyle = this._gradient[this._points - i];
      else
        this._ctx.strokeStyle = this._gradient[i];
      this._ctx.stroke();
    }
  }

  incrRotation(rad) {
    this._rotation = (this._rotation + rad) % PI_2;
  }

  regenGradient() {
    this._gradient = Utils.getGradientColors(
      this._gradientStart,
      this._gradientEnd,
      1 / this._halfPoints,
      this._lineOpacity
    );
  }

  updateRayon() {
    this._rayon = ((this._width <= this._height) ? this._width : this._height) / 2;
  }
}

module.exports = RayDrawer;
