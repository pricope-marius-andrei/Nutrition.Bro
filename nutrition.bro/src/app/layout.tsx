import Provider from "@components/common/provider"
import Footer from "@components/footer"
import NavBar from "@components/navbar"
import "@styles/globals.css"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] })

const metadata: Metadata = {
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
        <Provider>
          <main className="app">
            <NavBar/>  
            {children}
            <SpeedInsights />
            <Footer/>
          </main>
        </Provider>
      </body>
    </html>
  )
}
