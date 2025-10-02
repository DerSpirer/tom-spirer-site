import { keyframes } from '@mui/system'

export const createGlowPulse = (rgb: string) => keyframes`
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(${rgb}, 0.2),
      0 0 40px rgba(${rgb}, 0.15),
      0 0 60px rgba(${rgb}, 0.08),
      0 4px 20px rgba(0, 0, 0, 0.3);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(${rgb}, 0.35),
      0 0 50px rgba(${rgb}, 0.25),
      0 0 80px rgba(${rgb}, 0.15),
      0 4px 20px rgba(0, 0, 0, 0.3);
  }
`

export const createGlowSubtle = (rgb: string) => keyframes`
  0%, 100% {
    box-shadow: 
      0 0 15px rgba(${rgb}, 0.2),
      0 0 30px rgba(${rgb}, 0.12),
      0 2px 10px rgba(0, 0, 0, 0.2);
  }
  50% {
    box-shadow: 
      0 0 20px rgba(${rgb}, 0.3),
      0 0 40px rgba(${rgb}, 0.18),
      0 2px 10px rgba(0, 0, 0, 0.2);
  }
`

