// Layout constants
export const CHAT_WINDOW = {
  MAX_WIDTH: '420px',
  WIDTH_NUMERIC: 420, // For calculations
  HEIGHT: '650px',
  BORDER_RADIUS: '24px',
  INPUT_HEIGHT: '100px',
} as const

// Bubble layout constants
export const BUBBLE = {
  WIDTH: 240,
  HALF_WIDTH: 120, // WIDTH / 2
  MIN_DISTANCE_FROM_CENTER: 330, // CHAT_WINDOW.WIDTH_NUMERIC / 2 + BUBBLE.HALF_WIDTH
  POSITIONS: {
    LEFT_NEAR: -350,  // -(MIN_DISTANCE_FROM_CENTER + 20)
    LEFT_FAR: -370,   // -(MIN_DISTANCE_FROM_CENTER + 40)
    RIGHT_NEAR: 350,  // MIN_DISTANCE_FROM_CENTER + 20
    RIGHT_FAR: 370,   // MIN_DISTANCE_FROM_CENTER + 40
  },
} as const

// Responsive breakpoints
export const BREAKPOINTS = {
  HIDE_BUBBLES: 1200,
} as const

// API configuration
export const API = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://tomspirersite-hfdyg9ayewadckby.swedencentral-01.azurewebsites.net',
  ENDPOINTS: {
    GENERATE_RESPONSE: '/api/Chat/GenerateResponse',
  },
} as const
