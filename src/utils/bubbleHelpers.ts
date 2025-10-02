import type { BubbleConfig, BubblePosition } from '../types'

/**
 * Calculate the position of a bubble based on elapsed time and its configuration
 * Uses sine waves to create smooth, organic floating motion
 */
export const calculateBubblePosition = (
  config: BubbleConfig,
  elapsed: number
): BubblePosition => {
  const { basePosition, floatParams } = config

  // Calculate floating offset using sine waves for smooth, organic motion
  const offsetX = Math.sin(elapsed * floatParams.speedX + floatParams.phaseX) * floatParams.amplitudeX
  const offsetY = Math.sin(elapsed * floatParams.speedY + floatParams.phaseY) * floatParams.amplitudeY
  
  // Calculate rotation using sine wave
  const rotation = Math.sin(elapsed * floatParams.rotationSpeed) * floatParams.rotationAmplitude

  return {
    x: basePosition.x + offsetX,
    y: basePosition.y + (offsetY / 10), // Scale down Y offset since it's in percentage
    rotation,
  }
}

/**
 * Calculate the Y position offset from viewport center for a bubble
 */
export const calculateYOffset = (yPercent: number, chatWindowHeight: number): number => {
  return ((yPercent - 50) / 100) * chatWindowHeight
}

