// src/scenes/CorridorScene.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useGameStore from '../store/useGameStore';
import { FLOOR } from '../constants/gameStore';
import Corridor from '../components/Corridor';
import Inventory from '../components/Inventory';
import styles from './CorridorScene.module.css';

const CorridorScene = () => {
  const navigate = useNavigate();
  const {
    currentFloor,
    doors,
    inventory,
    hasUsedItemThisFloor,
    revealedElevatorIndex,
    selectDoor,
  } = useGameStore();

  const [overlay, setOverlay] = useState(null);
  const [isCharacterHidden, setIsCharacterHidden] = useState(false);
  const [isDoorLocked, setIsDoorLocked] = useState(false);

  const isLobby = currentFloor === FLOOR.LOBBY;

  const showOverlay = (overlayData, callback) => {
    setOverlay(overlayData);
    setTimeout(() => {
      setOverlay(null);
      setIsCharacterHidden(false);
      if (callback) callback();
    }, 300);
  };

  const handleDoorClick = (index) => {
    if (isDoorLocked) return;
    setIsDoorLocked(true); // 클릭 즉시 잠금

    const result = selectDoor(index);
    if (!result) {
      setIsDoorLocked(false);
      return;
    }

    switch (result.result) {
      case 'safety_helmet':
        setIsDoorLocked(false); // 재시도 가능하게 즉시 해제
        break;

      case 'lobby_reset':
        setIsDoorLocked(false); // 재시도 가능하게 즉시 해제
        setIsCharacterHidden(false);
        break;

      case 'clear':
        setIsCharacterHidden(true);
        navigate('/clear');
        break;

      case 'elevator':
        setIsCharacterHidden(true);
        showOverlay(
          {
            type: 'reset',
            message: '엘리베이터에 탑승당했다!',
            earnedCoins: result.earnedCoins,
          },
          () => {
            setIsDoorLocked(false);
            navigate('/game');
          },
        );
        break;

      case 'fart_bomb':
        setIsCharacterHidden(true);
        showOverlay(
          { type: 'down', message: `${result.newFloor}층으로 내려갔어...` },
          () => {
            setIsDoorLocked(false);
            navigate('/game');
          },
        );
        break;

      case 'stair_up':
        setIsCharacterHidden(true);
        showOverlay(
          { type: 'success', message: `${result.newFloor}층 도착!` },
          () => {
            setIsDoorLocked(false);
            navigate('/game');
          },
        );
        break;

      case 'stair_down':
        setIsCharacterHidden(true);
        showOverlay(
          { type: 'down', message: `${result.newFloor}층으로 내려갔어...` },
          () => {
            setIsDoorLocked(false);
            navigate('/game');
          },
        );
        break;

      default:
        setIsDoorLocked(false);
        break;
    }
  };

  return (
    <div className={styles.scene}>
      {/* 복도 */}
      <Corridor
        currentFloor={currentFloor}
        doors={doors}
        isLobby={isLobby}
        isCharacterHidden={isCharacterHidden}
        revealedElevatorIndex={revealedElevatorIndex}
        onDoorClick={handleDoorClick}
      />

      {/* 우측 하단 인벤토리 (fixed) */}
      <Inventory
        inventory={inventory}
        hasUsedItemThisFloor={hasUsedItemThisFloor}
        currentFloor={currentFloor}
      />

      {/* 결과 오버레이 */}
      <AnimatePresence>
        {overlay && (
          <motion.div
            className={`${styles.overlay} ${styles[overlay.type]}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {overlay.type === 'success' && (
              <p className={styles.overlayEmoji}>🎉</p>
            )}
            {overlay.type === 'down' && (
              <p className={styles.overlayEmoji}>😅</p>
            )}
            {overlay.type === 'reset' && (
              <p className={styles.overlayEmoji}>😱</p>
            )}
            <p className={styles.overlayMessage}>{overlay.message}</p>
            {overlay.earnedCoins !== undefined && (
              <p className={styles.overlayCoins}>
                🪙 {overlay.earnedCoins} 코인 획득
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CorridorScene;
