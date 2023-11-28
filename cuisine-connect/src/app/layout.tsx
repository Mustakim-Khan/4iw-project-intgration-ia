import * as React from 'react'
import './globals.css'
import { Box, Sheet } from '@mui/joy'
import Header from './components/Header'
import { Inter } from 'next/font/google'
import AuthProvider from './components/providers/AuthProvider'
import { getServerSession } from 'next-auth'
import authOptions from './lib/authOptions'
import './components/assistant/chatbot.css'
import AssistantChat from './components/assistant/Assistant'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Cuisine-connect',
  description: 'Generated by create next app',
} 

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProvider session={session}>
          <nav><Header /></nav>
          <main>
            <Box
              sx={{
                bgcolor: 'white',
                // display: 'grid',
                gridTemplateRows: '52px 0px 1fr',
                minHeight: '110dvh',
              }}
            >
              <Sheet>
                  {children}
              </Sheet>
              <AssistantChat></AssistantChat>
            </Box>
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
