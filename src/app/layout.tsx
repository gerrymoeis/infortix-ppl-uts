import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Footer } from '@/components/layout/footer'
import { ThemeProvider } from '@/components/theme-provider'
import SupabaseProvider from '@/components/providers/supabase-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Infortic - Portal Informasi Lomba Indonesia',
  description: 'Temukan informasi lomba, kompetisi, dan event terbaru untuk mahasiswa dan pelajar Indonesia.',
  keywords: 'lomba, kompetisi, mahasiswa, pelajar, indonesia, dicoding, event, himafortic, infortic, unesa, surabaya, puspresnas, gemastik, olivia',
  authors: [{ name: 'Himafortic' }],
  creator: 'Himafortic',
  publisher: 'Himafortic',
  robots: 'index, follow',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SupabaseProvider>
            <div className="relative min-h-screen flex flex-col">
              {/* Navbar is now rendered inside each page as needed */}
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
