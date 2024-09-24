import type { Metadata } from 'next'

import { AppProviders } from '@/contexts/providers'

import { ThemeRegistry } from '@/styles/ThemeRegistry'
import { dmSansFont } from '@/styles/theme'

export const metadata: Metadata = {
  title: 'VerificaTicket',
  description:
    'Verifique se o seu ingresso foi re-vendido para outra pessoa além de você, de forma rápida e prática, sem criação de conta.',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="pt-BR">
    <head>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#42a5f5" />
      <meta name="msapplication-TileColor" content="#42a5f5" />
      <meta name="theme-color" content="#42a5f5" />
    </head>
    <body className={dmSansFont.className}>
      <ThemeRegistry>
        <AppProviders>{children}</AppProviders>
      </ThemeRegistry>
    </body>
  </html>
)

export default RootLayout
