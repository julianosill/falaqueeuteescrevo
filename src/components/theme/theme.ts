import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
})

export const createMuiTheme = () =>
  extendTheme({
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
    shape: {
      borderRadius: 6,
    },
    components: {
      MuiSelect: {
        styleOverrides: {
          root: {
            fontSize: '0.875rem',
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: '0.875rem',
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            height: 6,
            width: '100%',
            backgroundColor: 'var(--mui-palette-divider)',
            borderRadius: 9999,
          },
          bar1Determinate: { borderRadius: 9999 },
          bar1Indeterminate: { borderRadius: 9999 },
          bar2Indeterminate: { borderRadius: 9999 },
        },
      },
    },
  })
