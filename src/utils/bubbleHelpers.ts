export const calculateYOffset = (yPercent: number, chatWindowHeight: number): number => {
  return ((yPercent - 50) / 100) * chatWindowHeight
}
