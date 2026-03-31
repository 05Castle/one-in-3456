// src/components/Corridor.jsx
import styles from './Corridor.module.css';
import Character from './Character';
import DoorButton from './DoorButton';
import ShopDesk from './ShopDesk';

const Corridor = ({
  currentFloor,
  doors,
  isLobby,
  isCharacterHidden,
  revealedElevatorIndex,
  onDoorClick,
  isDoorLocked, // 추가
}) => {
  return (
    <div className={styles.corridor}>
      {/* 벽 영역 */}
      <div className={styles.wall}>
        {/* 로비층일 때만 상점 */}
        {isLobby && <ShopDesk />}

        {/* 문들 - 로비 포함 항상 표시 */}
        {doors.map((doorType, index) => (
          <DoorButton
            key={`${currentFloor}-${index}`}
            index={index}
            doorType={doorType}
            isRevealed={revealedElevatorIndex === index}
            onClick={() => onDoorClick(index)}
            disabled={isDoorLocked}
          />
        ))}
      </div>

      {/* 바닥 영역 */}
      <div className={styles.floor}>
        <Character isHidden={isCharacterHidden} />
      </div>
    </div>
  );
};

export default Corridor;
