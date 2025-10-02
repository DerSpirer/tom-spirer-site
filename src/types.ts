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
}
