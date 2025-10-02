import type { Message } from '../types'
import { Role, type ApiMessage } from '../api/chatClient'

export const convertToApiMessages = (messages: Message[]): ApiMessage[] => {
  return messages.map((msg) => ({
    role: msg.sender === 'user' ? Role.User : Role.Assistant,
    content: msg.text,
  }))
}

export const createErrorMessage = (messageId: number): Message => ({
  id: messageId,
  text: 'Sorry, I encountered an error. Please try again.',
  sender: 'agent',
})

export const createUserMessage = (text: string, messageId: number): Message => ({
  id: messageId,
  text,
  sender: 'user',
})

export const createAgentMessage = (text: string, messageId: number): Message => ({
  id: messageId,
  text,
  sender: 'agent',
})
