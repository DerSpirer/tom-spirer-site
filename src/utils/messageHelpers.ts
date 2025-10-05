import type { Message } from '../types'
import { Role } from '../types'

export const createErrorMessage = (): Message => ({
  role: Role.Assistant,
  content: 'Sorry, I encountered an error. Please try again.',
})

export const createUserMessage = (content: string): Message => ({
  role: Role.User,
  content,
})

export const createAssistantMessage = (content: string): Message => ({
  role: Role.Assistant,
  content,
})

export const createToolResponseMessage = (
  toolCallId: string,
  response: { status: string; parameters?: any }
): Message => ({
  role: Role.Tool,
  content: JSON.stringify(response),
  toolCallId,
})
