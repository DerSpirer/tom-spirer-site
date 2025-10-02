import { Box } from '@mui/material'
import { useState, useRef, useEffect, useCallback } from 'react'
import { chatApi } from './api/chatClient'
import type { Message } from './types'
import { convertToApiMessages, createUserMessage, createAgentMessage, createErrorMessage } from './utils/messageHelpers'
import { useMessageId } from './hooks/useMessageId'
import { CHAT_WINDOW } from './constants'
import MessageBubble from './components/MessageBubble'
import ChatInput from './components/ChatInput'

interface ChatWindowProps {
  suggestionText?: string
  onSuggestionUsed?: () => void
  onChatStart?: () => void
  hasChatStarted: boolean
}

function ChatWindow({ suggestionText, onSuggestionUsed, onChatStart, hasChatStarted }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const getNextMessageId = useMessageId()

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  useEffect(() => {
    if (suggestionText) {
      setInputText(suggestionText)
      onSuggestionUsed?.()
      setTimeout(() => {
        inputRef.current?.focus()
      }, 10)
    }
  }, [suggestionText, onSuggestionUsed])

  const handleSend = useCallback(async () => {
    if (inputText.trim() === '' || isLoading) return

    if (!hasChatStarted) {
      onChatStart?.()
    }

    const userMessageText = inputText
    const newUserMessage = createUserMessage(userMessageText, getNextMessageId())

    setMessages((prev) => [...prev, newUserMessage])
    setInputText('')
    setIsLoading(true)

    const agentMessageId = getNextMessageId()
    const placeholderMessage = createAgentMessage('', agentMessageId)
    setMessages((prev) => [...prev, placeholderMessage])

    try {
      const conversationHistory = convertToApiMessages(messages)
      const apiMessages = [
        ...conversationHistory,
        { role: 'user' as const, content: userMessageText }
      ]

      let accumulatedText = ''

      await chatApi.generateResponseStream(apiMessages, (chunk: string) => {
        accumulatedText += chunk
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === agentMessageId
              ? { ...msg, text: accumulatedText }
              : msg
          )
        )
      })
    } catch (error) {
      console.error('Error sending message:', error)
      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.id !== agentMessageId)
        const errorMessage = createErrorMessage(getNextMessageId())
        return [...filtered, errorMessage]
      })
    } finally {
      setIsLoading(false)
    }
  }, [inputText, isLoading, messages, getNextMessageId, hasChatStarted, onChatStart])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }, [handleSend])

  return (
    <Box
      component="main"
      role="region"
      aria-label="Chat interface"
      sx={{
        width: '100%',
        maxWidth: CHAT_WINDOW.MAX_WIDTH,
        height: hasChatStarted ? CHAT_WINDOW.HEIGHT : CHAT_WINDOW.INPUT_HEIGHT,
        backgroundColor: (theme) => theme.palette.background.default,
        borderRadius: CHAT_WINDOW.BORDER_RADIUS,
        border: (theme) => `1px solid ${theme.customColors.borders.light}`,
        boxShadow: (theme) => 
          theme.palette.mode === 'dark'
            ? `0 0 20px rgba(255, 255, 255, 0.08)`
            : `0 4px 12px rgba(0, 0, 0, 0.08)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: hasChatStarted ? 'flex-start' : 'center',
        position: 'relative',
        overflow: 'hidden',
        transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
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
          bottom: CHAT_WINDOW.INPUT_HEIGHT,
          overflowY: 'auto',
          display: hasChatStarted ? 'flex' : 'none',
          flexDirection: 'column',
          gap: 2,
          padding: 3,
          opacity: 0,
          animation: hasChatStarted ? 'fadeInMessages 0.4s ease 0.5s forwards' : 'none',
          '@keyframes fadeInMessages': {
            from: {
              opacity: 0,
            },
            to: {
              opacity: 1,
            },
          },
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
        <div ref={messagesEndRef} />
      </Box>

      <Box
        sx={{
          position: hasChatStarted ? 'absolute' : 'relative',
          bottom: hasChatStarted ? 0 : 'auto',
          left: hasChatStarted ? 0 : 'auto',
          right: hasChatStarted ? 0 : 'auto',
          width: '100%',
        }}
      >
        <ChatInput
          inputText={inputText}
          isLoading={isLoading}
          inputRef={inputRef}
          onInputChange={setInputText}
          onSend={handleSend}
          onKeyDown={handleKeyDown}
        />
      </Box>
    </Box>
  )
}

export default ChatWindow
