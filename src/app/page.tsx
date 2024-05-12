import { Container } from '@mui/material'

import { Form } from '@/components/form'
import { Logo } from '@/components/logo'
import { MainCard } from '@/components/main-card'
import { Status } from '@/components/status'
import { ThemeToggle } from '@/components/theme/toggle'
import { Transcription } from '@/components/transcription'

export default function Home() {
  return (
    <Container
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <MainCard>
        <Logo style={{ width: '100%' }} />
        <Form />
        <Status />
        <Transcription />
      </MainCard>

      <ThemeToggle />
    </Container>
  )
}
