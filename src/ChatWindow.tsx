import { Box, Chip, useMediaQuery, useTheme } from '@mui/material'
import { useState, useRef, useEffect, useCallback } from 'react'
import { chatApi } from './api/chatClient'
import type { Message } from './types'
import { convertToApiMessages, createUserMessage, createAgentMessage, createErrorMessage } from './utils/messageHelpers'
import { useMessageId } from './hooks/useMessageId'
import { CHAT_WINDOW, BREAKPOINTS } from './constants'
import { bubbleConfigs } from './config/bubbleConfigs'
import MessageBubble from './components/MessageBubble'
import ChatInput from './components/ChatInput'

interface ChatWindowProps {
  suggestionText?: string
  onSuggestionUsed?: () => void
  onChatStart?: () => void
  hasChatStarted: boolean
  showBubbles: boolean
  onInputEmpty?: () => void
  onBubbleClick?: (text: string) => void
}

function ChatWindow({ suggestionText, onSuggestionUsed, onChatStart, hasChatStarted, showBubbles, onInputEmpty, onBubbleClick }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const getNextMessageId = useMessageId()
  const theme = useTheme()
  const showChips = useMediaQuery(`(max-width: ${BREAKPOINTS.HIDE_BUBBLES}px)`)

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

  useEffect(() => {
    if (inputText === '' && hasChatStarted) {
      onInputEmpty?.()
    }
  }, [inputText, hasChatStarted, onInputEmpty])

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

  const handleChipClick = useCallback((text: string) => {
    onBubbleClick?.(text)
  }, [onBubbleClick])

  return (
    <Box
      component="main"
      role="region"
      aria-label="Chat interface"
      sx={{
        width: '100%',
        maxWidth: CHAT_WINDOW.MAX_WIDTH,
        height: hasChatStarted ? '100%' : CHAT_WINDOW.INPUT_HEIGHT,
        maxHeight: hasChatStarted ? '650px' : CHAT_WINDOW.INPUT_HEIGHT,
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
        transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1), max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        flexShrink: 1,
      }}
    >
      {/* Messages Container */}
      <Box
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
        sx={{
          flex: 1,
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
          width: '100%',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        {/* Suggestion Chips for narrow screens */}
        {hasChatStarted && showChips && (
          <Box
            sx={{
              position: 'absolute',
              bottom: '100%',
              left: 0,
              right: 0,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              justifyContent: 'center',
              px: 2,
              pb: 1.5,
              opacity: showBubbles && !isLoading ? 1 : 0,
              pointerEvents: showBubbles && !isLoading ? 'auto' : 'none',
              transition: 'opacity 0.3s ease',
            }}
          >
            {bubbleConfigs.map((config) => (
              <Chip
                key={config.id}
                label={config.text}
                onClick={() => handleChipClick(config.text)}
                sx={{
                  backgroundColor: theme.customColors.components.suggestionBubble,
                  color: theme.customColors.overlays.white85,
                  border: `1px solid rgba(${theme.glow.rgb}, 0.2)`,
                  fontSize: '0.85rem',
                  fontWeight: 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: theme.customColors.components.suggestionBubbleHover,
                    boxShadow: theme.palette.mode === 'dark'
                      ? `0 0 15px rgba(255, 255, 255, 0.08)`
                      : `0 2px 8px rgba(0, 0, 0, 0.1)`,
                    transform: 'translateY(-2px)',
                  },
                }}
              />
            ))}
          </Box>
        )}
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
