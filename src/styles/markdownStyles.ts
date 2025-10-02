import type { SxProps, Theme } from '@mui/material'

export const getMarkdownStyles = (sender: 'user' | 'agent'): SxProps<Theme> => ({
  maxWidth: '70%',
  padding: 2,
  borderRadius: '12px',
  backgroundColor: sender === 'user' 
    ? 'primary.main'
    : (theme) => theme.customColors.components.agentMessage,
  color: 'text.primary',
  '& p': {
    margin: 0,
    marginBottom: '0.5em',
    '&:last-child': {
      marginBottom: 0,
    },
  },
  '& h1, & h2, & h3, & h4, & h5, & h6': {
    margin: 0,
    marginTop: '0.5em',
    marginBottom: '0.5em',
    '&:first-child': {
      marginTop: 0,
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  '& code': {
    backgroundColor: (theme) => theme.customColors.overlays.black30,
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '0.9em',
    fontFamily: 'monospace',
  },
  '& pre': {
    margin: '0.5em 0',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: (theme) => theme.customColors.overlays.black40,
    overflow: 'auto',
    '&:first-child': {
      marginTop: 0,
    },
    '&:last-child': {
      marginBottom: 0,
    },
    '& code': {
      backgroundColor: 'transparent',
      padding: 0,
    },
  },
  '& ul, & ol': {
    margin: '0.5em 0',
    paddingLeft: '1.5em',
    '&:first-child': {
      marginTop: 0,
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  '& li': {
    marginBottom: '0.25em',
  },
  '& blockquote': {
    margin: '0.5em 0',
    paddingLeft: '1em',
    borderLeft: (theme) => `3px solid ${theme.customColors.overlays.white30}`,
    '&:first-child': {
      marginTop: 0,
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  '& a': {
    color: 'primary.light',
    textDecoration: 'underline',
  },
  '& table': {
    borderCollapse: 'collapse',
    width: '100%',
    margin: '0.5em 0',
  },
  '& th, & td': {
    border: (theme) => `1px solid ${theme.customColors.borders.medium}`,
    padding: '6px 12px',
    textAlign: 'left',
  },
  '& th': {
    backgroundColor: (theme) => theme.customColors.overlays.white10,
    fontWeight: 'bold',
  },
})
