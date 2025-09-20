'use client'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const Header: React.FC = () => {
  const [sticky, setSticky] = useState(false)
  const pathname = usePathname()

  const handleScroll = useCallback(() => {
    setSticky(window.scrollY >= 50)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const isHomepage = pathname === '/'

  return (
    <header className={`fixed h-24 py-1 z-50 w-full bg-dark/50 backdrop-blur-lg transition-all duration-300 lg:px-0 px-4 top-0`}>
      <nav className={`container mx-auto max-w-8xl flex items-center justify-between py-4 duration-300 shadow-none top-0 px-4`}>
        <div className='flex justify-between items-center gap-2 w-full'>
          <Link href="/" className={`text-xl font-bold text-white ${isHomepage ? "block" : "block"}`}>
            KampFest2025
          </Link>
          <Link href="/" className={`text-xl font-bold text-white ${isHomepage ? "hidden" : "hidden"}`}>
            KampFest2025
          </Link>
          <div className='flex items-center gap-2 sm:gap-6'>
            <div className={`hidden md:block`}>
              <Link href="tel:09312146746" className={`text-base flex items-center gap-2 border-r pr-6 text-white border-white`}>
                <Icon icon={'ph:phone-bold'} width={24} height={24} />
                0931-214-6746
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header >
  )
}

export default Header
