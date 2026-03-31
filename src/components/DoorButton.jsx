// src/components/DoorButton.jsx
import styles from './DoorButton.module.css';
import { DOOR_TYPE } from '../constants/gameStore';

const DoorButton = ({ index, doorType, isRevealed, onClick, disabled }) => {
  const doorColorClass = {
    [DOOR_TYPE.STAIR_UP]: styles.stairUp,
    [DOOR_TYPE.STAIR_DOWN]: styles.stairDown,
    [DOOR_TYPE.ELEVATOR]: styles.elevator,
  }[doorType];

  return (
    <div
      className={`${styles.door} ${doorColorClass} ${isRevealed ? styles.revealed : ''} ${disabled ? styles.disabled : ''}`}
      onClick={disabled ? undefined : onClick}
    >
      <span className={styles.doorNumber}>{index + 1}</span>
      {isRevealed && <span className={styles.elevatorBadge}>🛗</span>}
    </div>
  );
};

export default DoorButton;
