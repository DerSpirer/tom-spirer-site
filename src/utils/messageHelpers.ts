import type { Message } from '../types'
import { Role, type Message as ApiMessage } from '../api/chatClient'

/**
 * Convert UI messages to API format
 */
export const convertToApiMessages = (messages: Message[]): ApiMessage[] => {
  return messages.map((msg) => ({
    role: msg.sender === 'user' ? Role.User : Role.Assistant,
    content: msg.text,
  }))
}

/**
 * Create an error message
 */
export const createErrorMessage = (messageId: number): Message => ({
  id: messageId,
  text: 'Sorry, I encountered an error. Please try again.',
  sender: 'agent',
})

/**
 * Create a user message
 */
export const createUserMessage = (text: string, messageId: number): Message => ({
  id: messageId,
  text,
  sender: 'user',
})

/**
 * Create an agent message
 */
export const createAgentMessage = (text: string, messageId: number): Message => ({
  id: messageId,
  text,
  sender: 'agent',
})
