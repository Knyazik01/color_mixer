import { CMYKtoXYZ, HEXtoRGB, RGBtoXYZ, round, XYZtoCMYK } from './colorConverting';
import { TYPES } from '../constants';

/**
 * Mix colors in RGB or hex formats (
 * @param {Array<RGB|HEX>} colors - color in RGB or hex format
 * @returns {RGB} - mix color in RGB format
 */
const mixColors = (colors) => {
  const [{ r: R, g: G, b: B }] = colors
    .reduce((rgbArr, initColor) => {
      const [color, percent = 0] = Array.isArray(initColor) ? initColor : [initColor, 0];
      const { r, g, b } = typeof color === 'string' ? HEXtoRGB(initColor) : color;
      const [{ r: prR, g: prG, b: prB }] = rgbArr;
      return [{ r: prR + r * percent, g: prG + g * percent, b: prB + b * percent }, 0];
    }, [{ r: 0, g: 0, b: 0 }, 0]);

  return round({ r: R, g: G, b: B }, TYPES.RGB);
};

/**
 * Multi colors in RGB or hex formats
 * @param {Array<[number, number, number]|string>} colors - color in RGB or hex format
 * @returns {[number, number, number]} - mix color in RGB format
 */
const mixColorsMulti = (colors) => colors
  .reduce((rgbArr, initColor) => {
    const [r, g, b] = typeof initColor === 'string' ? HEXtoRGB(initColor) : initColor;
    const [prR, prG, prB] = rgbArr;
    return [prR * r, prG * g, prB * b];
  }, [1, 1, 1])
  .map(spec => Math.pow(spec, 1 / colors.length));


const getAverageXYZ = (colors) => {
  const [{ x: X, y: Y, z: Z }] = colors
    .reduce((xyzArr, initColor) => {
      const [color, percent = 0] = Array.isArray(initColor) ? initColor : [initColor, 0];
      const { x, y, z } = typeof color === 'string' ? RGBtoXYZ(HEXtoRGB(initColor)) : color;
      const [{ x: prX, y: prY, z: prZ }] = xyzArr;
      return [{
        x: prX + x * percent,
        y: prY + y * percent,
        z: prZ + z * percent,
      }, 0];
    }, [{ x: 0, y: 0, z: 0 }, 0]);

  return round({ x: X, y: Y, z: Z }, TYPES.XYZ);
};

const getAverageCMYK = (colors) => {
  const xyzColors = colors.map(({ color, percent }) => [CMYKtoXYZ(color), percent]);
  const xyzAverage = getAverageXYZ(xyzColors);
  return XYZtoCMYK(xyzAverage);
};

export {
  mixColors,
  mixColorsMulti,
  getAverageXYZ,
  getAverageCMYK,
};