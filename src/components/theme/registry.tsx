'use client'

import { CssBaseline } from '@mui/material'
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  getInitColorSchemeScript,
} from '@mui/material/styles'
import { ReactNode } from 'react'

import { createMuiTheme } from './theme'

export default function MuiThemeRegistry({
  children,
}: {
  children: ReactNode
}) {
  const muiTheme = createMuiTheme()

  return (
    <>
      <CssVarsProvider theme={muiTheme}>
        {getInitColorSchemeScript()}
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </>
  )
}
