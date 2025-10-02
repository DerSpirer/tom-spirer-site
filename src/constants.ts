export const CHAT_WINDOW = {
  MAX_WIDTH: '520px',
  HEIGHT: '650px',
  BORDER_RADIUS: '24px',
  INPUT_HEIGHT: '100px',
} as const;

export const BUBBLE = {
  WIDTH: 240,
  POSITIONS: {
    LEFT_NEAR: -400,
    LEFT_FAR: -420,
    RIGHT_NEAR: 400,
    RIGHT_FAR: 420,
  },
} as const;

export const BREAKPOINTS = {
  HIDE_BUBBLES: 1200,
} as const

export const API = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL,
  ENDPOINTS: {
    GENERATE_RESPONSE: '/api/Chat/GenerateResponse',
  },
} as const;
