'use client'

import {
  AudioFileOutlined,
  CloudUploadOutlined,
  GraphicEq,
} from '@mui/icons-material'
import { Button, Stack, styled, Tooltip, Typography } from '@mui/material'
import { type ChangeEvent, type FormEvent, useState } from 'react'
import { toast } from 'sonner'

import { env } from '@/env'
import { api } from '@/libs/api'
import { useAppDispatch, useAppSelector } from '@/store'
import { updateResult, updateStatus } from '@/store/slices/transcription'
import { convertFileToWav } from '@/utils/convert-file-to-wav'
import { VALID_TYPES } from '@/utils/valid-file-types'
import { validateFile } from '@/utils/validate-file'

import { Language } from './language'

let transcriptionAttempts = 0

const HiddenInput = styled('input')({
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
  const [file, setFile] = useState<File | null>(null)

  const language = useAppSelector((state) => state.transcription.language)
  const status = useAppSelector((state) => state.transcription.status)
  const dispatch = useAppDispatch()

  const isSubmitDisabled = !file || (status !== null && status !== 'done')
  const fileSize = file ? (file.size / 1024 / 1024).toFixed(1) + 'mb' : null
  const MAX_DURATION_MINUTES = env.NEXT_PUBLIC_MAX_DURATION_IN_MIN

  function handleFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.currentTarget
    if (!files || files.length === 0) return
    const selectedFile = files[0]

    if (!VALID_TYPES.includes(selectedFile.type)) {
      setFile(null)
      toast.warning('Arquivo inválido, selecione um arquivo de áudio ou vídeo.')
      return
    }

    setFile(selectedFile)
  }

  async function handleTranscription(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!file) return
    dispatch(updateResult(null))

    const fileValidation = await validateFile(file)
    if (!fileValidation.success) {
      setFile(null)
      dispatch(updateStatus(null))
      toast.warning(fileValidation.message)
      return
    }

    const audioFile = await convertFileToWav(file)
    const formData = new FormData()
    formData.append('audioFile', audioFile)

    try {
      dispatch(updateStatus('transcribing'))
      const response = await api(`/transcribe?lang=${language}`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        transcriptionAttempts++
        dispatch(updateStatus(null))

        const error = await response.json()
        console.error(error)

        if (transcriptionAttempts > 3) {
          return toast.error(
            'Erro na transcrição. Por favor, entre em contato com o administrador do projeto.',
            { duration: 6000 },
          )
        }

        if (response.status === 504) {
          return toast.error(
            'O tempo de transcrição ultrapassou o limite. Por favor, envie um arquivo com duração menor.',
            { duration: 6000 },
          )
        }

        return toast.error('A transcrição falhou. Por favor, tente novamente.')
      }

      const result = await response.json()
      dispatch(updateResult(result.transcription))
      dispatch(updateStatus('done'))
      transcriptionAttempts = 0
    } catch (error) {
      toast.error('Não foi possível iniciar a transcrição. Tente novamente.')
      console.error('Error during transcription:\n', error)
      dispatch(updateStatus(null))
      transcriptionAttempts++
    }
  }

  return (
    <>
      {!status && (
        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', marginTop: 6, textAlign: 'center' }}
        >
          Selecione um arquivo de áudio ou vídeo e inicie sua transcrição
          (duração máxima de {MAX_DURATION_MINUTES} minutos).
        </Typography>
      )}

      <Stack
        component="form"
        sx={{
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 1.5 },
          marginTop: status ? 6 : 4,
          width: '100%',
        }}
        onSubmit={handleTranscription}
      >
        <Tooltip title={file ? file.name : null} placement="top">
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
            startIcon={
              file ? (
                <AudioFileOutlined sx={{ color: 'primary.light' }} />
              ) : (
                <CloudUploadOutlined sx={{ color: 'primary.light' }} />
              )
            }
          >
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {file ? file.name : 'Selecionar arquivo'}
            </Typography>
            {fileSize && (
              <Typography
                variant="body2"
                sx={{ color: 'text.disabled', lineHeight: 1, marginLeft: 0.5 }}
              >
                {fileSize}
              </Typography>
            )}
            <HiddenInput type="file" onChange={handleFileSelected} />
          </Button>
        </Tooltip>

        {file && <Language />}

        <Button
          type="submit"
          variant="contained"
          startIcon={<GraphicEq />}
          disabled={isSubmitDisabled}
        >
          Transcrever
        </Button>
      </Stack>

      {!file && (
        <Typography
          variant="body2"
          sx={{ color: 'text.disabled', marginTop: 1, textAlign: 'center' }}
        >
          Arquivos suportados: mp3, wav, aac, oog, mp4, avi, webm.
        </Typography>
      )}
    </>
  )
}
