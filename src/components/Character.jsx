// src/components/Character.jsx
import styles from './Character.module.css';

const Character = ({ isHidden }) => {
  return (
    <div className={`${styles.character} ${isHidden ? styles.hidden : ''}`} />
  );
};

export default Character;
