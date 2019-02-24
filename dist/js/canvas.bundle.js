/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var RayDrawer = __webpack_require__(/*! ./raydrawer.js */ "./src/raydrawer.js");

var canvas = document.querySelector('canvas');
var powerSpeedSlider = document.getElementById('powerSpeed');
var pointsSlider = document.getElementById('points');
var lineOpacitySlider = document.getElementById('lineOpacity');
var trailingSlider = document.getElementById('trailing');
var rotationSpeedSlider = document.getElementById('rotationSpeed');
var ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

var drawer = new RayDrawer(ctx, canvas.width, canvas.height);

var powerIncrSpeed = 0.001;
var rotationSpeed = 0;

powerSpeedSlider.value = powerIncrSpeed;
pointsSlider.value = drawer.getPoints();
lineOpacitySlider.value = drawer.lineOpacity;
trailingSlider.value = 1 - drawer.clearOpacity;
rotationSpeedSlider.value = rotationSpeed;

powerSpeedSlider.oninput = function () {
    powerIncrSpeed = parseFloat(this.value);
};
pointsSlider.oninput = function () {
    drawer.points = parseFloat(this.value);
};
lineOpacitySlider.oninput = function () {
    drawer.lineOpacity = parseFloat(this.value);
};
trailingSlider.oninput = function () {
    drawer.clearOpacity = 1 - parseFloat(this.value);
};
rotationSpeedSlider.oninput = function () {
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

/***/ }),

/***/ "./src/raydrawer.js":
/*!**************************!*\
  !*** ./src/raydrawer.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = __webpack_require__(/*! ./utils.js */ "./src/utils.js");
var PI_2 = 2 * Math.PI;

var RayDrawer = function () {
  function RayDrawer(ctx, width, height) {
    _classCallCheck(this, RayDrawer);

    this._ctx = ctx;
    this.width = width;
    this.height = height;
    this._clearOpacity = 0.8;
    this._gradientStart = "#7474BF";
    this._gradientEnd = "#348AC7";
    this.points = 1000;
    this._rotation = -1.5707963268; // 90°
    this.lineOpacity = 0.1;
    this.updateRayon();
    this.power = 1;
  }

  _createClass(RayDrawer, [{
    key: "getPoints",
    value: function getPoints() {
      return this._points;
    }
  }, {
    key: "clear",
    value: function clear() {
      this._ctx.rect(0, 0, this._width, this._height);
      this._ctx.fillStyle = "rgba(0,0,0," + this._clearOpacity + ")";
      this._ctx.fill();
    }
  }, {
    key: "draw",
    value: function draw() {
      for (var i = 1; i < this._points; ++i) {
        var p0 = i * this._step + this._rotation;
        var p1 = i * this._power % this._points * this._step + this._rotation;
        var x0 = this._rayon * Math.sin(p0) + this._rayon;
        var y0 = this._rayon * Math.cos(p0) + this._rayon;
        var x1 = this._rayon * Math.sin(p1) + this._rayon;
        var y1 = this._rayon * Math.cos(p1) + this._rayon;
        this._ctx.beginPath();
        this._ctx.moveTo(x0, y0);
        this._ctx.lineTo(x1, y1);
        if (i >= this._halfPoints) this._ctx.strokeStyle = this._gradient[this._points - i];else this._ctx.strokeStyle = this._gradient[i];
        this._ctx.stroke();
      }
    }
  }, {
    key: "incrRotation",
    value: function incrRotation(rad) {
      this._rotation = (this._rotation + rad) % PI_2;
    }
  }, {
    key: "regenGradient",
    value: function regenGradient() {
      this._gradient = Utils.getGradientColors(this._gradientStart, this._gradientEnd, 1 / this._halfPoints, this._lineOpacity);
    }
  }, {
    key: "updateRayon",
    value: function updateRayon() {
      this._rayon = (this._width <= this._height ? this._width : this._height) / 2;
    }
  }, {
    key: "gradientStart",
    set: function set(color) {
      this._gradientStart = color;
      this.regenGradient();
    }
  }, {
    key: "gradientEnd",
    set: function set(color) {
      this._gradientEnd = color;
      this.regenGradient();
    }
  }, {
    key: "rayon",
    set: function set(value) {
      this._rayon = value;
    }
  }, {
    key: "height",
    set: function set(value) {
      this._height = value;
      this.updateRayon();
    }
  }, {
    key: "width",
    set: function set(value) {
      this._width = value;
      this.updateRayon();
    }
  }, {
    key: "clearOpacity",
    set: function set(value) {
      this._clearOpacity = value;
    },
    get: function get() {
      return this._clearOpacity;
    }
  }, {
    key: "rotation",
    set: function set(rad) {
      this._rotation = rad % PI_2;
    },
    get: function get() {
      return this._rotation;
    }
  }, {
    key: "points",
    set: function set(nb) {
      this._points = nb;
      this._halfPoints = this._points / 2;
      this._step = PI_2 / this._points;
      this.regenGradient();
    }
  }, {
    key: "lineOpacity",
    set: function set(opacity) {
      this._lineOpacity = opacity;
      this.regenGradient();
    },
    get: function get() {
      return this._lineOpacity;
    }
  }, {
    key: "power",
    set: function set(power) {
      this._power = power;
    },
    get: function get() {
      return this._power;
    }
  }]);

  return RayDrawer;
}();

module.exports = RayDrawer;

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: 'getGradientColors',
    value: function getGradientColors(startColor, endColor, step, alpha) {
      var steps = Math.ceil(1 / step);
      var colors = new Array(steps);
      // strip the leading # if it's there
      startColor = startColor.replace(/^\s*#|\s*$/g, '');
      endColor = endColor.replace(/^\s*#|\s*$/g, '');

      // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
      if (startColor.length === 3) startColor = startColor.replace(/(.)/g, '$1$1');

      if (endColor.length === 3) endColor = endColor.replace(/(.)/g, '$1$1');

      // get colors
      var startRed = parseInt(startColor.substr(0, 2), 16);
      var startGreen = parseInt(startColor.substr(2, 2), 16);
      var startBlue = parseInt(startColor.substr(4, 2), 16);

      var endRed = parseInt(endColor.substr(0, 2), 16);
      var endGreen = parseInt(endColor.substr(2, 2), 16);
      var endBlue = parseInt(endColor.substr(4, 2), 16);
      var progress = 0;
      for (var i = 0; i < steps; ++i) {
        // calculate new color
        var diff_red = (endRed - startRed) * progress + startRed;
        var diff_green = (endGreen - startGreen) * progress + startGreen;
        var diff_blue = (endBlue - startBlue) * progress + startBlue;
        colors[i] = 'rgba(' + diff_red + ',' + diff_green + ',' + diff_blue + ',' + alpha + ')';
        progress += step;
        ++i;
      }
      return colors;
    }
  }]);

  return Utils;
}();

module.exports = Utils;

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map