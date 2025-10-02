import { createTheme } from '@mui/material/styles'
import type { PaletteMode } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    glow: {
      color: string
      rgb: string
    }
    customColors: {
      blobs: {
        fuchsia: string
        pink: string
        purple1: string
        purple2: string
        rose: string
        magenta: string
        slate: string
      }
      overlays: {
        paper: string
        paperDark: string
        white05: string
        white10: string
        white12: string
        white15: string
        white20: string
        white25: string
        white30: string
        white85: string
        black30: string
        black40: string
      }
      borders: {
        subtle: string
        light: string
        medium: string
      }
      components: {
        suggestionBubble: string
        suggestionBubbleHover: string
        agentMessage: string
      }
    }
  }
  interface ThemeOptions {
    glow?: {
      color?: string
      rgb?: string
    }
    customColors?: {
      blobs?: {
        fuchsia?: string
        pink?: string
        purple1?: string
        purple2?: string
        rose?: string
        magenta?: string
        slate?: string
      }
      overlays?: {
        paper?: string
        paperDark?: string
        white05?: string
        white10?: string
        white12?: string
        white15?: string
        white20?: string
        white25?: string
        white30?: string
        white85?: string
        black30?: string
        black40?: string
      }
      borders?: {
        subtle?: string
        light?: string
        medium?: string
      }
      components?: {
        suggestionBubble?: string
        suggestionBubbleHover?: string
        agentMessage?: string
      }
    }
  }
}

export const createAppTheme = (mode: PaletteMode) => {
  const isDark = mode === 'dark'
  
  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#4a9eff' : '#5b8ee0',
      },
      secondary: {
        main: isDark ? '#dc004e' : '#db2777',
      },
      background: {
        default: isDark ? '#0f0e1a' : '#f8f9fb',
        paper: isDark ? '#1a1825' : '#f5f3f0',
      },
      text: {
        primary: isDark ? '#ffffff' : '#0f172a',
        secondary: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.7)',
      },
    },
    typography: {
      fontFamily: [
        'Roboto',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Arial',
        'sans-serif',
      ].join(','),
    },
    glow: {
      color: isDark ? '#a78bfa' : '#9333ea',
      rgb: isDark ? '167, 139, 250' : '147, 51, 234',
    },
    customColors: {
      blobs: isDark ? {
        fuchsia: '#1a0f2a',
        pink: '#1f131f',
        purple1: '#15112a',
        purple2: '#1b1530',
        rose: '#1f1220',
        magenta: '#21132a',
        slate: '#0a0812',
      } : {
        fuchsia: '#fae8ff',
        pink: '#fce7f3',
        purple1: '#f3e8ff',
        purple2: '#ede9fe',
        rose: '#ffe4e6',
        magenta: '#fecdd3',
        slate: '#f1f5f9',
      },
      overlays: isDark ? {
        paper: 'rgba(26, 24, 37, 0.7)',
        paperDark: 'rgba(26, 24, 37, 0.85)',
        white05: 'rgba(255, 255, 255, 0.05)',
        white10: 'rgba(255, 255, 255, 0.1)',
        white12: 'rgba(255, 255, 255, 0.12)',
        white15: 'rgba(255, 255, 255, 0.15)',
        white20: 'rgba(255, 255, 255, 0.2)',
        white25: 'rgba(255, 255, 255, 0.25)',
        white30: 'rgba(255, 255, 255, 0.3)',
        white85: 'rgba(255, 255, 255, 0.85)',
        black30: 'rgba(0, 0, 0, 0.3)',
        black40: 'rgba(0, 0, 0, 0.4)',
      } : {
        paper: 'rgba(252, 251, 250, 0.85)',
        paperDark: 'rgba(252, 251, 250, 0.95)',
        white05: 'rgba(0, 0, 0, 0.04)',
        white10: 'rgba(0, 0, 0, 0.05)',
        white12: 'rgba(0, 0, 0, 0.06)',
        white15: 'rgba(0, 0, 0, 0.08)',
        white20: 'rgba(0, 0, 0, 0.1)',
        white25: 'rgba(0, 0, 0, 0.12)',
        white30: 'rgba(0, 0, 0, 0.15)',
        white85: 'rgba(0, 0, 0, 0.85)',
        black30: 'rgba(255, 255, 255, 0.5)',
        black40: 'rgba(255, 255, 255, 0.65)',
      },
      borders: isDark ? {
        subtle: 'rgba(255, 255, 255, 0.1)',
        light: 'rgba(255, 255, 255, 0.15)',
        medium: 'rgba(255, 255, 255, 0.2)',
      } : {
        subtle: 'rgba(0, 0, 0, 0.08)',
        light: 'rgba(0, 0, 0, 0.12)',
        medium: 'rgba(0, 0, 0, 0.16)',
      },
      components: isDark ? {
        suggestionBubble: 'rgba(26, 24, 37, 0.7)',
        suggestionBubbleHover: 'rgba(26, 24, 37, 0.85)',
        agentMessage: 'rgba(255, 255, 255, 0.08)',
      } : {
        suggestionBubble: '#f8f9fb',
        suggestionBubbleHover: '#f8f9fb',
        agentMessage: 'rgba(147, 51, 234, 0.06)',
      },
    },
  })
}

const theme = createAppTheme('dark')
export default theme
