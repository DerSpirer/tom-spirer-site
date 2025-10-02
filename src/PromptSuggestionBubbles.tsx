import { Box, Typography, useTheme } from '@mui/material'
import { calculateYOffset } from './utils/bubbleHelpers'
import { bubbleConfigs } from './config/bubbleConfigs'
import { BREAKPOINTS, CHAT_WINDOW, BUBBLE } from './constants'

interface PromptSuggestionBubblesProps {
  onBubbleClick?: (text: string) => void
}

// Parse chat window height once outside component
const CHAT_WINDOW_HEIGHT = parseInt(CHAT_WINDOW.HEIGHT)

function PromptSuggestionBubbles({ onBubbleClick }: PromptSuggestionBubblesProps) {
  const theme = useTheme()

  return (
    <>
      {bubbleConfigs.map((config) => {
        // Calculate Y position offset for base transform
        const yOffset = calculateYOffset(config.basePosition.y, CHAT_WINDOW_HEIGHT)

        return (
          <Box
            key={config.id}
            sx={{
              position: 'fixed',
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${config.basePosition.x}px), calc(-50% + ${yOffset}px))`,
              // Hide on smaller screens to avoid clutter
              [`@media (max-width: ${BREAKPOINTS.HIDE_BUBBLES}px)`]: {
                display: 'none',
              },
            }}
          >
            <Box
              className={`bubble-${config.id}`}
              onClick={() => onBubbleClick?.(config.text)}
              role="button"
              tabIndex={0}
              aria-label={`Prompt suggestion: ${config.text}`}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onBubbleClick?.(config.text)
                }
              }}
              sx={{
                width: `${BUBBLE.WIDTH}px`,
                padding: 2.5,
                backgroundColor: theme.customColors.overlays.paper,
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: `1px solid rgba(${theme.glow.rgb}, 0.2)`,
                cursor: 'pointer',
                transition: 'box-shadow 0.3s ease, scale 0.2s ease, background-color 0.2s ease',
                '&:hover': {
                  backgroundColor: theme.customColors.overlays.paperDark,
                  boxShadow: `
                    0 0 25px rgba(${theme.glow.rgb}, 0.3),
                    0 0 50px rgba(${theme.glow.rgb}, 0.15),
                    0 4px 15px ${theme.customColors.overlays.black30}
                  `,
                  scale: '1.05',
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: theme.customColors.overlays.white85,
                  fontSize: '0.9rem',
                  fontWeight: 400,
                  textAlign: 'center',
                  lineHeight: 1.4,
                  userSelect: 'none',
                }}
              >
                {config.text}
              </Typography>
            </Box>
          </Box>
        )
      })}
    </>
  )
}

export default PromptSuggestionBubbles
