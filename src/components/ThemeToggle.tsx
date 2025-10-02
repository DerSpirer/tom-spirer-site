import { IconButton, Tooltip } from '@mui/material'
import { Brightness7, Brightness4 } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'

interface ThemeToggleProps {
  onToggle: () => void
}

function ThemeToggle({ onToggle }: ThemeToggleProps) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'} placement="left">
      <IconButton
        onClick={onToggle}
        aria-label="toggle theme"
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 1000,
          backgroundColor: (theme) => theme.customColors.overlays.paper,
          backdropFilter: 'blur(10px)',
          border: (theme) => `1px solid ${theme.customColors.borders.light}`,
          '&:hover': {
            backgroundColor: (theme) => theme.customColors.overlays.paperDark,
          },
          transition: 'all 0.3s ease',
        }}
      >
        {isDark ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  )
}

export default ThemeToggle
