
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from '@/context/sessionContext'
import { ErrorBoundary } from 'react-error-boundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fcoches',
  description: 'Una plataforma para hablar de todo, menos de coches',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col m-2`}>
      <ErrorBoundary fallback={<></>}>
          <SessionProvider>
            <Toaster />
            <NavBar />
            {children}
          </SessionProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
