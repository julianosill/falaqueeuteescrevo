export const AUDIO_TYPES = [
  'audio/mpeg',
  'audio/wav',
  'audio/aac',
  'audio/ogg',
  'audio/webm',
]

export const VIDEO_TYPES = [
  'video/mp4',
  'video/mpeg',
  'video/ogg',
  'video/webm',
  'video/x-msvideo',
]

export const VALID_TYPES = [...AUDIO_TYPES, ...VIDEO_TYPES]
export const MAX_FILE_SIZE_MB = 500
export const MAX_DURATION_MINUTES = 10
