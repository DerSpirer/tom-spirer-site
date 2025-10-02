/**
 * Calculate the Y position offset from viewport center for a bubble
 */
export const calculateYOffset = (yPercent: number, chatWindowHeight: number): number => {
  return ((yPercent - 50) / 100) * chatWindowHeight
}
