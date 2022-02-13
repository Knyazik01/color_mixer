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
} from './colorConverting';

export {
  mixColors,
  mixColorsMulti,
  getAverageXYZ,
  getAverageCMYK,
} from './colorMixing';

export {
  normalizeNumber,
  toColorSting,
  getStringsFromCMYK,
} from './formaters';

export {
  randomColorCMYK,
} from './randomColor';

export {
  addNewColor,
  calcAndUpdateAverage,
  deleteAddedColor,
  updateColorPercent,
  updateColorValue,
  updateStoreColors,
} from './colorsInStore';