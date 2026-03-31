// src/components/ShopModal.jsx
import styles from './ShopModal.module.css';
import { ITEM } from '../constants/gameStore';
import useGameStore from '../store/useGameStore';

const ShopModal = ({ onClose }) => {
  const { coins, inventory, buyItem } = useGameStore();

  const items = Object.values(ITEM);

  const getButtonState = (item) => {
    if (inventory.includes(item.id)) return 'owned';
    if (coins < item.price) return 'poor';
    if (inventory.length >= 3) return 'full';
    return 'buyable';
  };

  const buttonLabel = {
    owned: '보유중',
    poor: '코인부족',
    full: '슬롯부족',
    buyable: '구매',
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* 헤더 */}
        <div className={styles.header}>
          <h2 className={styles.title}>🏪 리셉션 데스크</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* 보유 코인 */}
        <p className={styles.coins}>🪙 보유 코인: {coins}</p>

        {/* 아이템 목록 */}
        <ul className={styles.itemList}>
          {items.map((item) => {
            const state = getButtonState(item);
            return (
              <li key={item.id} className={styles.itemRow}>
                <div className={styles.itemInfo}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemPrice}>🪙 {item.price}</span>
                </div>
                <button
                  className={`${styles.buyBtn} ${styles[state]}`}
                  disabled={state !== 'buyable'}
                  onClick={() => buyItem(item.id, item.price)}
                >
                  {buttonLabel[state]}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ShopModal;
