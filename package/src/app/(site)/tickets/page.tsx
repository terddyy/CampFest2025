"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type TicketType = 'adult' | 'child' | 'infant'

type TicketConfig = {
  id: TicketType
  name: string
  description: string
  price: number
  note: string
}

const TICKETS: TicketConfig[] = [
  { id: 'adult', name: 'Adult', description: '13 years old and above', price: 1200, note: 'Age: 13+' },
  { id: 'child', name: 'Child', description: '5-12 years old', price: 600, note: 'Age: 5-12' },
  { id: 'infant', name: 'Infant', description: 'Below 5 years old', price: 0, note: 'Age: 0-4' },
]

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(amount)
}

export default function TicketsPage() {
  const [quantities, setQuantities] = React.useState<Record<TicketType, number>>({ adult: 0, child: 0, infant: 0 })
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [errors, setErrors] = React.useState<string | null>(null)

  const total = React.useMemo(() => {
    return (
      quantities.adult * 1200 +
      quantities.child * 600 +
      quantities.infant * 0
    )
  }, [quantities])

  function setQty(id: TicketType, next: number) {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, next) }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrors(null)
    const selectedCount = Object.values(quantities).reduce((a, b) => a + b, 0)
    if (selectedCount === 0) {
      setErrors('Please select at least one ticket.')
      return
    }
    if (!firstName || !lastName || !email || !phone) {
      setErrors('Please complete all required fields.')
      return
    }
    alert(`Reserved ${selectedCount} ticket(s) for ${firstName} ${lastName}. Total: ${formatCurrency(total)}`)
  }

  return (
    <section className='container max-w-6xl mx-auto px-5 pt-28 pb-20'>
      <Link href="/" className="inline-flex items-center text-primary-500 hover:text-primary-600 transition-colors duration-200 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Back to Home
      </Link>
      <h1 className='text-3xl font-semibold mb-6'>Tickets</h1>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white dark:bg-dark/40 rounded-2xl border border-black/10 dark:border-white/10 p-6'>
          <div className='flex items-center gap-2 mb-4'>
            <span className='text-xl font-semibold'>Select Your Tickets</span>
          </div>
          <div className='space-y-4'>
            {TICKETS.map((t) => (
              <div key={t.id} className='border border-black/10 dark:border-white/10 rounded-xl p-5'>
                <div className='flex items-start justify-between'>
                  <div>
                    <p className='text-base font-semibold'>{t.name}</p>
                    <p className='text-sm text-black/60 dark:text-white/60'>{t.description}</p>
                    <span className='inline-block text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full mt-2'>{t.note}</span>
                  </div>
                  <p className='text-2xl font-bold text-primary'>{t.price === 0 ? 'FREE' : formatCurrency(t.price)}</p>
                </div>
                <div className='flex items-center gap-3 mt-4'>
                  <span className='text-sm text-black/60 dark:text-white/60'>Quantity:</span>
                  <div className='flex items-center gap-2'>
                    <Button type='button' variant='outline' size='sm' onClick={() => setQty(t.id, quantities[t.id] - 1)}>−</Button>
                    <span className='w-6 text-center'>{quantities[t.id]}</span>
                    <Button type='button' variant='outline' size='sm' onClick={() => setQty(t.id, quantities[t.id] + 1)}>+</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='flex items-center justify-between mt-6 pt-4 border-t border-black/10 dark:border-white/10'>
            <p className='text-base font-medium'>Total</p>
            <p className='text-2xl font-bold text-primary'>{formatCurrency(total)}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='bg-white dark:bg-dark/40 rounded-2xl border border-black/10 dark:border-white/10 p-6'>
          <p className='text-xl font-semibold mb-4'>Registration Details</p>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <input className='h-11 rounded-md px-3 border border-black/10 dark:border-white/10 bg-transparent' placeholder='First name *' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            <input className='h-11 rounded-md px-3 border border-black/10 dark:border-white/10 bg-transparent' placeholder='Last name *' value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className='mt-4'>
            <input type='email' className='w-full h-11 rounded-md px-3 border border-black/10 dark:border-white/10 bg-transparent' placeholder='your.email@example.com *' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='mt-4'>
            <input className='w-full h-11 rounded-md px-3 border border-black/10 dark:border-white/10 bg-transparent' placeholder='+63 9XX XXX XXXX *' value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className='mt-4'>
            <textarea className='w-full min-h-28 rounded-md p-3 border border-black/10 dark:border-white/10 bg-transparent' placeholder='Any special requests or messages...' value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>

          {errors && <p className='text-destructive mt-3 text-sm'>{errors}</p>}

          <div className='mt-6'>
            <Button type='submit' size='lg' className='w-full'>Select Tickets to Continue</Button>
          </div>
        </form>
      </div>
    </section>
  )
}


