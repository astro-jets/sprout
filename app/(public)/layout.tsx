import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '../context/AuthProvider'
import Sidebar from '../components/Sidebar/Sidebar'
import { IoPlanet } from 'react-icons/io5';
import { BsList } from 'react-icons/bs'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sprout Farms',
  description: "IOT Farm Management Sytem for Sprout LTD",
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="w-full overflow-hidden relative">
            <div className="min-h-20 w-full fixed top-0 left-0 bg-[#111] px-3 flex items-center space-x-8 ">
              <h1 className='text-white flex w-1/5'>Sprout <span><IoPlanet /></span></h1>
              <BsList color='#fff' size={20} />
            </div>
            <div className="w-full bg-[#000] top-16 relative">
              <Sidebar />
              <div className="relative left-[22%] min-h-screen w-full py-4">
                {children}
              </div>
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
