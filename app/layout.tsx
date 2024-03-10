import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Theme } from '@radix-ui/themes';
import './globals.css'
import '@radix-ui/themes/styles.css';
import { Toaster } from 'sonner'
//import NoticeMenu from '@/ui/Navbar/NoticeMenu';
import Navbar from '@/ui/Navbar/Navbar';
import AdminMenu from '@/ui/Navbar/AdminMenu';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className='flex flex-col min-h-dvh'>
        <body className={`${inter.className} flex flex-col grow`}>
          <Theme accentColor="pink">
            <Toaster />
            {/* <AdminMenu /> */}
            {/* <NoticeMenu /> */}
            <Navbar />
            <main className='flex flex-col grow'>{children}</main>
          </Theme>
        </body>
      </html>
    </ClerkProvider>
  )
}
