'use client'
import { Icon } from '@iconify/react'
import Link from 'next/link'


import Image from 'next/image'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const Header: React.FC = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { data: session } = useSession();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`fixed z-50 w-full top-0 transition-all duration-300 bg-white/30 backdrop-blur-lg shadow-lg py-2`}>
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
              <div className={`hidden md:flex items-center gap-6`}>
                <a href="tel:09178162695" className={`text-sm sm:text-base flex items-center gap-2 text-black dark:text-white dark:border-white/20 border-r pr-6`}>
                  <Icon icon={'ph:phone-bold'} width={20} height={20} />
                  0917-816-2695 (Lhotte)
                </a>
                <a href="tel:09260592803" className={`text-sm sm:text-base flex items-center gap-2 text-black dark:text-white dark:border-white/20 border-r pr-6`}>
                  <Icon icon={'ph:phone-bold'} width={20} height={20} />
                  0926-059-2803 (Hilda)
                </a>
              </div>
              <Link href="/tickets" className="hidden md:block">
                <Button size="sm" className={`rounded-full px-4 bg-black text-white`}>Buy tickets</Button>
              </Link>
              <div className="md:hidden">
                <Button size="sm" className="rounded-full px-4 bg-black text-white" onClick={toggleMobileMenu}>
                  <Icon icon={'ph:list-bold'} width={24} height={24} />
                </Button>
              </div>
            </div>
          </div>
        </nav>
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-white dark:bg-black z-40 flex flex-col items-center justify-center space-y-8">
            <Link href="/" onClick={toggleMobileMenu}>
              <Button size="lg" className={`rounded-full px-8 bg-gray-700 text-white`}>Home</Button>
            </Link>
            {session?.user?.isAdmin && (
              <Link href="/dashboard" onClick={toggleMobileMenu}>
                <Button size="lg" className={`rounded-full px-8 bg-green-500 text-white`}>Dashboard</Button>
              </Link>
            )}
            <a href="tel:09178162695" className={`text-2xl flex items-center gap-2 text-black dark:text-white`}>
              <Icon icon={'ph:phone-bold'} width={24} height={24} />
              0917-816-2695 (Lhotte)
            </a>
            <a href="tel:09260592803" className={`text-2xl flex items-center gap-2 text-black dark:text-white`}>
              <Icon icon={'ph:phone-bold'} width={24} height={24} />
              0926-059-2803 (Hilda)
            </a>
            <Link href="/tickets" onClick={toggleMobileMenu}>
              <Button size="lg" className={`rounded-full px-8 bg-black text-white`}>Buy tickets</Button>
            </Link>
            <Link href="/login" onClick={toggleMobileMenu}>
              <Button size="lg" className={`rounded-full px-8 bg-blue-500 text-white`}>Sign In</Button>
            </Link>
            {session?.user && (
              <Button
                size="lg"
                className={`rounded-full px-8 bg-red-500 text-white`}
                onClick={() => {
                  signOut({ callbackUrl: '/' });
                  toggleMobileMenu();
                }}
              >
                Sign Out
              </Button>
            )}
            <Button size="lg" className="rounded-full px-8 bg-red-500 text-white" onClick={toggleMobileMenu}>
              Close
            </Button>
          </div>
        )}
    </header>
  )
}

export default Header
