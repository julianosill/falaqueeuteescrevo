'use client'

import { Card, type CardProps } from '@mui/material'

import { useAppSelector } from '@/store'

export function MainCard({ children, ...props }: CardProps) {
  const status = useAppSelector((state) => state.transcription.status)

  return (
    <Card
      component="main"
      variant="outlined"
      sx={{
        alignItems: 'center',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: status === 'done' ? '960px' : '720px',
        padding: { xs: 3, sm: 6 },
        width: '100%',
      }}
      {...props}
    >
      {children}
    </Card>
  )
}
