import classNames from 'classnames';
import styles from './Button.module.scss';

const Button = ({
  children, submit = false, disabled = false, className = '', onClick,
}) => (
  <button
    type={submit ? 'submit' : 'button'}
    disabled={disabled}
    onClick={onClick}
    className={classNames(className, styles.button)}
  >
    {children}
  </button>
);

export default Button;
