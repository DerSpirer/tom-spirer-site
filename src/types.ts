export const Role = {
  System: 'system',
  User: 'user',
  Assistant: 'assistant',
  Tool: 'tool',
  Developer: 'developer',
} as const

export type RoleType = (typeof Role)[keyof typeof Role]

export interface ToolCall {
  id?: string
  type?: string
  function: {
    name?: string
    arguments?: string
  }
}

export interface LeaveMessageParams {
  fromName: string
  fromEmail: string
  subject: string
  body: string
}

/**
 * Represents a chat message.
 * 
 * All fields are optional to support streaming scenarios where messages are built
 * incrementally. Messages are tracked by their position in the array, and React uses
 * array indices as keys when rendering.
 */
export interface Message {
  role?: RoleType
  content?: string
  refusal?: string
  toolCalls?: ToolCall[]
  toolCallId?: string
}

export interface BubbleConfig {
  id: number
  text: string
  basePosition: {
    x: number
    y: number
  }
}
