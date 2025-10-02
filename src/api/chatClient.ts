import axios, { type AxiosInstance } from 'axios'
import { API } from '../constants'

export const Role = {
  System: 'system',
  User: 'user',
  Assistant: 'assistant',
  Tool: 'tool',
  Developer: 'developer',
} as const

export type RoleType = (typeof Role)[keyof typeof Role]

export interface ApiMessage {
  role: RoleType
  content: string
}

export interface GenerateResponseRequest {
  messages: ApiMessage[]
}

export class ChatApiClient {
  private axiosInstance: AxiosInstance

  constructor(baseUrl: string = API.BASE_URL) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  /**
   * Generates a response from the chat API using Server-Sent Events
   * @param messages - Array of messages in the conversation
   * @param onChunk - Callback function called for each chunk of text received
   * @returns Promise that resolves when streaming is complete
   */
  async generateResponseStream(
    messages: ApiMessage[],
    onChunk: (chunk: string) => void
  ): Promise<void> {
    const request: GenerateResponseRequest = {
      messages,
    }

    let lastProcessedIndex = 0
    let buffer = '' // Buffer for incomplete lines

    try {
      await this.axiosInstance.post(
        API.ENDPOINTS.GENERATE_RESPONSE,
        request,
        {
          responseType: 'text',
          onDownloadProgress: (progressEvent) => {
            // Get the cumulative response text
            const responseText = progressEvent.event.target.responseText || ''
            
            // Process only the new part since last update
            const newText = responseText.slice(lastProcessedIndex)
            lastProcessedIndex = responseText.length

            // Add new text to buffer
            const text = buffer + newText
            const lines = text.split('\n')

            // The last element might be an incomplete line, so buffer it
            buffer = lines.pop() || ''

            // Process complete lines
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6) // Remove 'data: ' prefix
                if (data) {
                  onChunk(data)
                }
              }
            }
          },
        }
      )

      // Process any remaining buffered line after stream completes
      if (buffer.trim()) {
        if (buffer.startsWith('data: ')) {
          const data = buffer.slice(6)
          if (data) {
            onChunk(data)
          }
        }
      }
    } catch (error) {
      console.error('Error generating response:', error)
      throw error
    }
  }
}

export const chatApi = new ChatApiClient()
