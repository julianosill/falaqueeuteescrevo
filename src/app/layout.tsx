import './globals.css'

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import type { Metadata } from 'next'
import { Toaster } from 'sonner'

import MuiThemeRegistry from '@/components/theme/registry'
import { env } from '@/env'
import { StoreProvider } from '@/store/store-provider'

export const metadata: Metadata = {
  title: 'Fala que eu te escrevo',
  description: 'Transcreva seus áudios e vídeos de forma prática e rápida.',
  metadataBase: new URL(env.NEXT_PUBLIC_APP_BASE_URL),
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
          <MuiThemeRegistry>
            <StoreProvider>{children}</StoreProvider>
          </MuiThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
