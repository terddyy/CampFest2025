'use client'
import { Icon } from '@iconify/react'
import Link from 'next/link'
import { useEffect, useRef, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const Header: React.FC = () => {
  const pathname = usePathname()

  const isHomepage = pathname === '/'

  return (
    <header className={`fixed z-50 w-full top-0 transition-all duration-300 bg-white/30 backdrop-blur-lg shadow-lg py-4`}>
      <nav
        className={`
          container max-w-8xl mx-auto px-5 2xl:px-0
          flex items-center justify-between transition-all duration-300
        `}
      >
        <div className='flex justify-between items-center gap-2 w-full'>
            <div className="flex items-center gap-2">
              <Link href="https://www.facebook.com/JustCampingChannel" target="_blank" rel="noopener noreferrer">
                <Image src="/images/terdimage/2025-JustCamping logo-8x8 flag-01.png" alt="JustCamping Logo" width={91} height={91} className={`h-auto w-16`} />
              </Link>
              <Link href="https://www.facebook.com/kampcharlienae" target="_blank" rel="noopener noreferrer">
                <Image src="/images/terdimage/kamp charlie nae.jpg" alt="Kamp Charlie Nae Logo" width={91} height={91} className={`h-auto w-16`} />
              </Link>
            </div>
            <div className='flex items-center gap-3 sm:gap-6'>
              <div className={`hidden md:block`}>
                <a href="tel:09312146746" className={`text-sm sm:text-base flex items-center gap-2 text-black dark:text-white dark:border-white/20 border-r pr-6`}>
                  <Icon icon={'ph:phone-bold'} width={20} height={20} />
                  0931-214-6746
                </a>
              </div>
              <Link href="/tickets" className="hidden md:block">
                <Button size="sm" className={`rounded-full px-4 bg-black text-white`}>Buy tickets</Button>
              </Link>
            </div>
          </div>
        </nav>
    </header>
  )
}

export default Header
