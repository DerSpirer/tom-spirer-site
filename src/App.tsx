import { Container, Box, Typography } from '@mui/material'
import { useState, useCallback } from 'react'
import ChatWindow from './ChatWindow'
import PromptSuggestionBubbles from './PromptSuggestionBubbles'

function App() {
  const [suggestionText, setSuggestionText] = useState<string>('')
  const [hasChatStarted, setHasChatStarted] = useState(false)

  const handleBubbleClick = useCallback((text: string) => {
    setSuggestionText(text)
  }, [])

  const handleSuggestionUsed = useCallback(() => {
    setSuggestionText('')
  }, [])

  const handleChatStart = useCallback(() => {
    setHasChatStarted(true)
  }, [])

  return (
    <Container maxWidth="lg">
      <Box 
        sx={{ 
          minHeight: '100vh',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
          gap: hasChatStarted ? 2 : 4,
          transition: 'gap 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: hasChatStarted ? 0.5 : 1.5,
            transition: 'gap 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: hasChatStarted 
                ? { xs: '1.75rem', sm: '2rem', md: '2.25rem' }
                : { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
              fontWeight: 400,
              letterSpacing: '-0.02em',
              color: (theme) => theme.palette.text.primary,
              textAlign: 'center',
              opacity: 0,
              animation: 'fadeInTitle 0.6s ease 0.2s forwards',
              transition: 'font-size 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              '@keyframes fadeInTitle': {
                from: {
                  opacity: 0,
                  transform: 'translateY(-10px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            Tom Spirer
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            sx={{
              fontSize: hasChatStarted
                ? { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
                : { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
              fontWeight: 300,
              letterSpacing: '0.01em',
              color: (theme) => theme.palette.text.secondary,
              textAlign: 'center',
              opacity: 0,
              animation: 'fadeInSubtitle 0.6s ease 0.4s forwards',
              transition: 'font-size 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              '@keyframes fadeInSubtitle': {
                from: {
                  opacity: 0,
                  transform: 'translateY(-10px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            Software Engineer
          </Typography>
        </Box>
        
        <ChatWindow 
          suggestionText={suggestionText}
          onSuggestionUsed={handleSuggestionUsed}
          onChatStart={handleChatStart}
          hasChatStarted={hasChatStarted}
        />
      </Box>
      {hasChatStarted && (
        <Box
          sx={{
            animation: 'fadeIn 1s ease 0.9s both',
            '@keyframes fadeIn': {
              from: {
                opacity: 0,
              },
              to: {
                opacity: 1,
              },
            },
          }}
        >
          <PromptSuggestionBubbles onBubbleClick={handleBubbleClick} />
        </Box>
      )}
    </Container>
  )
}

export default App
