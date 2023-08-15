import NavBar from "@components/navbar"
import "@styles/globals.css"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nutrition.Bro',
  description: 'Here you found all about nutrition',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <main className="app">
          <NavBar/>  
          {children}
        </main>
      </body>
    </html>
  )
}
