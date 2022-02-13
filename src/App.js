import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import state from './store/state';
import AppInfoBlock from './components/AppInfoBlock';
import ColorInfo from './components/ColorInfo';
import AddedColorCard from './components/AddedColorCard';
import { CMYKtoHEX, deleteAddedColor, getStringsFromCMYK, updateColorPercent, updateStoreColors } from './helpers';
import AddColorButton from './components/AddColorButton';
import styles from './App.module.scss';
import classNames from 'classnames';

const App = () => {
  const { addedColors, averageColor, isPercentValid } = useSnapshot(state);

  const colorInfo = averageColor && getStringsFromCMYK(averageColor);
  const shouldShowAddColorButton = addedColors.length < 10;

  useEffect(() => {
    const initColors = [
      { color: { c: 1, y: 1 }, hex: CMYKtoHEX({ c: 1, y: 1 }), percent: 0.7 },
      { color: { y: 1, m: 1 }, hex: CMYKtoHEX({ y: 1, m: 1 }), percent: 0.3 },
    ];
    updateStoreColors(initColors);
  }, []);
  return (
    <div className={styles.app}>
      <div className={styles.infoAndResultBlock}>
        <AppInfoBlock />
        {averageColor && (
          <div className={styles.resultColorBlock}>
            <ColorInfo info={colorInfo} />
            <div className={styles.resultColorWrapper}>
              <div
                className={classNames(styles.resultColor, { [styles.invalid]: !isPercentValid })}
                style={{ backgroundColor: CMYKtoHEX(averageColor) }}
              />
              {
                !isPercentValid && (
                  <p className={styles.error}>Сума відсотків більше 100</p>
                )
              }
            </div>
          </div>
        )}
      </div>
      <div className={styles.addedColors}>
        {
          addedColors.map((color) => (
              <AddedColorCard
                key={color.hex}
                color={color}
                deleteColor={deleteAddedColor}
                updateColorPercent={updateColorPercent}
              />
            ),
          )
        }
        {
          shouldShowAddColorButton && (
            <AddColorButton />
          )
        }
      </div>
    </div>
  );
};

export default App;
