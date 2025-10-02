import type { BubbleConfig } from '../types'
import { BUBBLE } from '../constants'

const { LEFT_NEAR, LEFT_FAR, RIGHT_NEAR, RIGHT_FAR } = BUBBLE.POSITIONS

export const bubbleConfigs: BubbleConfig[] = [
  {
    id: 1,
    text: "Tell me about your projects",
    basePosition: { x: LEFT_FAR, y: 15 },
  },
  {
    id: 2,
    text: "What technologies do you use?",
    basePosition: { x: RIGHT_FAR, y: 30 },
  },
  {
    id: 3,
    text: "Share your experience",
    basePosition: { x: LEFT_NEAR, y: 60 },
  },
  {
    id: 4,
    text: "What's your background?",
    basePosition: { x: RIGHT_NEAR, y: 75 },
  },
]
