"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

type TicketType = 'adult' | 'child' | 'infant'

interface Attendee {
  firstName: string;
  lastName: string;
}

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
  const [attendees, setAttendees] = React.useState<Attendee[]>([])
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('') // Single phone state
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [message, setMessage] = React.useState('')
  const [errors, setErrors] = React.useState<string | null>(null)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationOrderId, setConfirmationOrderId] = useState<string | null>(null);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors(null);
    setMessage('');
    const selectedCount = Object.values(quantities).reduce((a, b) => a + b, 0);
    if (selectedCount === 0) {
      setErrors('Please select at least one ticket.');
      return;
    }
    if (!attendees.every(a => a.firstName && a.lastName)) {
      setErrors('Please complete all required fields for all attendees.');
      return;
    }
    if (!email) {
      setErrors('Please provide a contact email.');
      return;
    }
    if (!phone) {
      setErrors('Please provide a contact phone number.');
      return;
    }
    if (!selectedFile) {
      setErrors('Please upload your payment receipt.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('total', total.toString());
    formData.append('message', message);
    formData.append('attendees', JSON.stringify(attendees));
    if (selectedFile) {
      formData.append('paymentReceipt', selectedFile);
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.error || 'Failed to place order.');
        return;
      }

      setMessage(data.message || 'Order placed successfully!');
      // Optionally, clear the form or redirect
      setQuantities({ adult: 0, child: 0, infant: 0 });
      setAttendees([]);
      setEmail('');
      setPhone('');
      setSelectedFile(null);
      setMessage(''); // Clear message after successful submission
      setConfirmationOrderId(data.orderId);
      setShowConfirmationModal(true);

    } catch (err) {
      console.error('Error submitting order:', err);
      setErrors('An unexpected error occurred. Please try again.');
    }
  }

  // Calculate the total number of selected tickets
  const totalTicketsSelected = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  // Effect to update attendees array when ticket quantities change
  React.useEffect(() => {
    setAttendees(prev => {
      const newAttendees = Array.from({ length: totalTicketsSelected }, (_, i) => 
        prev[i] || { firstName: '', lastName: '' }
      );
      return newAttendees;
    });
  }, [totalTicketsSelected]);

  return (
    <section className='container max-w-6xl mx-auto px-5 pt-28 pb-20'>
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="inline-flex items-center text-primary-500 hover:text-primary-600 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Home
        </Link>
        {/* <Link href="/login" className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-200">Login</Link> */}
      </div>
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

          {Array.from({ length: totalTicketsSelected }).map((_, attendeeIndex) => (
            <div key={attendeeIndex} className="border border-black/10 dark:border-white/10 rounded-2xl p-6 mb-4">
              <p className='text-lg font-semibold mb-3'>Attendee {attendeeIndex + 1}</p>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <input 
                  className='h-11 rounded-md px-3 border border-black/10 dark:border-white/10 bg-transparent' 
                  placeholder='First name *' 
                  value={attendees[attendeeIndex]?.firstName || ''} 
                  onChange={(e) => setAttendees(prev => 
                    prev.map((a, i) => i === attendeeIndex ? { ...a, firstName: e.target.value } : a)
                  )}
                />
                <input 
                  className='h-11 rounded-md px-3 border border-black/10 dark:border-white/10 bg-transparent' 
                  placeholder='Last name *' 
                  value={attendees[attendeeIndex]?.lastName || ''} 
                  onChange={(e) => setAttendees(prev => 
                    prev.map((a, i) => i === attendeeIndex ? { ...a, lastName: e.target.value } : a)
                  )}
                />
              </div>
              <div className='mt-4'>
                {/* Email is now collected once for the buyer */}
              </div>
              <div className='mt-4'>
                {/* Phone is now collected once for the buyer */}
              </div>
            </div>
          ))}

          <div className='mt-4'>
            <input 
              type='email' 
              className='w-full h-11 rounded-md px-3 border border-black/10 dark:border-white/10 bg-transparent' 
              placeholder='your.email@example.com *' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className='mt-4'>
            <input 
              className='w-full h-11 rounded-md px-3 border border-black/10 dark:border-white/10 bg-transparent' 
              placeholder='+63 9XX XXX XXXX *' 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
            />
          </div>
          <div className='mt-4'>
            <textarea className='w-full min-h-28 rounded-md p-3 border border-black/10 dark:border-white/10 bg-transparent' placeholder='Any special requests or messages...' value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>

          <div className='mt-6 p-6 bg-zinc-900/60 rounded-2xl border border-white/10 text-center'>
            <p className='text-white text-xl font-semibold mb-3'>Scan to Pay via GCash</p>
            <div className='w-40 h-40 bg-white mx-auto flex items-center justify-center rounded-lg overflow-hidden'>
              {/* Placeholder for GCash QR Code - Replace src with your actual GCash QR image */}
              <Image 
                src={'/images/terdimage/gcash_qr_placeholder.png'} 
                alt='GCash QR Code' 
                width={160} 
                height={160} 
                className='w-full h-full object-contain' 
              />
            </div>
            <p className='text-gray-400 text-sm mt-3'>Upload your payment receipt after scanning.</p>
          </div>

          <div className='mt-6'>
            <label htmlFor='receipt-upload' className='block text-white text-sm font-medium mb-2'>Upload Proof of Payment *</label>
            <input 
              type='file' 
              id='receipt-upload'
              className='w-full p-3 border border-black/10 dark:border-white/10 bg-transparent rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500/20 file:text-teal-400 hover:file:bg-teal-500/30' 
              onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
            />
            {selectedFile && <p className='text-gray-400 text-sm mt-2'>Selected file: {selectedFile.name}</p>}
          </div>

          {errors && <p className='text-destructive mt-3 text-sm'>{errors}</p>}

          <div className='mt-6'>
            <Button type='submit' size='lg' className='w-full'>Select Tickets to Continue</Button>
          </div>
        </form>
      </div>

      {showConfirmationModal && confirmationOrderId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-dark/40 rounded-lg p-6 shadow-xl max-w-sm w-full text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Order Placed!</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Your order has been placed successfully.</p>
            <p className="text-gray-700 dark:text-gray-300 font-semibold mb-6">Order ID: {confirmationOrderId}</p>
            <Button onClick={() => setShowConfirmationModal(false)} className="w-full">OK</Button>
          </div>
        </div>
      )}
    </section>
  )
}


