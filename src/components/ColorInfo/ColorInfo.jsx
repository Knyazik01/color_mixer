import styles from './ColorInfo.module.scss';
import { TYPES } from '../../constants';

const ColorInfo = ({ info }) => {
  const formats = [TYPES.CMYK, TYPES.RGB, TYPES.HEX, TYPES.XYZ];
  const titles = {
    [TYPES.CMYK]: 'CMYK',
    [TYPES.RGB]: 'RGB',
    [TYPES.XYZ]: 'XYZ',
    [TYPES.HEX]: 'HEX',
  };
  return (
    <div className={styles.content}>
      {
        formats.map(format => (
            info[format] && (
              <div key={format} className={styles.formatRow}>
                <p className={styles.title}>{titles[format]}:</p>
                <p className={styles.value}>{info[format]}</p>
              </div>
            )
          ),
        )
      }
    </div>
  );
};

export default ColorInfo;