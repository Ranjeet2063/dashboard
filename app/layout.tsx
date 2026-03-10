import type { Metadata } from 'next'
import './globals.css'
import { PolicyProvider } from '@/context/PolicyContext'

export const metadata: Metadata = {
  title: 'Fortgate Dashboard - Gestión AML',
  description: 'Dashboard para gestión de políticas AML de criptoactivos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <PolicyProvider>{children}</PolicyProvider>
      </body>
    </html>
  )
}
