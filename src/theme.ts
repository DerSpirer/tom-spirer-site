import { createTheme } from '@mui/material/styles';

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

// Create a custom theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4a9eff',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#0a1929',
      paper: '#1a2332',
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
    color: '#4a9eff',
    rgb: '74, 158, 255', // For use in rgba(74, 158, 255, alpha)
  },
  customColors: {
    // Background blob colors for animated background elements
    blobs: {
      fuchsia: '#4a0e4e',
      pink: '#4d0f29',
      purple1: '#3a1254',
      purple2: '#3d1560',
      rose: '#520d23',
      magenta: '#5a0d22',
      slate: '#0f172a',
    },
    // Semi-transparent overlay colors
    overlays: {
      paper: 'rgba(26, 35, 50, 0.6)',
      paperDark: 'rgba(26, 35, 50, 0.7)',
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
    },
    // Border colors
    borders: {
      subtle: 'rgba(255, 255, 255, 0.1)',
      light: 'rgba(255, 255, 255, 0.15)',
      medium: 'rgba(255, 255, 255, 0.2)',
    },
  },
});

export default theme;
