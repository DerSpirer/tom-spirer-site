// Shared types across components
export interface Message {
  id: number
  text: string
  sender: 'user' | 'agent'
}

export interface BubbleConfig {
  id: number
  text: string
  basePosition: {
    x: number  // Distance from chat window (negative = left, positive = right)
    y: number  // Vertical position in percentage (0-100)
  }
  floatParams: {
    amplitudeX: number  // Horizontal floating range
    amplitudeY: number  // Vertical floating range
    speedX: number      // Horizontal floating speed
    speedY: number      // Vertical floating speed
    rotationAmplitude: number  // Rotation range in degrees
    rotationSpeed: number      // Rotation speed
    phaseX: number      // Initial phase offset for X
    phaseY: number      // Initial phase offset for Y
  }
}

export interface BubblePosition {
  x: number
  y: number
  rotation: number
}
