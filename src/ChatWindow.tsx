import { Box, useTheme } from '@mui/material'
import { useState, useRef, useEffect } from 'react'
import { chatApi } from './api/chatClient'
import type { Message } from './types'
import { createGlowPulse } from './utils/animations'
import { convertToApiMessages, createUserMessage, createAgentMessage, createErrorMessage } from './utils/messageHelpers'
import { useTypingAnimation } from './hooks/useTypingAnimation'
import { useMessageId } from './hooks/useMessageId'
import { CHAT_WINDOW } from './constants'
import MessageBubble from './components/MessageBubble'
import ChatInput from './components/ChatInput'

interface ChatWindowProps {
  suggestionText?: string
  onSuggestionUsed?: () => void
}

function ChatWindow({ suggestionText, onSuggestionUsed }: ChatWindowProps) {
  const theme = useTheme()
  const glowPulse = createGlowPulse(theme.glow.rgb)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Use typing animation hook for suggestion text
  const { isTyping } = useTypingAnimation({
    text: suggestionText || '',
    onTextChange: setInputText,
    onComplete: onSuggestionUsed,
  })

  // Generate unique message IDs
  const getNextMessageId = useMessageId()

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Focus input field when typing animation completes
  useEffect(() => {
    if (!isTyping && inputText) {
      // Small delay to ensure the field is no longer disabled
      setTimeout(() => {
        inputRef.current?.focus()
      }, 10)
    }
  }, [isTyping, inputText])

  const handleSend = async () => {
    if (inputText.trim() === '' || isLoading || isTyping) return

    const userMessageText = inputText
    const newUserMessage = createUserMessage(userMessageText, getNextMessageId())

    // Add user message to UI
    setMessages((prev) => [...prev, newUserMessage])
    setInputText('')
    setIsLoading(true)

    try {
      // Get conversation history and send to API
      const conversationHistory = convertToApiMessages(messages)
      const response = await chatApi.sendMessage(userMessageText, conversationHistory)

      if (response) {
        const agentMessage = createAgentMessage(response.content, getNextMessageId())
        setMessages((prev) => [...prev, agentMessage])
      } else {
        const errorMessage = createErrorMessage(getNextMessageId())
        setMessages((prev) => [...prev, errorMessage])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage = createErrorMessage(getNextMessageId())
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Box
      component="main"
      role="region"
      aria-label="Chat interface"
      sx={{
        width: '100%',
        maxWidth: CHAT_WINDOW.MAX_WIDTH,
        height: CHAT_WINDOW.HEIGHT,
        backgroundColor: 'background.paper',
        borderRadius: CHAT_WINDOW.BORDER_RADIUS,
        border: (theme) => `1px solid ${theme.customColors.borders.light}`,
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        animation: `${glowPulse} 8s ease-in-out infinite`,
      }}
    >
      {/* Messages Container */}
      <Box
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          padding: 3,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          paddingBottom: CHAT_WINDOW.INPUT_HEIGHT,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: (theme) => theme.customColors.overlays.white05,
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: (theme) => theme.customColors.borders.light,
            borderRadius: '4px',
            '&:hover': {
              background: (theme) => theme.customColors.overlays.white25,
            },
          },
        }}
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </Box>

      {/* Floating Input Area */}
      <ChatInput
        inputText={inputText}
        isLoading={isLoading}
        isTyping={isTyping}
        inputRef={inputRef}
        onInputChange={setInputText}
        onSend={handleSend}
        onKeyPress={handleKeyPress}
      />
    </Box>
  )
}

export default ChatWindow
