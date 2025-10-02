import { useRef, useCallback } from 'react'

/**
 * Custom hook for generating unique, incrementing message IDs
 * More reliable than using array length which can be affected by deletions
 */
export const useMessageId = () => {
  const counterRef = useRef(0)

  const getNextId = useCallback(() => {
    counterRef.current += 1
    return counterRef.current
  }, [])

  return getNextId
}
