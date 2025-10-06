import { Box } from '@mui/material'
import { useState, useRef, useCallback } from 'react'
import ChatWindow from './ChatWindow'
import Header from './components/layout/Header'
import SuggestionChips from './components/chat/SuggestionChips'
import { useIsMobile } from './hooks/useIsMobile'
import { useChatContext } from './contexts/ChatContext'

function App() {
  const [inputText, setInputText] = useState('')
  const inputContainerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const { hasChatStarted } = useChatContext()
  
  const handleChipClick = useCallback((text: string) => {
    setInputText(text)
  }, [])

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        p: isMobile && hasChatStarted ? 0 : { xs: 2, sm: 3 },
        position: 'relative',
        overflow: 'visible',
        transition: 'padding 2s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
        <Header />
        <SuggestionChips
          inputText={inputText}
          inputContainerRef={inputContainerRef}
          onChipClick={handleChipClick}
        />
        <ChatWindow 
            inputText={inputText}
            onInputTextChange={setInputText}
            inputContainerRef={inputContainerRef}
          />
      </Box>
  )
}

export default App
