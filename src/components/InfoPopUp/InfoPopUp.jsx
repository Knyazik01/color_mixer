import classNames from 'classnames';
import { POSITIONS } from '../../constants';
import styles from './InfoPopUp.module.scss';

const InfoPopUp = ({
  className,
  children,
  position = POSITIONS.BOTTOM,
}) => (
  <div className={classNames(styles.popUp, styles[position], className)}>
    {children}
  </div>
);

export default InfoPopUp;
