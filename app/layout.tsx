import './globals.css'
import { Toaster } from 'sonner'
import type { Metadata } from 'next'
import { Karla } from 'next/font/google'

import { EdgeStoreProvider } from '@/lib/edgestore'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ModalProvider } from '@/components/providers/modal-provider'
import { ConvexClientProvider } from '@/components/providers/convex-provider'

const font = Karla({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Notion',
  description: 'The connected workspace where better, faster work happens.',
  icons: {
    icon: [
      { media: "(prefers-color-scheme: light)", url: "/logo.png", href: "/logo.png" },
      { media: "(prefers-color-scheme: dark)", url: "/favicon.ico", href: "/favicon.ico" },
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange storageKey='notion-theme'>
              <Toaster position='bottom-center' />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
};