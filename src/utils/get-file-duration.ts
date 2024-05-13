import { AUDIO_TYPES, VALID_TYPES, VIDEO_TYPES } from './valid-file-types'

export async function getFileDuration(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    if (AUDIO_TYPES.includes(file.type)) {
      const audio = new Audio(URL.createObjectURL(file))

      audio.onloadedmetadata = () => {
        const duration = audio.duration
        audio.src = ''
        resolve(duration)
      }

      audio.onerror = (error) => reject(error)
    }

    if (VIDEO_TYPES.includes(file.type)) {
      const video = document.createElement('video')
      video.src = URL.createObjectURL(file)
      video.preload = 'metadata'

      video.onloadedmetadata = () => {
        const duration = video.duration
        video.src = ''
        resolve(duration)
      }

      video.onerror = (error) => reject(error)
    }

    if (!VALID_TYPES.includes(file.type)) {
      reject(new Error('File type not valid.'))
    }
  })
}
