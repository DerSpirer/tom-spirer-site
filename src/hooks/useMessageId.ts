import { useRef, useCallback } from 'react'

export const useMessageId = () => {
  const counterRef = useRef(0)

  const getNextId = useCallback(() => {
    counterRef.current += 1
    return counterRef.current
  }, [])

  return getNextId
}
