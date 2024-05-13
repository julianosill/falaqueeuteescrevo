import { getFileDuration } from './get-file-duration'
import {
  MAX_DURATION_MINUTES,
  MAX_FILE_SIZE_MB,
  VALID_TYPES,
} from './valid-file-types'

interface ValidateFile {
  success: boolean
  message: string
}

export async function validateFile(file: File): Promise<ValidateFile> {
  if (!VALID_TYPES.includes(file.type)) {
    return { success: false, message: 'Formato de arquivo inválido.' }
  }

  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return {
      success: false,
      message: `O arquivo deve ter ${MAX_FILE_SIZE_MB}mb ou menos.`,
    }
  }

  const duration = await getFileDuration(file)
  if (duration > MAX_DURATION_MINUTES * 60 + 1) {
    return {
      success: false,
      message: `A duração deve ser menor que ${MAX_DURATION_MINUTES} minutos.`,
    }
  }

  return {
    success: true,
    message: 'O arquivo é válido.',
  }
}
