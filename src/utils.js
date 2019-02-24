class Utils {

  static getGradientColors(startColor, endColor, step, alpha) {
    const steps = Math.ceil(1 / step);
    const colors = new Array(steps);
    // strip the leading # if it's there
    startColor = startColor.replace(/^\s*#|\s*$/g, '');
    endColor = endColor.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if (startColor.length === 3)
      startColor = startColor.replace(/(.)/g, '$1$1');

    if (endColor.length === 3)
      endColor = endColor.replace(/(.)/g, '$1$1');

    // get colors
    const startRed = parseInt(startColor.substr(0, 2), 16);
    const startGreen = parseInt(startColor.substr(2, 2), 16);
    const startBlue = parseInt(startColor.substr(4, 2), 16);

    const endRed = parseInt(endColor.substr(0, 2), 16);
    const endGreen = parseInt(endColor.substr(2, 2), 16);
    const endBlue = parseInt(endColor.substr(4, 2), 16);
    let progress = 0;
    for (let i = 0; i < steps; ++i) {
      // calculate new color
      const diff_red = (endRed - startRed) * progress + startRed;
      const diff_green = (endGreen - startGreen) * progress + startGreen;
      const diff_blue = (endBlue - startBlue) * progress + startBlue;
      colors[i] = 'rgba(' + diff_red + ',' + diff_green + ',' + diff_blue + ',' + alpha + ')';
      progress += step;
      ++i;
    }
    return colors;
  };
}

module.exports = Utils;
