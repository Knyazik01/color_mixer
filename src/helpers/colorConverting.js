import { normalizeNumber } from './formaters';
import './types';
import { TYPES } from '../constants';

const round = (color, type) => {
  switch ( type ) {
    case TYPES.RGB: {
      return {
        r: Math.round(color.r),
        g: Math.round(color.g),
        b: Math.round(color.b),
      };
    }
    case TYPES.CMYK: {
      return {
        c: Math.round(color.c * 100) / 100,
        m: Math.round(color.m * 100) / 100,
        y: Math.round(color.y * 100) / 100,
        k: Math.round(color.k * 100) / 100,
      };
    }
    case TYPES.XYZ: {
      return {
        x: Math.round(color.x * 1000) / 1000,
        y: Math.round(color.y * 1000) / 1000,
        z: Math.round(color.z * 1000) / 1000,
      };
    }
    default:
      return color;
  }
};

/**
 * This function convert number from 16-th sys (string) to 10-th sys
 * @param {string} string
 * @returns {number}
 */
const toNumber = (string) => parseInt(string, 16);

/**
 * This function convert number from 10-th sys to 16-th sys
 * @param {number} number
 * @returns {string}
 */
const toString = (number) => number.toString(16).toUpperCase();

/**
 * Convert hex color to RGB format
 * @param {HEX} hexString - hex format
 * @returns {RGB} - RGB format
 */
const HEXtoRGB = (hexString) => {
  const hex = hexString.startsWith('#') ? hexString.slice(1) : hexString;
  const [r, g, b] = hex.split(/(.{2})/).filter(itm => !!itm).map(toNumber);
  return round({ r, g, b }, TYPES.RGB);
};

/**
 * Convert RGB color to hex format
 * @param {RGB} color - RGB color
 * @returns {HEX} - hex format
 * @constructor
 */
const RGBtoHEX = ({ r = 0, g = 0, b = 0 }) => {
  return '#' + [r, g, b].map(itm => normalizeNumber(toString(itm))).join('');
};

/**
 * Convert RGB color to CMYK format
 * @param {RGB} color - RGB color
 * @returns {CMYK} - CMYK format
 */
const RGBtoCMYK = ({ r = 0, g = 0, b = 0 }) => {
  const dr = r / 255;
  const dg = g / 255;
  const db = b / 255;
  const max = Math.max(dr, dg, db);
  const k = 1 - max;
  let c = 0, m = 0, y = 0;
  if (k !== 1) {
    c = (1 - dr - k) / (1 - k);
    m = (1 - dg - k) / (1 - k);
    y = (1 - db - k) / (1 - k);
  }
  return round({ c, m, y, k }, TYPES.CMYK);
};

/**
 * Convert CMYK color to RGB format
 * @param {CMYK} color - CMYK format
 * @returns {RGB} - RGB format
 */
const CMYKtoRGB = ({ c = 0, m = 0, y = 0, k = 0 }) => {
  const r = 255 * (1 - c) * (1 - k);
  const g = 255 * (1 - m) * (1 - k);
  const b = 255 * (1 - y) * (1 - k);
  return round({ r, g, b }, TYPES.RGB);
};

/**
 * Convert CMYK color to hex format
 * @param {CMYK} cmyk - CMYK format
 * @returns {HEX} - hex format
 */
const CMYKtoHEX = (cmyk) => {
  const rgb = CMYKtoRGB(cmyk);
  return RGBtoHEX(rgb);
};

/**
 * Convert hex color to CMYK format
 * @param {HEX} hex - HEX format
 * @returns {CMYK} - CMYK color
 */
const HEXtoCMYK = (hex) => {
  const rgb = HEXtoRGB(hex);
  return RGBtoCMYK(rgb);
};


const multiRGBtoXYZ = [
  [0.4185, 0.0912, 0.0009],
  [0.2588, 0.2524, 0.0025],
  [0.0829, 0.0157, 0.1786],
];

// const multi_sRBGtoXYZ = [
//   [0.4124, 0.3576, 0.1805],
//   [0.2126, 0.7152, 0.0722],
//   [0.0193, 0.1192, 0.9505],
// ];

/// https://www.image-engineering.de/library/technotes/958-how-to-convert-between-srgb-and-ciexyz
// const multi_sRBGtoXYZ = [
//   [0.4124564, 0.3575761, 0.1804375],
//   [0.2126729, 0.7151522, 0.0721750],
//   [0.0193339, 0.1191920, 0.9503041],
// ];

// const multiXYZtoRGB = [
//   [3.0770298160723987736, -1.1118305079715171852, 0.000057387656571299366193],
//   [-3.1436432216239222668, 5.1013179148500861027, -0.055565598475160611517],
//   [-1.1519069046635289963, 0.067637501946766085357, 5.6039620518439544285],
// ];

const multiXYZtoRGB = [
  [3.077, -1.1118, 0.0001],
  [-3.1436, 5.1013, -0.0556],
  [-1.1519, 0.0676, 5.604],
];

const RGBtoXYZ = ({ r = 0, g = 0, b = 0 }) => {
  const [x, y, z] = multiRGBtoXYZ.map(([mr, mg, mb]) => mr * r + mg * g + mb * b);
  return round({ x, y, z }, TYPES.XYZ);
};

const XYZtoRGB = ({ x, y, z }) => {
  const [r, g, b] = multiXYZtoRGB.map(([mx, my, mz]) => mx * x + my * y + mz * z);
  return round({ r, g, b }, TYPES.RGB);
};

const CMYKtoXYZ = (cmyk) => {
  const rgb = CMYKtoRGB(cmyk);
  return RGBtoXYZ(rgb);
};

const XYZtoCMYK = (xyz) => {
  const rgb = XYZtoRGB(xyz);
  return RGBtoCMYK(rgb);
};

export {
  round,
  toNumber,
  toString,
  HEXtoRGB,
  RGBtoHEX,
  RGBtoCMYK,
  CMYKtoRGB,
  CMYKtoHEX,
  HEXtoCMYK,
  RGBtoXYZ,
  XYZtoRGB,
  CMYKtoXYZ,
  XYZtoCMYK,
};