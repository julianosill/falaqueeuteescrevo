'use client'

import { LinearProgress, Stack, Typography } from '@mui/material'

import { useAppSelector } from '@/store'

export function Status() {
  const status = useAppSelector((state) => state.transcription.status)
  const progress = useAppSelector((state) => state.transcription.progress)

  if (!status || status === 'done') return null

  const statusText = {
    starting: 'Iniciando conversão...',
    converting: `Convertendo arquivo: ${progress}%`,
    transcribing: 'Transcrevendo áudio...',
  }

  return (
    <Stack sx={{ gap: 1, marginTop: 6, textAlign: 'center', width: '100%' }}>
      <Typography variant="body2">{statusText[status]}</Typography>
      <LinearProgress
        variant={status === 'converting' ? 'determinate' : 'indeterminate'}
        value={progress}
      />
    </Stack>
  )
}
