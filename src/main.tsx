import { StrictMode, useEffect, useState, useMemo } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import type { Theme, PaletteMode } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './index.css'
import App from './App.tsx'
import { createAppTheme } from './theme'
import ThemeToggle from './components/ThemeToggle'

// Local storage key for theme preference
const THEME_STORAGE_KEY = 'app-theme-mode'

// Get initial theme mode from localStorage or system preference
const getInitialThemeMode = (): PaletteMode => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }
  // Default to dark mode
  return 'dark'
}

// Inject theme colors as CSS custom properties for use in index.css
const injectThemeColors = (theme: Theme) => {
  const root = document.documentElement
  root.style.setProperty('--color-slate', theme.customColors.blobs.slate)
  root.style.setProperty('--color-fuchsia', theme.customColors.blobs.fuchsia)
  root.style.setProperty('--color-pink', theme.customColors.blobs.pink)
  root.style.setProperty('--color-purple1', theme.customColors.blobs.purple1)
  root.style.setProperty('--color-purple2', theme.customColors.blobs.purple2)
  root.style.setProperty('--color-rose', theme.customColors.blobs.rose)
  root.style.setProperty('--color-magenta', theme.customColors.blobs.magenta)
}

// Main app component with theme state management
function ThemedApp() {
  const [mode, setMode] = useState<PaletteMode>(getInitialThemeMode)

  // Create theme based on current mode
  const theme = useMemo(() => createAppTheme(mode), [mode])

  // Inject CSS custom properties when theme changes
  useEffect(() => {
    injectThemeColors(theme)
  }, [theme])

  // Load appropriate syntax highlighting theme based on mode
  useEffect(() => {
    const isDark = mode === 'dark'
    const existingLink = document.getElementById('highlight-theme')
    
    if (existingLink) {
      existingLink.remove()
    }

    const link = document.createElement('link')
    link.id = 'highlight-theme'
    link.rel = 'stylesheet'
    link.href = isDark
      ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css'
      : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css'
    document.head.appendChild(link)

    return () => {
      link.remove()
    }
  }, [mode])

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light'
      localStorage.setItem(THEME_STORAGE_KEY, newMode)
      return newMode
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeToggle onToggle={toggleTheme} />
      <App />
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemedApp />
  </StrictMode>,
)
