import { useEffect } from 'react';
import classNames from 'classnames';
import InfoPopUp from '../InfoPopUp';
import { POSITIONS, STATUSES } from '../../constants';
import styles from './PopUpMessage.module.scss';

const PopUpMessage = ({
  message,
  status = STATUSES.DEFAULT,
  timeout = 3000,
  hideMessage,
  position = POSITIONS.TOP,
}) => {
  const onMount = () => {
    setTimeout(hideMessage, timeout);
  };

  useEffect(onMount, [hideMessage, timeout]);

  return (
    <InfoPopUp position={position}>
      <div className={classNames(
        styles.content,
        { [styles.error]: status === STATUSES.FAIL },
        { [styles.success]: status === STATUSES.SUCCESS },
      )}
      >
        {message}
      </div>
    </InfoPopUp>
  );
};

export default PopUpMessage;
