import { round } from './colorConverting';
import { TYPES } from '../constants';

const randomColorCMYK = () => round({
  c: Math.random(),
  m: Math.random(),
  y: Math.random(),
  k: 0,
}, TYPES.CMYK);

export {
  randomColorCMYK,
};