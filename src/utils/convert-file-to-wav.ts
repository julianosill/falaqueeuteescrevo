import { fetchFile } from '@ffmpeg/util'

import { getFFmpeg } from '@/libs/ffmpeg'
import { store } from '@/store'
import { updateProgress, updateStatus } from '@/store/slices/transcription'

export async function convertFileToWav(file: File) {
  store.dispatch(updateStatus('starting'))

  const ffmpeg = await getFFmpeg()
  await ffmpeg.writeFile('input.mp3', await fetchFile(file))

  store.dispatch(updateStatus('converting'))

  ffmpeg.on('progress', (progress) => {
    const currentProgress = Math.round(progress.progress * 100)
    store.dispatch(updateProgress(currentProgress))
  })

  await ffmpeg.exec([
    '-i',
    'input.mp3',
    '-ac',
    '1',
    '-ar',
    '16000',
    'output.wav',
  ])

  const data = await ffmpeg.readFile('output.wav')
  const audioFileBlob = new Blob([data], { type: 'audio/wav' })
  const audioFile = new File([audioFileBlob], 'audio.wav', {
    type: 'audio/wav',
  })

  return audioFile
}
