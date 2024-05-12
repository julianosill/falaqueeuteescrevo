'use client'

import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material'
import { IconButton, Stack, Typography, useColorScheme } from '@mui/material'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { mode, setMode } = useColorScheme()

  function handleToggleTheme() {
    mode === 'dark' ? setMode('light') : setMode('dark')
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Stack direction="row" alignItems="center" spacing={0.5}>
      <Typography variant="body2" color="text.secondary">
        Tema
      </Typography>

      <IconButton
        aria-label="tema"
        size="small"
        onClick={handleToggleTheme}
        sx={{ color: 'text.secondary' }}
      >
        {mode === 'light' ? (
          <LightModeOutlined fontSize="inherit" />
        ) : (
          <DarkModeOutlined fontSize="inherit" />
        )}
      </IconButton>
    </Stack>
  )
}
