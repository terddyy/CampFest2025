'use client'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

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
    <header className={`fixed z-50 w-full top-0 transition-all duration-300 ${sticky ? 'bg-transparent' : 'bg-dark/50 backdrop-blur-lg'}`}>
      <div className={`container mx-auto max-w-8xl px-4 lg:px-0`}> 
        <nav
          className={`
            flex items-center justify-between transition-all duration-300 mt-3
            ${sticky
              ? 'rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-xl shadow-lg ring-1 ring-black/10 dark:ring-white/10 px-5 py-3'
              : 'px-4 py-4'}
          `}
        >
          <div className='flex justify-between items-center gap-2 w-full'>
            <Link href="/" className={`font-bold text-white ${sticky ? 'text-black dark:text-white text-base sm:text-lg' : 'text-xl'}`}>
              KampFest2025
            </Link>
            <div className='flex items-center gap-3 sm:gap-6'>
              <div className={`hidden md:block`}>
                <a href="tel:09312146746" className={`text-sm sm:text-base flex items-center gap-2 ${sticky ? 'text-black dark:text-white border-black/10 dark:border-white/20' : 'text-white border-white/60'} border-r pr-6`}>
                  <Icon icon={'ph:phone-bold'} width={20} height={20} />
                  0931-214-6746
                </a>
              </div>
              <Link href="/tickets">
                <Button size="sm" className={`${sticky ? '' : 'bg-white text-dark hover:bg-white/90'} rounded-full px-4`}>Buy tickets</Button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
