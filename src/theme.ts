import { createTheme } from '@mui/material/styles';

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
});

export default theme;

