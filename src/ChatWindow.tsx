import { Box, Typography, TextField, IconButton, CircularProgress } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { keyframes } from '@mui/system'
import { useState, useRef, useEffect } from 'react'
import { chatApi, Role, type Message as ApiMessage } from './api/chatClient'

const glowPulse = keyframes`
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(255, 255, 255, 0.15),
      0 0 40px rgba(255, 255, 255, 0.1),
      0 0 60px rgba(255, 255, 255, 0.05),
      0 4px 20px rgba(0, 0, 0, 0.3);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(255, 255, 255, 0.25),
      0 0 50px rgba(255, 255, 255, 0.18),
      0 0 80px rgba(255, 255, 255, 0.12),
      0 4px 20px rgba(0, 0, 0, 0.3);
  }
`

interface Message {
  id: number
  text: string
  sender: 'user' | 'agent'
}

function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Convert UI messages to API format
  const convertToApiMessages = (): ApiMessage[] => {
    return messages.map((msg) => ({
      role: msg.sender === 'user' ? Role.User : Role.Assistant,
      content: msg.text,
    }))
  }

  const handleSend = async () => {
    if (inputText.trim() === '' || isLoading) return

    const userMessageText = inputText
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: userMessageText,
      sender: 'user',
    }

    // Add user message to UI
    setMessages((prev) => [...prev, newUserMessage])
    setInputText('')
    setIsLoading(true)

    try {
      // Get conversation history and send to API
      const conversationHistory = convertToApiMessages()
      const response = await chatApi.sendMessage(userMessageText, conversationHistory)

      if (response) {
        const agentMessage: Message = {
          id: messages.length + 2,
          text: response.content,
          sender: 'agent',
        }
        setMessages((prev) => [...prev, agentMessage])
      } else {
        // Error handling - add error message
        const errorMessage: Message = {
          id: messages.length + 2,
          text: 'Sorry, I encountered an error. Please try again.',
          sender: 'agent',
        }
        setMessages((prev) => [...prev, errorMessage])
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: messages.length + 2,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'agent',
      }
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
      sx={{
        width: '100%',
        maxWidth: '400px',
        height: '600px',
        backgroundColor: 'background.paper',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        padding: 3,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        animation: `${glowPulse} 8s ease-in-out infinite`,
      }}
    >
      {/* Messages Container - Full Height */}
      <Box
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
          paddingBottom: '100px', // Space for input at bottom
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '4px',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.25)',
            },
          },
        }}
      >
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <Box
              sx={{
                maxWidth: '70%',
                padding: 2,
                borderRadius: '12px',
                backgroundColor: message.sender === 'user' 
                  ? 'primary.main'
                  : 'rgba(255, 255, 255, 0.05)',
                color: 'text.primary',
              }}
            >
              <Typography variant="body1">
                {message.text}
              </Typography>
            </Box>
          </Box>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <Box
              sx={{
                padding: 2,
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <CircularProgress size={20} sx={{ color: 'primary.main' }} />
            </Box>
          </Box>
        )}
        
        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </Box>

      {/* Floating Input Area with Frosted Glass */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          gap: 1,
          alignItems: 'center',
          padding: 2,
          borderRadius: '0 0 24px 24px',
          backgroundColor: 'rgba(26, 35, 50, 0.7)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              '& fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
              },
            }
          }}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={isLoading}
          sx={{
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            '&.Mui-disabled': {
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
            },
            width: 48,
            height: 48,
          }}
        >
          <SendIcon sx={{ color: 'white' }} />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ChatWindow

