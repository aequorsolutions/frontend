import type { Metadata } from 'next'
import './globals.css'
import NextAuthSessionProvider from '@/providers/SessionProvider'
import { ReactQueryProvider } from '@/providers/ReactQueryProvider'
import { Header } from '@/components/Header'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'in.Orbit PRO',
  description:
    'Crie e gerencie metas mensais e semanais para organizar o seu dia a dia',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className={'bg-zinc-950 text-zinc-50 antialiased'}>
        <ReactQueryProvider>
          <NextAuthSessionProvider>
            <Header />
            {children}
            <Toaster invert richColors />
          </NextAuthSessionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
