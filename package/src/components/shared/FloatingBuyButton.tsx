'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function FloatingBuyButton() {
  const pathname = usePathname()
  const hideOnTickets = pathname?.startsWith('/tickets')
  if (hideOnTickets) return null

  return (
    <div className="fixed right-4 bottom-4 z-[60]">
      <Link href="/tickets">
        <Button size="lg" className="shadow-xl rounded-full px-6">Buy tickets</Button>
      </Link>
    </div>
  )
}



