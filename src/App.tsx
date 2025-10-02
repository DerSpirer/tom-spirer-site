import { Container, Box } from '@mui/material'
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
        }}
      >
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
