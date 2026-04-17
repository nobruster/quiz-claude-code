import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Você conhece o Claude Code?',
  description: 'Quiz de perguntas verdadeiro ou falso sobre o Claude Code — da Anthropic.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  )
}
