import type { BubbleConfig } from '../types'
import { ANIMATION, BUBBLE } from '../constants'

const { LEFT_NEAR, LEFT_FAR, RIGHT_NEAR, RIGHT_FAR } = BUBBLE.POSITIONS

export const bubbleConfigs: BubbleConfig[] = [
  {
    id: 1,
    text: "Tell me about your projects",
    basePosition: { x: LEFT_FAR, y: 15 },
    floatParams: {
      amplitudeX: 15 * ANIMATION.DISTANCE_FACTOR,
      amplitudeY: 20 * ANIMATION.DISTANCE_FACTOR,
      speedX: 0.0008 * ANIMATION.SPEED_FACTOR,
      speedY: 0.0012 * ANIMATION.SPEED_FACTOR,
      rotationAmplitude: 3 * ANIMATION.DISTANCE_FACTOR,
      rotationSpeed: 0.001 * ANIMATION.SPEED_FACTOR,
      phaseX: 0,
      phaseY: 0,
    },
  },
  {
    id: 2,
    text: "What technologies do you use?",
    basePosition: { x: RIGHT_FAR, y: 30 },
    floatParams: {
      amplitudeX: 18 * ANIMATION.DISTANCE_FACTOR,
      amplitudeY: 15 * ANIMATION.DISTANCE_FACTOR,
      speedX: 0.001 * ANIMATION.SPEED_FACTOR,
      speedY: 0.0009 * ANIMATION.SPEED_FACTOR,
      rotationAmplitude: 2.5 * ANIMATION.DISTANCE_FACTOR,
      rotationSpeed: 0.0008 * ANIMATION.SPEED_FACTOR,
      phaseX: Math.PI / 2,
      phaseY: Math.PI / 3,
    },
  },
  {
    id: 3,
    text: "Share your experience",
    basePosition: { x: LEFT_NEAR, y: 60 },
    floatParams: {
      amplitudeX: 12 * ANIMATION.DISTANCE_FACTOR,
      amplitudeY: 18 * ANIMATION.DISTANCE_FACTOR,
      speedX: 0.0009 * ANIMATION.SPEED_FACTOR,
      speedY: 0.0011 * ANIMATION.SPEED_FACTOR,
      rotationAmplitude: 2 * ANIMATION.DISTANCE_FACTOR,
      rotationSpeed: 0.0012 * ANIMATION.SPEED_FACTOR,
      phaseX: Math.PI,
      phaseY: Math.PI / 4,
    },
  },
  {
    id: 4,
    text: "What's your background?",
    basePosition: { x: RIGHT_NEAR, y: 75 },
    floatParams: {
      amplitudeX: 14 * ANIMATION.DISTANCE_FACTOR,
      amplitudeY: 16 * ANIMATION.DISTANCE_FACTOR,
      speedX: 0.0007 * ANIMATION.SPEED_FACTOR,
      speedY: 0.001 * ANIMATION.SPEED_FACTOR,
      rotationAmplitude: 2.8 * ANIMATION.DISTANCE_FACTOR,
      rotationSpeed: 0.0009 * ANIMATION.SPEED_FACTOR,
      phaseX: Math.PI * 1.5,
      phaseY: Math.PI / 6,
    },
  },
]

