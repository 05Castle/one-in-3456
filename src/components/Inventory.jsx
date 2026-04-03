// src/components/Inventory.jsx
import styles from './Inventory.module.css';
import ItemButton from './ItemButton';
import useGameStore from '../store/useGameStore';
import { INVENTORY_MAX_SLOTS } from '../constants/gameStore';

const Inventory = ({ inventory, hasUsedItemThisFloor, currentFloor }) => {
  const coins = useGameStore((state) => state.coins);

  // 빈 슬롯 포함한 3칸 배열 생성
  const slots = Array.from(
    { length: INVENTORY_MAX_SLOTS },
    (_, i) => inventory[i] || null,
  );

  return (
    <div className={styles.inventory}>
      <div className={styles.coinDisplay}>🪙 {coins}</div>
      <div className={styles.slots}>
        {slots.map((itemId, i) => (
          <ItemButton
            key={i}
            itemId={itemId}
            hasUsedItemThisFloor={hasUsedItemThisFloor}
            currentFloor={currentFloor}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
