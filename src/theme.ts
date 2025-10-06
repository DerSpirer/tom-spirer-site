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
        white25: string
        white30: string
        white85: string
      }
      borders: {
        light: string
        glow: string
      }
      components: {
        suggestionChip: string
        suggestionChipHover: string
        agentMessage: string
      }
      shadows: {
        standard: string
        chatWindow: string
        suggestionChip: string
        suggestionChipHover: string
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
        white25?: string
        white30?: string
        white85?: string
      }
      borders?: {
        light?: string
        glow?: string
      }
      components?: {
        suggestionChip?: string
        suggestionChipHover?: string
        agentMessage?: string
      }
      shadows?: {
        standard?: string
        chatWindow?: string
        suggestionChip?: string
        suggestionChipHover?: string
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
        main: isDark ? '#6366f1' : '#7ba8e6',
      },
      secondary: {
        main: isDark ? '#ec4899' : '#db2777',
      },
      success: {
        main: isDark ? '#10b981' : '#81c995',
      },
      error: {
        main: isDark ? '#ef4444' : '#e88b8b',
      },
      warning: {
        main: isDark ? '#f59e0b' : '#f5c563',
      },
      background: {
        default: isDark ? '#0a0a0f' : '#f8f9fb',
        paper: isDark ? '#1a1a2e' : '#f5f3f0',
      },
      text: {
        primary: isDark ? '#f0f0f3' : '#0f172a',
        secondary: isDark ? 'rgba(240, 240, 243, 0.7)' : 'rgba(15, 23, 42, 0.7)',
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
      color: isDark ? '#c084fc' : '#9333ea',
      rgb: isDark ? '192, 132, 252' : '147, 51, 234',
    },
    customColors: {
      blobs: isDark ? {
        fuchsia: '#0d0817',
        pink: '#0f0812',
        purple1: '#0a0814',
        purple2: '#0c0a18',
        rose: '#0f0710',
        magenta: '#0e0716',
        slate: '#080810',
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
        paper: 'rgba(26, 26, 46, 0.85)',
        paperDark: 'rgba(26, 26, 46, 0.95)',
        white05: 'rgba(255, 255, 255, 0.05)',
        white10: 'rgba(255, 255, 255, 0.1)',
        white12: 'rgba(255, 255, 255, 0.12)',
        white25: 'rgba(255, 255, 255, 0.25)',
        white30: 'rgba(255, 255, 255, 0.3)',
        white85: 'rgba(255, 255, 255, 0.85)',
      } : {
        paper: 'rgba(252, 251, 250, 0.85)',
        paperDark: 'rgba(252, 251, 250, 0.95)',
        white05: 'rgba(0, 0, 0, 0.04)',
        white10: 'rgba(0, 0, 0, 0.05)',
        white12: 'rgba(0, 0, 0, 0.06)',
        white25: 'rgba(0, 0, 0, 0.12)',
        white30: 'rgba(0, 0, 0, 0.15)',
        white85: 'rgba(0, 0, 0, 0.85)',
      },
      borders: {
        light: isDark ? 'rgba(192, 132, 252, 0.2)' : 'rgba(0, 0, 0, 0.12)',
        glow: `rgba(${isDark ? '192, 132, 252' : '147, 51, 234'}, 0.3)`,
      },
      components: isDark ? {
        suggestionChip: 'rgba(26, 26, 46, 0.9)',
        suggestionChipHover: 'rgba(99, 102, 241, 0.2)',
        agentMessage: 'rgba(192, 132, 252, 0.08)',
      } : {
        suggestionChip: '#f8f9fb',
        suggestionChipHover: '#f8f9fb',
        agentMessage: 'rgba(147, 51, 234, 0.06)',
      },
      shadows: {
        standard: isDark 
          ? '0 4px 24px rgba(0, 0, 0, 0.6), 0 8px 48px rgba(99, 102, 241, 0.15)'
          : '0 4px 16px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)',
        chatWindow: isDark
          ? '0 12px 48px rgba(0, 0, 0, 0.7), 0 0 32px rgba(192, 132, 252, 0.15), 0 4px 16px rgba(99, 102, 241, 0.2)'
          : '0 8px 32px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)',
        suggestionChip: isDark
          ? '0 4px 24px rgba(0, 0, 0, 0.6), 0 0 24px rgba(192, 132, 252, 0.12)'
          : '0 4px 16px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)',
        suggestionChipHover: isDark
          ? '0 0 48px rgba(192, 132, 252, 0.3), 0 0 80px rgba(99, 102, 241, 0.2), 0 8px 32px rgba(0, 0, 0, 0.5)'
          : '0 8px 32px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
      },
    },
  })
}

const theme = createAppTheme('dark')
export default theme
