import { Box, Skeleton } from '@mui/material'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import type { Message } from '../types'
import { getMarkdownStyles } from '../styles/markdownStyles'
import { useMemo, memo } from 'react'

interface MessageBubbleProps {
  message: Message
}

function MessageBubble({ message }: MessageBubbleProps) {
  // Memoize markdown styles to avoid recalculating on every render
  const markdownStyles = useMemo(
    () => getMarkdownStyles(message.sender),
    [message.sender]
  )

  // Show typing animation for empty agent messages
  const showTypingAnimation = message.sender === 'agent' && message.text === ''

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
      }}
    >
      {showTypingAnimation ? (
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{
            maxWidth: '70%',
            width: '50%',
            height: 48,
            borderRadius: '12px',
            bgcolor: (theme) => theme.customColors.overlays.white10,
          }}
        />
      ) : (
        <Box sx={markdownStyles}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {message.text}
          </ReactMarkdown>
        </Box>
      )}
    </Box>
  )
}

// Memoize the entire component to prevent re-rendering unchanged messages
export default memo(MessageBubble)
