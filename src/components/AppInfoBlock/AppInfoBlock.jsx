import styles from './AppInfoBlock.module.scss';

const AppInfoBlock = () => (
  <div className={styles.content}>
    <p className={styles.title}>Your Colour</p>
    <p className={styles.description}>Інтерактивний сервіс для оцінки кольоровідтворення при друці</p>
  </div>
);

export default AppInfoBlock;