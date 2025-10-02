import { createTheme } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material/styles';

// Extend the theme type to include custom properties
declare module '@mui/material/styles' {
  interface Theme {
    glow: {
      color: string;
      rgb: string; // RGB values for use in rgba()
    };
    customColors: {
      // Blob background colors
      blobs: {
        fuchsia: string;
        pink: string;
        purple1: string;
        purple2: string;
        rose: string;
        magenta: string;
        slate: string;
      };
      // Semi-transparent overlays
      overlays: {
        paper: string;
        paperDark: string;
        white05: string;
        white10: string;
        white12: string;
        white15: string;
        white20: string;
        white25: string;
        white30: string;
        white85: string;
        black30: string;
        black40: string;
      };
      // Border colors
      borders: {
        subtle: string;
        light: string;
        medium: string;
      };
    };
  }
  interface ThemeOptions {
    glow?: {
      color?: string;
      rgb?: string;
    };
    customColors?: {
      blobs?: {
        fuchsia?: string;
        pink?: string;
        purple1?: string;
        purple2?: string;
        rose?: string;
        magenta?: string;
        slate?: string;
      };
      overlays?: {
        paper?: string;
        paperDark?: string;
        white05?: string;
        white10?: string;
        white12?: string;
        white15?: string;
        white20?: string;
        white25?: string;
        white30?: string;
        white85?: string;
        black30?: string;
        black40?: string;
      };
      borders?: {
        subtle?: string;
        light?: string;
        medium?: string;
      };
    };
  }
}

// Create a custom theme based on mode
export const createAppTheme = (mode: PaletteMode) => {
  const isDark = mode === 'dark';
  
  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? '#4a9eff' : '#3b82f6', // Bright blue for dark, vibrant blue for light
      },
      secondary: {
        main: isDark ? '#dc004e' : '#db2777', // Rose/pink
      },
      background: {
        default: isDark ? '#0f0e1a' : '#eff1f5', // Deep purple-blue or soft light gray
        paper: isDark ? '#1a1825' : '#f5f3f0', // Rich purple-tinted dark or warm off-white
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
      color: isDark ? '#4a9eff' : '#3b82f6',
      rgb: isDark ? '74, 158, 255' : '59, 130, 246',
    },
    customColors: {
      // Background blob colors for animated background elements
      blobs: isDark ? {
        fuchsia: '#2d1b47',
        pink: '#3d1f47',
        purple1: '#2a1f4a',
        purple2: '#331d52',
        rose: '#3d1d3f',
        magenta: '#401d42',
        slate: '#0f0e1a',
      } : {
        fuchsia: '#f5d0fe',
        pink: '#fce7f3',
        purple1: '#f3e8ff',
        purple2: '#ede9fe',
        rose: '#ffe4e6',
        magenta: '#fecaca',
        slate: '#e2e8f0',
      },
      // Semi-transparent overlay colors
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
        paper: 'rgba(245, 243, 240, 0.85)',
        paperDark: 'rgba(241, 237, 233, 0.95)',
        white05: 'rgba(0, 0, 0, 0.02)',
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
      // Border colors
      borders: isDark ? {
        subtle: 'rgba(255, 255, 255, 0.1)',
        light: 'rgba(255, 255, 255, 0.15)',
        medium: 'rgba(255, 255, 255, 0.2)',
      } : {
        subtle: 'rgba(0, 0, 0, 0.08)',
        light: 'rgba(0, 0, 0, 0.12)',
        medium: 'rgba(0, 0, 0, 0.16)',
      },
    },
  });
};

// Default export for backwards compatibility
const theme = createAppTheme('dark');
export default theme;
