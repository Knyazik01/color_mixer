import './types';
import { CMYKtoHEX, CMYKtoRGB, CMYKtoXYZ, RGBtoCMYK, round } from './colorConverting';
import { TYPES } from '../constants';

const normalizeNumber = (number) => {
  if (number === null || number === undefined) return;
  const strNum = `${number}`;
  return strNum.padStart(2, '0');
};

/**
 * Convert RGB format to CSS rgb color
 * @param {RGB|CMYK|HEX|XYZ} initColor - RBG format
 * @param {string} type
 * @returns {string} - rgb(r, g, b)
 */
const toColorSting = (initColor, type) => {
  const color = round(initColor, type);
  switch ( type ) {
    case TYPES.RGB: {
      const { r, g, b } = color;
      return `rgb(${r}, ${g}, ${b})`;
    }
    case TYPES.CMYK: {
      const { c, m, y, k } = color;
      const [cPer, mPer, yPer, kPer] = [c, m, y, k].map(col => Math.round(col * 100));
      return `cmyk(${cPer}%, ${mPer}%, ${yPer}%, ${kPer}%)`;
    }
    case TYPES.XYZ: {
      const { x, y, z } = color;
      return `xyz(${x}, ${y}, ${z})`;
    }
    default:
      return color;
  }
};

/**
 * Return formatted string in RGB,CMYK,HEX,XYZ formats
 * @param {CMYK} cmyk - CMYK format
 * @returns {{CMYK : string, XYZ : string, HEX : string, RGB : string}}
 */
const getStringsFromCMYK = (cmyk) => {
  const rgb = CMYKtoRGB(cmyk);
  const hex = CMYKtoHEX(cmyk);
  const xyz = CMYKtoXYZ(cmyk);
  const normalizeCMYK = RGBtoCMYK(CMYKtoRGB(cmyk));
  return ({
    [TYPES.CMYK]: toColorSting(normalizeCMYK, TYPES.CMYK),
    [TYPES.RGB]: toColorSting(rgb, TYPES.RGB),
    [TYPES.XYZ]: toColorSting(xyz, TYPES.XYZ),
    [TYPES.HEX]: toColorSting(hex, TYPES.HEX),
  });
};

export {
  normalizeNumber,
  toColorSting,
  getStringsFromCMYK,
};