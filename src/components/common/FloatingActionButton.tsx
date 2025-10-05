import { IconButton, Tooltip } from '@mui/material'
import type { ReactNode } from 'react'
import { FAB } from '../../constants'

export type FabPosition = 'primary' | 'secondary'

interface FloatingActionButtonProps {
  children: ReactNode
  tooltip: string
  onClick: (event: React.MouseEvent<HTMLElement>) => void
  fabPosition?: FabPosition
  ariaLabel: string
  ariaControls?: string
  ariaHaspopup?: boolean
  ariaExpanded?: boolean
}

/**
 * Shared floating action button component with consistent styling and positioning
 */
function FloatingActionButton({ 
  children,
  tooltip,
  onClick,
  ariaLabel,
  fabPosition,
  ariaControls,
  ariaHaspopup,
  ariaExpanded,
}: FloatingActionButtonProps) {
  return (
    <Tooltip title={tooltip} placement={'right'}>
      <IconButton
        onClick={onClick}
        aria-label={ariaLabel}
        aria-controls={ariaControls}
        aria-haspopup={ariaHaspopup}
        aria-expanded={ariaExpanded}
        sx={{
          position: 'fixed',
          top: FAB.MARGIN,
          left: fabPosition === 'primary' ? FAB.MARGIN : FAB.MARGIN + FAB.SIZE + FAB.SPACING,
          zIndex: 1000,
          backgroundColor: (theme) => theme.customColors.overlays.paper,
          border: (theme) => `1px solid ${theme.customColors.borders.light}`,
          transition: 'all 0.3s ease',
        }}
      >
        {children}
      </IconButton>
    </Tooltip>
  )
}

export default FloatingActionButton
