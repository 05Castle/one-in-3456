// src/scenes/ClearScene.jsx
import { useNavigate } from 'react-router-dom';
import useGameStore from '../store/useGameStore';
import styles from './ClearScene.module.css';

const ClearScene = () => {
  const navigate = useNavigate();
  const { resetCount, doorPickCount, resetGame } = useGameStore();

  const handleGoLeaderboard = () => navigate('/leaderboard');

  const handleGoTitle = () => {
    resetGame();
    navigate('/');
  };

  return (
    <div className={styles.scene}>
      <div className={styles.stage}>
        <p className={styles.emoji}>🏠</p>
        <p className={styles.title}>친구집 도착!</p>
        <p className={styles.dialogue}>
          "야이 자식아, 왜 방문자 명단에 안 올려놓은 거야!!"
        </p>
      </div>

      <div className={styles.record}>
        <h2 className={styles.recordTitle}>최종 기록</h2>
        <p className={styles.recordItem}>🔄 리셋 횟수: {resetCount}회</p>
        <p className={styles.recordItem}>🚪 총 문 선택: {doorPickCount}회</p>
      </div>

      <div className={styles.buttons}>
        <button className={styles.btn} onClick={handleGoLeaderboard}>
          리더보드 등록
        </button>
        <button className={styles.btn} onClick={handleGoTitle}>
          타이틀로
        </button>
      </div>
    </div>
  );
};

export default ClearScene;
