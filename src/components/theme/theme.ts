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
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--mui-palette-text-disabled)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--mui-palette-primary-main)',
            },
            '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
              borderColor: 'var(--mui-palette-action-disabledBackground)',
            },
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
      MuiLink: {
        styleOverrides: {
          root: {
            textUnderlineOffset: 2,
          },
        },
      },
    },
  })
