import { Container, Box } from '@mui/material'
import { useState, useCallback } from 'react'
import ChatWindow from './ChatWindow'
import PromptSuggestionBubbles from './PromptSuggestionBubbles'

function App() {
  const [suggestionText, setSuggestionText] = useState<string>('')

  const handleBubbleClick = useCallback((text: string) => {
    setSuggestionText(text)
  }, [])

  const handleSuggestionUsed = useCallback(() => {
    setSuggestionText('')
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
        />
      </Box>
      <PromptSuggestionBubbles onBubbleClick={handleBubbleClick} />
    </Container>
  )
}

export default App
