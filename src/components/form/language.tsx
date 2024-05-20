import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material'
import { useDispatch } from 'react-redux'

import { updateLanguage } from '@/store/slices/transcription'

interface LanguageProps {
  disabled?: boolean
}

const options = [
  { value: 'de-DE', language: 'Alemão (DE)' },
  { value: 'ko-KR', language: 'Coreano (KR)' },
  { value: 'es-AR', language: 'Espanhol (AR)' },
  { value: 'es-MX', language: 'Espanhol (MX)' },
  { value: 'fr-FR', language: 'Francês (FR)' },
  { value: 'en-GB', language: 'Inglês (UK)' },
  { value: 'en-US', language: 'Inglês (US)' },
  { value: 'it-IT', language: 'Italiano (IT)' },
  { value: 'ja-JP', language: 'Japonês (JP)' },
  { value: 'pt-BR', language: 'Português (BR)' },
]

export function Language({ disabled }: LanguageProps) {
  const dispatch = useDispatch()

  function handleLanguageChange(e: SelectChangeEvent) {
    dispatch(updateLanguage(e.target.value))
  }

  return (
    <FormControl size="small">
      <InputLabel id="language-label">Idioma</InputLabel>
      <Select
        label="Idioma"
        labelId="language-label"
        defaultValue="pt-BR"
        onChange={handleLanguageChange}
        disabled={disabled}
        sx={{ height: '100%' }}
      >
        {options.map(({ value, language }) => (
          <MenuItem key={value} value={value}>
            {language}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
