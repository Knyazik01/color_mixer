import Button from '../Button';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import styles from './AddedColorCard.module.scss';
import { useEffect, useState } from 'react';
import { REGEX } from '../../constants';

const AddedColorCard = ({ color, deleteColor, updateColorPercent }) => {
  const { hex, color: cmyk, percent: initPercent } = color;
  const { c = 0, m = 0, y = 0, k = 0 } = cmyk;

  const [percent, setPercent] = useState(initPercent * 100);
  useEffect(() => {
    const newValue = +(initPercent * 100).toFixed(0);
    setPercent(newValue);
  }, [initPercent]);

  const onInputChange = ({ target: { value } }) => {
    const isValid = REGEX.NUMBERS.test(value) && +value <= 100;
    isValid && setPercent(value);
  };

  return (
    <div className={styles.content} style={{ backgroundColor: hex }}>
      <Button
        onClick={() => deleteColor(hex)}
        className={styles.deleteButton}
      >
        <DeleteIcon className={styles.deleteIcon} />
      </Button>
      <div className={styles.infoBlock}>
        <p>C:</p>
        <p>{c}</p>
        <p>M:</p>
        <p>{m}</p>
        <p>Y:</p>
        <p>{y}</p>
        <p>K:</p>
        <p>{k}</p>
        <p>hex:</p>
        <p>{hex}</p>
      </div>
      <div className={styles.percentBlock}>
        <label className={styles.fieldPercent}>
          Percent:
          <input
            type='text'
            value={percent}
            className={styles.input}
            onChange={onInputChange}
          />
        </label>
        <Button
          onClick={() => {
            updateColorPercent(hex, percent / 100);
          }}
          className={styles.changeButton}
        >
          Change
        </Button>
      </div>
    </div>
  );
};

export default AddedColorCard;