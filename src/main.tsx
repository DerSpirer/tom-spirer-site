import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './index.css'
import App from './App.tsx'
import theme from './theme'

// Inject theme colors as CSS custom properties for use in index.css
const injectThemeColors = () => {
  const root = document.documentElement
  root.style.setProperty('--color-slate', theme.customColors.blobs.slate)
  root.style.setProperty('--color-fuchsia', theme.customColors.blobs.fuchsia)
  root.style.setProperty('--color-pink', theme.customColors.blobs.pink)
  root.style.setProperty('--color-purple1', theme.customColors.blobs.purple1)
  root.style.setProperty('--color-purple2', theme.customColors.blobs.purple2)
  root.style.setProperty('--color-rose', theme.customColors.blobs.rose)
  root.style.setProperty('--color-magenta', theme.customColors.blobs.magenta)
}

// Component to inject colors on mount
function ThemedApp() {
  useEffect(() => {
    injectThemeColors()
  }, [])

  return <App />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemedApp />
    </ThemeProvider>
  </StrictMode>,
)
