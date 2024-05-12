import { Button, Container } from '@mui/material'

import { ThemeToggle } from '@/components/theme/toggle'

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
        padding: 2,
      }}
    >
      <Button variant="contained">Button</Button>
      <ThemeToggle />
    </Container>
  )
}
