// src/scenes/LeaderboardScene.jsx
import { useNavigate } from 'react-router-dom';
import styles from './LeaderboardScene.module.css';

const LeaderboardScene = () => {
  const navigate = useNavigate();

  const dummyRecords = [
    { rank: 1, name: '홍길동', resetCount: 0, doorPickCount: 9 },
    { rank: 2, name: '김철수', resetCount: 1, doorPickCount: 12 },
    { rank: 3, name: '이영희', resetCount: 2, doorPickCount: 15 },
  ];

  return (
    <div className={styles.scene}>
      <h1 className={styles.title}>리더보드</h1>

      <div className={styles.table}>
        <div className={`${styles.row} ${styles.tableHeader}`}>
          <span>순위</span>
          <span>닉네임</span>
          <span>리셋</span>
          <span>문 선택</span>
        </div>
        {dummyRecords.map((record) => (
          <div key={record.rank} className={styles.row}>
            <span>{record.rank}</span>
            <span>{record.name}</span>
            <span>{record.resetCount}회</span>
            <span>{record.doorPickCount}회</span>
          </div>
        ))}
      </div>

      <button className={styles.btn} onClick={() => navigate('/')}>
        타이틀로
      </button>
    </div>
  );
};

export default LeaderboardScene;
