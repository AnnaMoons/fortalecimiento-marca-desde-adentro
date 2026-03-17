import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Documentación',
  description: 'Visualizador de documentación',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="antialiased bg-brand-cream">
        {children}
      </body>
    </html>
  )
}
