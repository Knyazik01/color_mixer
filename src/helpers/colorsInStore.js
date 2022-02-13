import { CMYKtoHEX } from './colorConverting';
import state from '../store/state';
import { updateAddedColors, updateAverage, updateIsPercentValid } from '../store/actions';
import { MESSAGES } from '../constants';
import { getAverageCMYK } from './colorMixing';

const isPercentValid = (addedColors = state.addedColors) => {
  const percentSum = addedColors.reduce((sum, { percent }) => sum + percent, 0);
  return {
    isValid: percentSum === 1,
    percentSum,
  };
};

const calcAndUpdateAverage = (colors = state.addedColors) => {
  const average = colors.length ? getAverageCMYK(colors) : null;
  updateAverage(average);
};

const updateStoreColors = (newAddedColors) => {
  updateAddedColors(newAddedColors);
  calcAndUpdateAverage(newAddedColors);
  const { isValid } = isPercentValid(newAddedColors);
  updateIsPercentValid(isValid);
};

const addNewColor = (colorToAdd, percent = 0) => {
  const hex = CMYKtoHEX(colorToAdd);
  const isNew = !!state.addedColors.find(({ color }) => CMYKtoHEX(color) === hex);
  if (!isNew) {
    const newAddedColors = [...state.addedColors, { color: colorToAdd, percent, hex }];
    updateStoreColors(newAddedColors);
    return MESSAGES.SUCCESS;
  } else {
    return MESSAGES.ALREADY_EXIST;
  }
};

const deleteAddedColor = (hexToDelete) => {
  const { percent: removePercent } = state.addedColors.find(({ color }) => CMYKtoHEX(color) === hexToDelete);
  const restPercent = 1 - removePercent;
  const newAddedColors = state.addedColors.reduce((acc, color) => {
    const isDeleted = color.hex === hexToDelete;
    return isDeleted
      ? acc
      : [
        ...acc,
        {
          ...color,
          percent: +(color.percent / restPercent).toFixed(2),
        },
      ];
  }, []);
  const { isValid, percentSum } = isPercentValid(newAddedColors);
  if (isValid) {
    updateStoreColors(newAddedColors);
  } else {
    const percentDiff = percentSum - 1;
    const maxPercent = Math.max(...newAddedColors.map(({ percent }) => percent));
    const updatedAddedColors = newAddedColors.map(color => ({
      ...color,
      percent: color.percent === maxPercent
        ? color.percent - percentDiff
        : color.percent,
    }));
    updateStoreColors(updatedAddedColors);
  }
};

const updateColorPercent = (hex, newPercent) => {
  const newAddedColors = state.addedColors.map(color => (
    hex === color.hex
      ? ({
        ...color,
        percent: newPercent,
      })
      : color));
  updateStoreColors(newAddedColors);
};

const updateColorValue = (hex, newColor) => {
  const newAddedColors = state.addedColors.map(color => (
    hex === color.hex
      ? ({
        ...color,
        hex: CMYKtoHEX(newColor),
        color: newColor,
      })
      : color));
  updateStoreColors(newAddedColors);
};

export {
  addNewColor,
  calcAndUpdateAverage,
  deleteAddedColor,
  updateColorPercent,
  updateColorValue,
  updateStoreColors,
};