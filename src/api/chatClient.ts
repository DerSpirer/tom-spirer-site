import axios, { type AxiosInstance, AxiosError } from 'axios'

// API Types based on OpenAPI spec

export const Role = {
  System: 'system',
  User: 'user',
  Assistant: 'assistant',
  Tool: 'tool',
  Developer: 'developer',
} as const

export type Role = (typeof Role)[keyof typeof Role]

export interface Message {
  role: Role
  content: string
}

export interface GenerateResponseRequest {
  messages: Message[]
}

export interface ServiceResultOfMessage {
  success: boolean
  message: string | null
  data: Message | null
}

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// API Client
export class ChatApiClient {
  private axiosInstance: AxiosInstance

  constructor(baseUrl: string = API_BASE_URL) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  /**
   * Generates a response from the chat API
   * @param messages - Array of messages in the conversation
   * @returns ServiceResult containing the assistant's response
   */
  async generateResponse(messages: Message[]): Promise<ServiceResultOfMessage> {
    const request: GenerateResponseRequest = {
      messages,
    }

    try {
      const response = await this.axiosInstance.post<ServiceResultOfMessage>(
        '/api/Chat/GenerateResponse',
        request
      )

      return response.data
    } catch (error) {
      console.error('Error generating response:', error)
      
      if (error instanceof AxiosError) {
        return {
          success: false,
          message: error.response?.data?.message || error.message || 'Network error occurred',
          data: null,
        }
      }
      
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        data: null,
      }
    }
  }

  /**
   * Helper method to send a user message and get a response
   * @param userMessage - The user's message text
   * @param conversationHistory - Previous messages in the conversation
   * @returns The assistant's response message or null on error
   */
  async sendMessage(
    userMessage: string,
    conversationHistory: Message[] = []
  ): Promise<Message | null> {
    const messages: Message[] = [
      ...conversationHistory,
      {
        role: Role.User,
        content: userMessage,
      },
    ]

    const result = await this.generateResponse(messages)

    if (result.success && result.data) {
      return result.data
    }

    return null
  }
}

// Export a default instance
export const chatApi = new ChatApiClient()

