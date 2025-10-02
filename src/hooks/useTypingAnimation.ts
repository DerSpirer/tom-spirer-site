import { useState, useEffect, useRef } from 'react'
import { ANIMATION } from '../constants'

interface UseTypingAnimationOptions {
  text: string
  onTextChange: (text: string) => void
  onComplete?: () => void
  typingSpeed?: number
}

interface UseTypingAnimationReturn {
  isTyping: boolean
}

/**
 * Custom hook for creating a typing animation effect
 * Animates text character by character at a specified speed
 * Updates the text via onTextChange callback to maintain external control
 */
export const useTypingAnimation = ({
  text,
  onTextChange,
  onComplete,
  typingSpeed = ANIMATION.TYPING_SPEED_MS,
}: UseTypingAnimationOptions): UseTypingAnimationReturn => {
  const [isTyping, setIsTyping] = useState(false)
  const typingIntervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (!text) {
      setIsTyping(false)
      return
    }

    // Clear any existing typing animation
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current)
    }

    setIsTyping(true)
    onTextChange('')

    let currentIndex = 0

    typingIntervalRef.current = setInterval(() => {
      if (currentIndex < text.length) {
        onTextChange(text.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current)
          typingIntervalRef.current = null
        }
        setIsTyping(false)
        onComplete?.()
      }
    }, typingSpeed)

    // Cleanup function
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current)
        typingIntervalRef.current = null
      }
    }
  }, [text, onTextChange, onComplete, typingSpeed])

  return { isTyping }
}
