import { proxy } from 'valtio';

const state = proxy({
  addedColors: [],
  averageColor: null,
  isPercentValid: true,
});

export default state;
