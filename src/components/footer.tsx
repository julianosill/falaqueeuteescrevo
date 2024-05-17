import { Divider, Link, Stack, Typography } from '@mui/material'

import { ThemeToggle } from './theme/toggle'

export function Footer() {
  return (
    <Stack
      component="footer"
      divider={<Divider orientation="vertical" flexItem />}
      sx={{
        alignItems: 'center',
        gap: { xs: 1, sm: 2 },
        flexDirection: { xs: 'column', sm: 'row' },
        marginTop: 3,
        textAlign: 'center',
      }}
    >
      <ThemeToggle />
      <Typography variant="body2" color="text.secondary">
        Desenvolvido por{' '}
        <Link href="https://julianosill.com.br">Juliano Sill</Link>
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Conversão feita com <Link href="https://ffmpeg.org">FFmpeg</Link>
      </Typography>
    </Stack>
  )
}
