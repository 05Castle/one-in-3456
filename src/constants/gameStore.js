// src/constants/gameStore.js

// ── 층 구조 ──────────────────────────────
export const FLOOR = {
  LOBBY: 0,
  LOW_MIN: 1,
  LOW_MAX: 6,
  HIGH_MIN: 7,
  HIGH_MAX: 9,
  CLEAR: 10,
};

// ── 문 개수 ──────────────────────────────
export const DOOR_COUNT = {
  LOW: 2, // 1~6층
  HIGH: 3, // 7~9층
};

// ── 문 타입 ──────────────────────────────
export const DOOR_TYPE = {
  STAIR_UP: 'stair_up', // 위층 계단
  STAIR_DOWN: 'stair_down', // 아래층 계단 (고층부 전용)
  ELEVATOR: 'elevator', // 엘리베이터 (리셋)
};

// ── 아이템 ───────────────────────────────
export const ITEM = {
  RUNNING_SHOES: {
    id: 'running_shoes',
    name: '러닝화',
    price: 3,
    floorMin: 1,
    floorMax: 5,
  },
  FART_BOMB: {
    id: 'fart_bomb',
    name: '방귀폭탄',
    price: 4,
    floorMin: 1,
    floorMax: 5,
  },
  SAFETY_HELMET: {
    id: 'safety_helmet',
    name: '안전모',
    price: 5,
    floorMin: 1,
    floorMax: 5,
  },
  VISITOR_CARD: {
    id: 'visitor_card',
    name: '1회용방문자카드',
    price: 7,
    floorMin: 0, // 로비 전용
    floorMax: 0,
  },
  REMOTE_CONTROL: {
    id: 'remote_control',
    name: '원격리모컨',
    price: 10,
    floorMin: 3,
    floorMax: 8,
  },
};

// ── 인벤토리 ─────────────────────────────
export const INVENTORY_MAX_SLOTS = 3;

// ── 리더보드 ─────────────────────────────
export const LEADERBOARD_MAX = 10; // 상위 10개만 저장
