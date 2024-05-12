'use client'

import { LinearProgress, Stack, Typography } from '@mui/material'

export function Status() {
  return (
    <Stack sx={{ gap: 1, marginTop: 6, textAlign: 'center', width: '100%' }}>
      <Typography variant="body2">Converting file...</Typography>
      <LinearProgress variant="determinate" value={20} />
    </Stack>
  )
}
