import { Container } from '@mui/material'

import { Footer } from '@/components/footer'
import { Form } from '@/components/form'
import { Logo } from '@/components/logo'
import { MainCard } from '@/components/main-card'
import { Status } from '@/components/status'
import { Transcription } from '@/components/transcription'

export default function Home() {
  return (
    <Container
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <MainCard>
        <Logo style={{ width: '100%' }} />
        <Form />
        <Status />
        <Transcription />
      </MainCard>

      <Footer />
    </Container>
  )
}
