'use client'

import './globals.css'

import { CacheProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'

import Layout from '@/components/Layout'
import ThemeProvider from '@/components/ThemeProvider'
import createEmotionCache from '@/utils/createEmotionCache'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const clientSideEmotionCache = createEmotionCache()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <CacheProvider value={clientSideEmotionCache}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider>
            <CssBaseline />
            <Layout>
              {children}
            </Layout>
          </ThemeProvider>
          <Toaster position="top-right" expand richColors duration={3000} />
        </body>
      </CacheProvider>
    </html>

  )
}
