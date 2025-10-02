import { Container, Box } from '@mui/material'
import { useState } from 'react'
import ChatWindow from './ChatWindow'
import PromptSuggestionBubbles from './PromptSuggestionBubbles'

function App() {
  const [suggestionText, setSuggestionText] = useState<string>('')

  const handleBubbleClick = (text: string) => {
    setSuggestionText(text)
  }

  const handleSuggestionUsed = () => {
    setSuggestionText('')
  }

  return (
    <>
      {/* Additional animated blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      
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
    </>
  )
}

export default App
