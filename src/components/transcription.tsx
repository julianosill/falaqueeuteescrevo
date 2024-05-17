'use client'

import { CopyAll } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useAppSelector } from '@/store'

export function Transcription() {
  const [isClipboardSupported, setIsClipboardSupported] = useState(false)

  const transcription = useAppSelector((state) => state.transcription.result)

  const showCopyButton = isClipboardSupported

  async function handleCopyToClipboard() {
    if (!transcription) return null
    try {
      await navigator.clipboard.writeText(transcription)
      toast.success('Transcrição copiada para área de transferência.')
    } catch (error) {
      console.error(error)
      toast.error('Não foi possível copiar a transcrição.')
    }
  }

  useEffect(() => {
    setIsClipboardSupported('clipboard' in navigator)
  }, [])

  if (!transcription) return null

  return (
    <Stack
      sx={{
        alignItems: 'start',
        marginTop: 6,
        width: '100%',
        borderColor: 'divider',
        borderRadius: 2,
        borderStyle: 'solid',
        borderWidth: 1,
        padding: { xs: 2, sm: 3 },
        paddingTop: showCopyButton ? null : 4,
      }}
    >
      <Typography>{transcription}</Typography>
      {showCopyButton && (
        <Button
          size="small"
          variant="outlined"
          startIcon={<CopyAll />}
          sx={{
            marginTop: 3,
            paddingTop: 0.3,
            paddingBottom: 0.2,
          }}
          onClick={handleCopyToClipboard}
        >
          Copiar
        </Button>
      )}
    </Stack>
  )
}
