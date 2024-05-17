import * as sdk from 'microsoft-cognitiveservices-speech-sdk'

import { env } from '@/env'

export async function POST(request: Request) {
  const formData = await request.formData()
  const audioFile = formData.get('audioFile') as File
  const { searchParams } = new URL(request.url)
  const language = searchParams.get('lang')

  if (audioFile.type !== 'audio/wav') {
    return Response.json({ message: 'Invalid file type.' }, { status: 400 })
  }

  const maxAudioFileSize = 1024 * 1024 * 30 // 30mb

  if (audioFile.size > maxAudioFileSize) {
    return Response.json(
      { message: `Audio file too large (max size: ${maxAudioFileSize}mb).` },
      { status: 400 },
    )
  }

  const buffer = Buffer.from(await audioFile.arrayBuffer())
  const pushStream = sdk.AudioInputStream.createPushStream()
  pushStream.write(buffer)
  pushStream.close()

  const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream)
  const speechConfig = sdk.SpeechConfig.fromSubscription(
    env.AZURE_SUBSCRIPTION_KEY,
    env.AZURE_SERVICE_REGION,
  )
  speechConfig.speechRecognitionLanguage = language ?? 'pt-BR'

  const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig)

  try {
    const transcription = await new Promise((resolve, reject) => {
      let recognitionResult = ''

      recognizer.recognized = (sender, event) => {
        if (event.result.reason === sdk.ResultReason.RecognizedSpeech) {
          recognitionResult = recognitionResult.concat(' ', event.result.text)
        }
        if (event.result.reason === sdk.ResultReason.NoMatch) {
          reject(new Error('NOMATCH: Speech could not be recognized.'))
        }
      }

      recognizer.canceled = (sender, event) => {
        if (event.reason === sdk.CancellationReason.Error) {
          reject(
            new Error(`Recognition canceled. Details: ${event.errorDetails}`),
          )
        }

        recognizer.stopContinuousRecognitionAsync()
        resolve({
          reason: event.reason,
          message: 'Recognition canceled.',
          transcription: recognitionResult,
        })
      }

      recognizer.sessionStopped = () => {
        recognizer.stopContinuousRecognitionAsync()
        resolve({
          message: 'Recognition stopped.',
          transcription: recognitionResult,
        })
      }

      recognizer.startContinuousRecognitionAsync()
    })

    return Response.json(transcription)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}
