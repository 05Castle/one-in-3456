// src/components/ItemButton.jsx
import { useState } from 'react';
import styles from './ItemButton.module.css';
import { ITEM } from '../constants/gameStore';
import useGameStore from '../store/useGameStore';

const ItemButton = ({ itemId, hasUsedItemThisFloor, currentFloor }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const applyItem = useGameStore((state) => state.useItem);

  // 빈 슬롯
  if (!itemId) {
    return <div className={styles.slotEmpty} />;
  }

  const item = Object.values(ITEM).find((i) => i.id === itemId);

  // 이번 층에서 사용 가능한지 체크
  const isUsable =
    !hasUsedItemThisFloor &&
    currentFloor >= item.floorMin &&
    currentFloor <= item.floorMax;

  const handleClick = () => {
    if (!isUsable) return;
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    applyItem(itemId);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <div
        className={`${styles.slot} ${!isUsable ? styles.disabled : ''}`}
        onClick={handleClick}
      >
        <span className={styles.itemName}>{item.name}</span>
      </div>

      {/* 사용 확인 팝업 */}
      {showConfirm && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmBox}>
            <p className={styles.confirmMessage}>
              {item.name}을(를) 사용하시겠습니까?
            </p>
            <div className={styles.confirmButtons}>
              <button className={styles.confirmYes} onClick={handleConfirm}>
                예
              </button>
              <button className={styles.confirmNo} onClick={handleCancel}>
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemButton;
