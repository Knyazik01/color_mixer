import state from './state';

const updateAddedColors = (newAddedColors) => {
  state.addedColors = newAddedColors;
};

const updateAverage = (newAverage) => {
  state.averageColor = newAverage;
};

const updateIsPercentValid = (newValid) => {
  state.isPercentValid = newValid;
};

export {
  updateAddedColors,
  updateAverage,
  updateIsPercentValid,
};