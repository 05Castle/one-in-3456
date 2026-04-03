// src/components/Character.jsx
import styles from './Character.module.css';
import useGameStore from '../store/useGameStore';

const Character = ({ isHidden }) => {
  const characterSrc = useGameStore((state) => state.characterSrc);

  return (
    <img
      src={characterSrc}
      className={`${styles.character} ${isHidden ? styles.hidden : ''}`}
      alt="character"
    />
  );
};

export default Character;
