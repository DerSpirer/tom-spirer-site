import { useState } from 'react'
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import CodeIcon from '@mui/icons-material/Code'
import StorageIcon from '@mui/icons-material/Storage'

function GithubMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleNavigate = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
    handleClose()
  }

  return (
    <>
      <Tooltip title="View source code" placement="left">
        <IconButton
          onClick={handleClick}
          aria-label="github repositories"
          aria-controls={open ? 'github-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={{
            position: 'fixed',
            top: 16,
            right: 72, // Position to the left of ThemeToggle (16 + 40 + 16)
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
          <GitHubIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="github-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: (theme) => theme.customColors.overlays.paperDark,
            backdropFilter: 'blur(10px)',
            border: (theme) => `1px solid ${theme.customColors.borders.light}`,
            mt: 1,
          },
        }}
      >
        <MenuItem onClick={() => handleNavigate('https://github.com/DerSpirer/tom-spirer-site')}>
          <ListItemIcon>
            <CodeIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Frontend Repository</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('https://github.com/DerSpirer/TomSpirerSiteBackend')}>
          <ListItemIcon>
            <StorageIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Backend Repository</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}

export default GithubMenu