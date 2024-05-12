'use client'

import { CloudUploadOutlined, GraphicEq } from '@mui/icons-material'
import { Button, Stack, styled, Tooltip, Typography } from '@mui/material'

import { Language } from './language'

export const HiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

export function Form() {
  return (
    <>
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary', marginTop: 6, textAlign: 'center' }}
      >
        Selecione um arquivo de áudio ou vídeo, de até 10 minutos, e inicie sua
        transcrição.
      </Typography>

      <Stack
        component="form"
        sx={{
          flexDirection: 'row',
          gap: 1.5,
          marginTop: 4,
          width: '100%',
        }}
      >
        <Tooltip title="title" placement="top">
          <Button
            component="label"
            variant="outlined"
            sx={{
              color: 'text.primary',
              flex: '1 1 0%',
              gap: 0.5,
              textTransform: 'none',
            }}
            tabIndex={-1}
            startIcon={<CloudUploadOutlined sx={{ color: 'primary.light' }} />}
          >
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Selecionar arquivo
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.disabled', lineHeight: 1, marginLeft: 0.5 }}
            >
              10mb
            </Typography>
            <HiddenInput type="file" />
          </Button>
        </Tooltip>

        <Language />

        <Button type="submit" variant="contained" startIcon={<GraphicEq />}>
          Transcrever
        </Button>
      </Stack>

      <Typography
        variant="body2"
        sx={{ color: 'text.disabled', marginTop: 1, textAlign: 'center' }}
      >
        Arquivos suportados: mp3, wav, aac, oog, mp4, avi, webm
      </Typography>
    </>
  )
}
