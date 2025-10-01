import { Box, Typography, TextField, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { keyframes } from '@mui/system'
import { useState } from 'react'

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

const testMessages: Message[] = [
  { id: 1, text: "Hi there! How can I help you today?", sender: 'agent' },
  { id: 2, text: "I'd like to know more about your services.", sender: 'user' },
  { id: 3, text: "Of course! I'd be happy to tell you about what we offer.", sender: 'agent' },
  { id: 4, text: "That sounds great, thanks!", sender: 'user' },
  { id: 5, text: "Let me know if you have any specific questions.", sender: 'agent' },
]

function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(testMessages)
  const [inputText, setInputText] = useState('')

  const handleSend = () => {
    if (inputText.trim() === '') return

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
    }

    setMessages([...messages, newMessage])
    setInputText('')
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
          sx={{
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
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

