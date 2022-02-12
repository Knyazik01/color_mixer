import classNames from 'classnames';
import Portal from '../Portal';
import styles from './Modal.module.scss';

const Modal = ({
  children,
  className = '',
  onBackDropClick,
}) => {
  const handleClick = ({ target, currentTarget }) => {
    const shouldCloseModal = (target === currentTarget) && onBackDropClick;
    shouldCloseModal && onBackDropClick();
  };
  return (
    <Portal>
      <div
        className={classNames(styles.wrapper)}
        onMouseDown={handleClick}
        onKeyPress={() => {
        }}
        role='button'
        tabIndex='0'
      >
        <div className={classNames(styles.content, className)}>
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
