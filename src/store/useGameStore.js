// src/store/useGameStore.js
import { create } from 'zustand';
import { FLOOR, DOOR_TYPE, INVENTORY_MAX_SLOTS } from '../constants/gameStore';

const shuffleDoors = (floor) => {
  const isHigh = floor >= FLOOR.HIGH_MIN && floor <= FLOOR.HIGH_MAX;
  let doors = isHigh
    ? [DOOR_TYPE.STAIR_UP, DOOR_TYPE.STAIR_DOWN, DOOR_TYPE.ELEVATOR]
    : [DOOR_TYPE.STAIR_UP, DOOR_TYPE.ELEVATOR];

  for (let i = doors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doors[i], doors[j]] = [doors[j], doors[i]];
  }
  return doors;
};

const initialState = {
  currentFloor: FLOOR.LOBBY,
  doors: shuffleDoors(FLOOR.LOBBY),
  coins: 0,
  inventory: [],
  hasUsedItemThisFloor: false,
  activeItem: null,
  revealedElevatorIndex: null,
  resetCount: 0,
  doorPickCount: 0,
};

const useGameStore = create((set, get) => ({
  ...initialState,

  arriveAtFloor: (floor) => {
    set({
      currentFloor: floor,
      doors: shuffleDoors(floor),
      hasUsedItemThisFloor: false,
      activeItem: null,
      revealedElevatorIndex: null,
    });
  },

  selectDoor: (index) => {
    const {
      doors,
      currentFloor,
      coins,
      resetCount,
      doorPickCount,
      activeItem,
    } = get();
    const doorType = doors[index];
    const newDoorPickCount = doorPickCount + 1;

    if (doorType === DOOR_TYPE.ELEVATOR) {
      // 안전모 발동
      if (activeItem === 'safety_helmet') {
        get().triggerSafetyHelmet();
        set({ doorPickCount: newDoorPickCount });
        return { result: 'safety_helmet' };
      }

      // 방귀폭탄 발동
      if (activeItem === 'fart_bomb') {
        const newFloor = Math.max(currentFloor - 1, FLOOR.LOBBY);
        set({ doorPickCount: newDoorPickCount, activeItem: null });
        get().arriveAtFloor(newFloor);
        return { result: 'fart_bomb', newFloor };
      }

      // 로비층에서 엘리베이터 선택 → 재셔플
      if (currentFloor === FLOOR.LOBBY) {
        set({ doorPickCount: newDoorPickCount, activeItem: null });
        get().arriveAtFloor(FLOOR.LOBBY);
        return { result: 'lobby_reset' };
      }

      // 일반 엘리베이터: 로비 리셋 + 코인 지급
      const earnedCoins = currentFloor;
      set({
        coins: coins + earnedCoins,
        resetCount: resetCount + 1,
        doorPickCount: newDoorPickCount,
        activeItem: null,
        currentFloor: FLOOR.LOBBY,
        doors: shuffleDoors(FLOOR.LOBBY),
      });
      return { result: 'elevator', earnedCoins };
    }

    if (doorType === DOOR_TYPE.STAIR_UP) {
      const bonus = activeItem === 'running_shoes' ? 2 : 1;
      const newFloor = currentFloor + bonus;
      set({ doorPickCount: newDoorPickCount, activeItem: null });

      if (newFloor >= FLOOR.CLEAR) {
        set({ currentFloor: FLOOR.CLEAR });
        return { result: 'clear' };
      }
      get().arriveAtFloor(newFloor);
      return { result: 'stair_up', newFloor };
    }

    if (doorType === DOOR_TYPE.STAIR_DOWN) {
      const newFloor = currentFloor - 1;
      set({ doorPickCount: newDoorPickCount, activeItem: null });
      get().arriveAtFloor(newFloor);
      return { result: 'stair_down', newFloor };
    }
  },

  triggerSafetyHelmet: () => {
    const { currentFloor } = get();
    set({ doors: shuffleDoors(currentFloor), activeItem: null });
  },

  useItem: (itemId) => {
    const { inventory, doors } = get();
    const newInventory = inventory.filter((id) => id !== itemId);

    if (itemId === 'remote_control') {
      const elevatorIndex = doors.indexOf(DOOR_TYPE.ELEVATOR);
      set({
        inventory: newInventory,
        hasUsedItemThisFloor: true,
        activeItem: itemId,
        revealedElevatorIndex: elevatorIndex,
      });
      return;
    }

    if (itemId === 'visitor_card') {
      const randomFloor = Math.floor(Math.random() * 5) + 1;
      set({
        inventory: newInventory,
        hasUsedItemThisFloor: true,
        activeItem: null,
      });
      get().arriveAtFloor(randomFloor);
      return { result: 'visitor_card', randomFloor };
    }

    set({
      inventory: newInventory,
      hasUsedItemThisFloor: true,
      activeItem: itemId,
    });
  },

  buyItem: (itemId, price) => {
    const { coins, inventory } = get();
    if (coins < price) return;
    if (inventory.length >= INVENTORY_MAX_SLOTS) return;
    if (inventory.includes(itemId)) return;
    set({ coins: coins - price, inventory: [...inventory, itemId] });
  },

  resetGame: () => set({ ...initialState, doors: shuffleDoors(FLOOR.LOBBY) }),
}));

export default useGameStore;
