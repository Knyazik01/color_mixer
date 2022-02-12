import styles from './InputRange.module.scss';

const InputRange = ({
  name,
  id = name,
  value,
  onChange,
}) => {
  console.log('InputRange');
  return (
    <input
      id={id}
      type='range'
      name={name}
      value={value}
      onChange={onChange}
      className={styles.range}
    />
  );
};

export default InputRange;