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
        main: isDark ? '#2b7de9' : '#7ba8e6',
      },
      secondary: {
        main: isDark ? '#dc004e' : '#db2777',
      },
      success: {
        main: isDark ? '#22c55e' : '#81c995',
      },
      error: {
        main: isDark ? '#dc2626' : '#e88b8b',
      },
      warning: {
        main: isDark ? '#f59e0b' : '#f5c563',
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
        light: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
        glow: `rgba(${isDark ? '167, 139, 250' : '147, 51, 234'}, 0.2)`,
      },
      components: isDark ? {
        suggestionChip: 'rgba(26, 24, 37, 0.7)',
        suggestionChipHover: 'rgba(26, 24, 37, 0.85)',
        agentMessage: 'rgba(255, 255, 255, 0.08)',
      } : {
        suggestionChip: '#f8f9fb',
        suggestionChipHover: '#f8f9fb',
        agentMessage: 'rgba(147, 51, 234, 0.06)',
      },
      shadows: {
        standard: isDark 
          ? '0 4px 16px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3)'
          : '0 4px 16px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)',
        chatWindow: isDark
          ? '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 255, 255, 0.1)'
          : '0 8px 32px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)',
        suggestionChip: isDark
          ? '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.1)'
          : '0 4px 16px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)',
        suggestionChipHover: isDark
          ? '0 0 40px rgba(255, 255, 255, 0.15), 0 0 60px rgba(255, 255, 255, 0.08), 0 8px 24px rgba(0, 0, 0, 0.4)'
          : '0 8px 32px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08)',
      },
    },
  })
}

const theme = createAppTheme('dark')
export default theme
