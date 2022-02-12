import { useEffect, useState } from 'react';
import Slider from 'react-input-slider';
import Button from '../Button';
import { CMYKtoHEX, getStringsFromCMYK, randomColorCMYK, round } from '../../helpers';
import ColorInfo from '../ColorInfo';
import { REGEX, TYPES } from '../../constants';
import styles from './ColorPicker.module.scss';

const ColorPicker = ({ onSelect, initColor }) => {
  const random = randomColorCMYK();
  const initialColor = initColor ?? random;
  const [color, setColor] = useState(initialColor);
  useEffect(() => {
    initColor && setColor(initColor);
  }, [initColor]);

  const onColorRangeChange = ({ value, colorPart }) => {
    const newValue = round({ ...color, [colorPart]: value }, TYPES.CMYK);
    setColor(newValue);
  };

  const onInputChange = ({ value, colorPart }) => {
    const isValid = REGEX.NUMBERS.test(value) && +value <= 100;
    isValid && onColorRangeChange({ value: value / 100, colorPart });
  };

  const colorParts = ['c', 'm', 'y', 'k'];

  const formattedStrings = getStringsFromCMYK(color);
  return (
    <div className={styles.content}>
      <div className={styles.previewBlock}>
        <div className={styles.previewColor} style={{ backgroundColor: CMYKtoHEX(color) }} />
        <ColorInfo info={formattedStrings} />
      </div>
      <div className={styles.colorSliders}>
        {
          colorParts.map(colorPart => (
            <div key={colorPart} className={styles.colorBlock}>
              <div className={styles.inputBlock}>
                <input
                  type='text'
                  className={styles.input}
                  value={Math.trunc(color[colorPart] * 100)}
                  onChange={({ target: { value } }) => onInputChange({ value, colorPart })}
                />%
              </div>
              <Slider
                styles={sliderStyles(colorPart)}
                axis='x'
                xmin={0}
                xmax={1}
                xstep={0.01}
                x={color[colorPart]}
                onChange={({ x }) => onColorRangeChange({ value: x, colorPart })}
              />
            </div>
          ))
        }
      </div>
      <Button
        onClick={() => onSelect(color)}
        className={styles.submitButton}
      >
        Select
      </Button>
    </div>
  );
};

const sliderStyles = (cmykPart) => {
  const activeBg = CMYKtoHEX({ [cmykPart]: 1 });
  return ({
    track: {
      // backgroundColor: 'blue',
      width: '100%',
    },
    active: {
      backgroundColor: activeBg,
    },
    thumb: {
      width: 20,
      height: 20,
    },
    disabled: {
      opacity: 0.5,
    },
  });
};

export default ColorPicker;