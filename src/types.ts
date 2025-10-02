export interface Message {
  id: number
  text: string
  sender: 'user' | 'agent'
}

export interface BubbleConfig {
  id: number
  text: string
  basePosition: {
    x: number
    y: number
  }
}
