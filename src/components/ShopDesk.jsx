// src/components/ShopDesk.jsx
import { useState } from 'react';
import styles from './ShopDesk.module.css';
import ShopModal from './ShopModal';

const ShopDesk = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={styles.shopDesk} onClick={() => setIsModalOpen(true)}>
        <span className={styles.shopIcon}>🏪</span>
        <span className={styles.shopLabel}>상점</span>
      </div>

      {isModalOpen && <ShopModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default ShopDesk;
