import { Metadata } from 'next'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: '🍕 PinePizza',
  description: 'Ponemos pizza en la piña y no nos arrepentimos.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center text-center">
          {children}
        </main>
      </body>
    </html>
  )
}
