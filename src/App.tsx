import { Container, Box } from '@mui/material'
import ChatWindow from './ChatWindow'
import './App.css'

function App() {
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
        <ChatWindow />
      </Box>
    </Container>
  )
}

export default App
