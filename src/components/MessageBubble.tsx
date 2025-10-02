import { Box } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import type { Message } from '../types'
import { getMarkdownStyles } from '../styles/markdownStyles'
import 'highlight.js/styles/github-dark.css'

interface MessageBubbleProps {
  message: Message
}

function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
      }}
    >
      <Box sx={getMarkdownStyles(message.sender)}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {message.text}
        </ReactMarkdown>
      </Box>
    </Box>
  )
}

export default MessageBubble
