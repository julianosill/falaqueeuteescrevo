import { Box, Container } from '@mui/material'

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
        <Box sx={{ maxWidth: '180px' }}>
          <Logo style={{ height: 'auto', width: '100%' }} />
        </Box>
        <Form />
        <Status />
        <Transcription />
      </MainCard>

      <Footer />
    </Container>
  )
}
