// src/scenes/TitleScene.jsx
import { useNavigate } from 'react-router-dom';
import useGameStore from '../store/useGameStore';
import styles from './TitleScene.module.css';

const TitleScene = () => {
  const navigate = useNavigate();
  const resetGame = useGameStore((state) => state.resetGame);

  const handleStart = () => {
    resetGame();
    navigate('/game');
  };

  const handleLeaderboard = () => {
    navigate('/leaderboard');
  };

  return (
    <div className={styles.scene}>
      <h1 className={styles.title}>우리집에 놀러와</h1>
      <p className={styles.sub}>— 1 / 3456 —</p>
      <div className={styles.buttons}>
        <button className={styles.btn} onClick={handleStart}>
          게임 시작
        </button>
        <button className={styles.btn} onClick={handleLeaderboard}>
          리더보드
        </button>
      </div>
    </div>
  );
};

export default TitleScene;
