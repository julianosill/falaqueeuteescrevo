import './globals.css'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'

import MuiThemeRegistry from '@/components/theme/registry'

export const metadata: Metadata = {
  title: 'Fala que eu te escrevo',
  description: 'Transcreva seus áudios e vídeos de forma prática e rápida.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <Toaster richColors position="top-right" />
          <MuiThemeRegistry>{children}</MuiThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
