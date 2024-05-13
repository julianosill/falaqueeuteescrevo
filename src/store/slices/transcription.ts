import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TranscriptionStatusType =
  | 'starting'
  | 'converting'
  | 'transcribing'
  | 'done'
  | null

export interface ITranscriptionState {
  language: string
  status: TranscriptionStatusType
  progress: number
  result: string | null
}

const initialState: ITranscriptionState = {
  language: 'pt-BR',
  status: null,
  progress: 0,
  result: null,
}

export const transcriptionSlice = createSlice({
  name: 'transcription',
  initialState,
  reducers: {
    updateLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
    },
    updateStatus: (state, action: PayloadAction<TranscriptionStatusType>) => {
      state.status = action.payload
    },
    updateProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload
    },
    updateResult: (state, action: PayloadAction<string>) => {
      state.result = action.payload
    },
  },
})

export const transcription = transcriptionSlice.reducer
export const { updateLanguage, updateStatus, updateProgress, updateResult } =
  transcriptionSlice.actions
