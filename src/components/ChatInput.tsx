import { Box, TextField, IconButton, CircularProgress, useTheme } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import type { RefObject } from 'react'

interface ChatInputProps {
  inputText: string
  isLoading: boolean
  inputRef: RefObject<HTMLInputElement | null>
  onInputChange: (value: string) => void
  onSend: () => void
  onKeyPress: (e: React.KeyboardEvent) => void
}

function ChatInput({ 
  inputText, 
  isLoading, 
  inputRef,
  onInputChange, 
  onSend, 
  onKeyPress
}: ChatInputProps) {
  const theme = useTheme()
  
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        padding: 2,
        borderRadius: '12px',
        backgroundColor: theme.customColors.overlays.paperDark,
        backdropFilter: 'blur(12px)',
        flexShrink: 0,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="ask me anything"
        value={inputText}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyPress={onKeyPress}
        disabled={isLoading}
        inputRef={inputRef}
        inputProps={{
          'aria-label': 'Chat message input',
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: theme.customColors.overlays.white05,
            '& fieldset': {
              border: 'none',
            },
            '&:hover fieldset': {
              border: 'none',
            },
            '&.Mui-focused fieldset': {
              border: 'none',
            },
            '&.Mui-disabled': {
              '& input': {
                color: 'white',
                WebkitTextFillColor: 'white',
              },
            },
          },
          '& .MuiInputBase-input.Mui-disabled': {
            color: 'white',
            WebkitTextFillColor: 'white',
          },
        }}
      />
      <IconButton
        color="primary"
        onClick={onSend}
        disabled={isLoading}
        aria-label={isLoading ? 'Sending message' : 'Send message'}
        sx={{
          backgroundColor: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
          '&.Mui-disabled': {
            backgroundColor: theme.customColors.overlays.white12,
          },
          width: 48,
          height: 48,
        }}
      >
        {isLoading ? (
          <CircularProgress size={24} sx={{ color: 'white' }} />
        ) : (
          <SendIcon sx={{ color: 'white' }} />
        )}
      </IconButton>
    </Box>
  )
}

export default ChatInput
