import type { Metadata } from 'next'

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
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
