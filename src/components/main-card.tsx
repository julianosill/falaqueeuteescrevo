'use client'

import { Card, type CardProps } from '@mui/material'

export function MainCard({ children, ...props }: CardProps) {
  return (
    <Card
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
