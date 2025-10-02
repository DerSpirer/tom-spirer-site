import { Box, Typography, useTheme } from '@mui/material'
import { useEffect, useRef } from 'react'
import { createGlowSubtle } from './utils/animations'
import { calculateBubblePosition, calculateYOffset } from './utils/bubbleHelpers'
import { bubbleConfigs } from './config/bubbleConfigs'
import { BREAKPOINTS, CHAT_WINDOW, BUBBLE } from './constants'

interface PromptSuggestionBubblesProps {
  onBubbleClick?: (text: string) => void
}

function PromptSuggestionBubbles({ onBubbleClick }: PromptSuggestionBubblesProps) {
  const theme = useTheme()
  const glowSubtle = createGlowSubtle(theme.glow.rgb)
  const bubbleRefs = useRef<Map<number, HTMLElement>>(new Map())
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(Date.now())

  // Use chat window height from constants for calculations
  const CHAT_WINDOW_HEIGHT = parseInt(CHAT_WINDOW.HEIGHT)

  useEffect(() => {
    // Animation loop - directly updates DOM without triggering React re-renders
    const animate = () => {
      const currentTime = Date.now()
      const elapsed = currentTime - startTimeRef.current

      bubbleConfigs.forEach((config) => {
        const element = bubbleRefs.current.get(config.id)
        if (!element) return

        const position = calculateBubblePosition(config, elapsed)
        
        // Calculate Y position offset from viewport center
        const yOffset = calculateYOffset(position.y, CHAT_WINDOW_HEIGHT)

        // Check if element is being hovered (via data attribute)
        const isHovered = element.dataset.hovered === 'true'
        const scale = isHovered ? 1.05 : 1

        // Directly update the DOM element's transform style
        element.style.transform = `translate(calc(-50% + ${position.x}px), calc(-50% + ${yOffset}px)) rotate(${position.rotation}deg) scale(${scale})`
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [CHAT_WINDOW_HEIGHT])

  // Callback to store bubble element refs
  const setBubbleRef = (id: number) => (element: HTMLElement | null) => {
    if (element) {
      bubbleRefs.current.set(id, element)
    } else {
      bubbleRefs.current.delete(id)
    }
  }

  return (
    <>
      {bubbleConfigs.map((config) => {
        // Calculate initial Y position offset for base transform
        const initialYOffset = calculateYOffset(config.basePosition.y, CHAT_WINDOW_HEIGHT)

        return (
          <Box
            key={config.id}
            ref={setBubbleRef(config.id)}
            onClick={() => onBubbleClick?.(config.text)}
            onMouseEnter={(e) => {
              e.currentTarget.dataset.hovered = 'true'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.dataset.hovered = 'false'
            }}
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
              position: 'fixed',
              left: '50%',
              top: '50%',
              width: `${BUBBLE.WIDTH}px`,
              padding: 2.5,
              backgroundColor: theme.customColors.overlays.paper,
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              border: `1px solid rgba(${theme.glow.rgb}, 0.2)`,
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
              // Initial transform - will be updated by animation loop via ref
              transform: `translate(calc(-50% + ${config.basePosition.x}px), calc(-50% + ${initialYOffset}px)) rotate(0deg)`,
              animation: `${glowSubtle} 6s ease-in-out infinite`,
              willChange: 'transform',
              '&:hover': {
                backgroundColor: theme.customColors.overlays.paperDark,
                boxShadow: `
                  0 0 25px rgba(${theme.glow.rgb}, 0.3),
                  0 0 50px rgba(${theme.glow.rgb}, 0.15),
                  0 4px 15px ${theme.customColors.overlays.black30}
                `,
              },
              // Hide on smaller screens to avoid clutter
              [`@media (max-width: ${BREAKPOINTS.HIDE_BUBBLES}px)`]: {
                display: 'none',
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
        )
      })}
    </>
  )
}

export default PromptSuggestionBubbles
