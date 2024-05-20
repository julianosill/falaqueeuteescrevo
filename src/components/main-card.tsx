'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Card, type CardProps } from '@mui/material'

import { customAnimation } from '@/libs/auto-animate'

export function MainCard({ children, ...props }: CardProps) {
  const [parent] = useAutoAnimate(customAnimation)

  return (
    <Card
      ref={parent}
      component="main"
      variant="outlined"
      sx={{
        alignItems: 'center',
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '720px',
        padding: { xs: 3, sm: 6 },
        width: '100%',
      }}
      {...props}
    >
      {children}
    </Card>
  )
}
