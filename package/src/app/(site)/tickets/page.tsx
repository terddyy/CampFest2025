"use client"
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

type TicketType = 'adult' | 'child' | 'infant' | 'earlyPass'

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
  { id: 'earlyPass', name: 'Early Pass', description: 'Early Pass to Campfest 2025', price: 600, note: 'Kids below 5 years old are FREE (no need to register)\nDate: November 7, 2025 (Friday)' },
  { id: 'adult', name: 'Adult', description: '13 years old and above', price: 1200, note: 'Age: 13+' },
  { id: 'child', name: 'Child', description: '5-12 years old', price: 600, note: 'Age: 5-12' },
  { id: 'infant', name: 'Infant', description: 'Below 5 years old: FREE', price: 0, note: 'kids below 5 years old: FREE (no need to register)' },
]

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(amount)
}

export default function TicketsPage() {
  const [quantities, setQuantities] = React.useState<Record<TicketType, number>>({ earlyPass: 0, adult: 0, child: 0, infant: 0 })
  const [attendees, setAttendees] = React.useState<Attendee[]>([])
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('') // Single phone state
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [message, setMessage] = React.useState('')
  const [errors, setErrors] = React.useState<string | null>(null)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationOrderId, setConfirmationOrderId] = useState<string | null>(null);
  const [plateNumber, setPlateNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [drivetrain, setDrivetrain] = useState('');
  const [setup1, setSetup1] = useState('');
  const [setup2, setSetup2] = useState('');
  const [tentCount, setTentCount] = useState('');

  useEffect(() => {
    const fetchDisplayMetrics = async () => {
      try {
        const response = await fetch('/api/admin/metrics');
        if (response.ok) {
          // setDisplayAttendees(data.totalAttendees); // Removed
          // setDisplayRigs(data.totalRigs); // Removed
        }
      } catch (error) {
        console.error("Failed to fetch display metrics:", error);
      }
    };
    fetchDisplayMetrics();
  }, []);

  const total = React.useMemo(() => {
    return (
      quantities.earlyPass * 600 +
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
    if (!plateNumber) {
      setErrors('Please provide your vehicle plate number.');
      return;
    }
    if (!vehicleType) {
      setErrors('Please select your vehicle type.');
      return;
    }
    if (!drivetrain) {
      setErrors('Please select your vehicle drivetrain.');
      return;
    }
    if (!setup1) {
      setErrors('Please select your first setup option.');
      return;
    }
    if (!setup2) {
      setErrors('Please select your second setup option.');
      return;
    }
    if (!tentCount) {
      setErrors('Please provide the number of tents.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('total', total.toString());
    formData.append('message', message);
    formData.append('attendees', JSON.stringify(attendees));
    formData.append('plateNumber', plateNumber);
    formData.append('vehicleType', vehicleType);
    formData.append('drivetrain', drivetrain);
    formData.append('setup1', setup1);
    formData.append('setup2', setup2);
    formData.append('tentCount', tentCount);
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
      setQuantities({ earlyPass: 0, adult: 0, child: 0, infant: 0 });
      setAttendees([]);
      setEmail('');
      setPhone('');
      setSelectedFile(null);
      setMessage(''); // Clear message after successful submission
      setPlateNumber('');
      setVehicleType('');
      setDrivetrain('');
      setSetup1('');
      setSetup2('');
      setTentCount('');
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
    <section className='bg-black container max-w-6xl mx-auto px-5 pt-28 pb-20'>
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="inline-flex items-center text-primary-500 hover:text-primary-600 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Home
        </Link>
        {/* <Link href="/login" className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-200">Login</Link> */}
      </div>
      <h1 className='text-3xl font-semibold mb-6 text-white'>Tickets</h1>
      {/* Removed displayAttendees and displayRigs */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-zinc-900/60 rounded-2xl border border-white/10 p-6'>
          <div className='flex items-center gap-2 mb-4'>
            <span className='text-xl font-semibold text-white'>Select Your Tickets</span>
          </div>
          <div className='space-y-4'>
            {TICKETS.map((t) => (
              <div key={t.id} className='border border-white/10 rounded-xl p-5'>
                <div className='flex items-start justify-between'>
                  <div>
                    <p className='text-base font-semibold text-white'>{t.name}</p>
                    <p className='text-sm text-gray-400'>{t.description}</p>
                    <span className='inline-block text-xs bg-orange-900 text-orange-300 px-2 py-0.5 rounded-full mt-2'>{t.note}</span>
                  </div>
                  <p className='text-2xl font-bold text-teal-400'>{t.price === 0 ? 'FREE' : formatCurrency(t.price)}</p>
                </div>
                <div className='flex items-center gap-3 mt-4'>
                  <span className='text-sm text-gray-400'>Quantity:</span>
                  <div className='flex items-center gap-2'>
                    <Button type='button' variant='outline' size='sm' onClick={() => setQty(t.id, quantities[t.id] - 1)} className="bg-transparent border-white/20 text-white hover:bg-white/10">−</Button>
                    <span className='w-6 text-center text-white'>{quantities[t.id]}</span>
                    <Button type='button' variant='outline' size='sm' onClick={() => setQty(t.id, quantities[t.id] + 1)} className="bg-transparent border-white/20 text-white hover:bg-white/10">+</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='flex items-center justify-between mt-6 pt-4 border-t border-white/10'>
            <p className='text-base font-medium text-white'>Total</p>
            <p className='text-2xl font-bold text-teal-400'>{formatCurrency(total)}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='bg-zinc-900/60 rounded-2xl border border-white/10 p-6'>
          <p className='text-xl font-semibold mb-4 text-white'>Registration Details</p>

          {Array.from({ length: totalTicketsSelected }).map((_, attendeeIndex) => (
            <div key={attendeeIndex} className="border border-white/10 rounded-2xl p-6 mb-4">
              <p className='text-lg font-semibold mb-3 text-white'>Attendee {attendeeIndex + 1}</p>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <input
                  className='h-11 rounded-md px-3 border border-white/10 bg-zinc-800/50 text-white placeholder-gray-500 focus:border-teal-400 focus:ring-teal-400'
                  placeholder='First name *'
                  value={attendees[attendeeIndex]?.firstName || ''}
                  onChange={(e) => setAttendees(prev => 
                    prev.map((a, i) => i === attendeeIndex ? { ...a, firstName: e.target.value } : a)
                  )}
                />
                <input
                  className='h-11 rounded-md px-3 border border-white/10 bg-zinc-800/50 text-white placeholder-gray-500 focus:border-teal-400 focus:ring-teal-400'
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
              className='w-full h-11 rounded-md px-3 border border-white/10 bg-zinc-800/50 text-white placeholder-gray-500 focus:border-teal-400 focus:ring-teal-400'
              placeholder='Plate Number'
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
            />
          </div>

          <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <select
              className='h-11 rounded-md px-3 border border-white/10 bg-zinc-800/50 text-white focus:border-teal-400 focus:ring-teal-400'
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" className="bg-zinc-800 text-gray-400">Select Vehicle Type</option>
              <option value="Sedan" className="bg-zinc-800 text-white">Sedan</option>
              <option value="PickUp" className="bg-zinc-800 text-white">Pickup</option>
              <option value="SUV" className="bg-zinc-800 text-white">SUV</option>
              <option value="Van" className="bg-zinc-800 text-white">Van</option>
              <option value="Motorcycle" className="bg-zinc-800 text-white">Motorcycle</option>
            </select>
            <select
              className='h-11 rounded-md px-3 border border-white/10 bg-zinc-800/50 text-white focus:border-teal-400 focus:ring-teal-400'
              value={drivetrain}
              onChange={(e) => setDrivetrain(e.target.value)}
            >
              <option value="" className="bg-zinc-800 text-gray-400">Select Drivetrain</option>
              <option value="4x2" className="bg-zinc-800 text-white">4x2</option>
              <option value="4x4" className="bg-zinc-800 text-white">4x4</option>
            </select>
          </div>

          <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <select
              className='h-11 rounded-md px-3 border border-white/10 bg-zinc-800/50 text-white focus:border-teal-400 focus:ring-teal-400'
              value={setup1}
              onChange={(e) => setSetup1(e.target.value)}
            >
              <option value="" className="bg-zinc-800 text-gray-400" disabled hidden>Select Setup 1</option>
              <option value="Rooftop Tent" className="bg-zinc-800 text-white">Rooftop Tent</option>
              <option value="Ground Tent" className="bg-zinc-800 text-white">Ground Tent</option>
              <option value="AirTent" className="bg-zinc-800 text-white">AirTent</option>
            </select>
            <select
              className='h-11 rounded-md px-3 border border-white/10 bg-zinc-800/50 text-white focus:border-teal-400 focus:ring-teal-400'
              value={setup2}
              onChange={(e) => setSetup2(e.target.value)}
            >
              <option value="" className="bg-zinc-800 text-gray-400" disabled hidden>Select Setup 2</option>
              <option value="with awning" className="bg-zinc-800 text-white">With Awning</option>
              <option value="without awning" className="bg-zinc-800 text-white">Without Awning</option>
            </select>
          </div>

          <div className='mt-4'>
            <select
              className='w-full h-11 rounded-md px-3 border border-white/10 bg-zinc-800/50 text-white focus:border-teal-400 focus:ring-teal-400'
              value={tentCount}
              onChange={(e) => setTentCount(e.target.value)}
            >
              <option value="" className="bg-zinc-800 text-gray-400" disabled hidden>Select Tent Count</option>
              <option value="1" className="bg-zinc-800 text-white">1</option>
              <option value="2" className="bg-zinc-800 text-white">2</option>
              <option value="3" className="bg-zinc-800 text-white">3</option>
              <option value="4" className="bg-zinc-800 text-white">4</option>
              <option value="5" className="bg-zinc-800 text-white">5</option>
            </select>
          </div>

          <div className='mt-4'>
            <input
              type='email'
              className='w-full h-11 rounded-md px-3 border border-white/10 bg-zinc-800/50 text-white placeholder-gray-500 focus:border-teal-400 focus:ring-teal-400'
              placeholder='your.email@example.com *'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mt-4'>
            <input 
              className='w-full h-11 rounded-md px-3 border border-white/10 bg-zinc-800/50 text-white placeholder-gray-500 focus:border-teal-400 focus:ring-teal-400' 
              placeholder='+63 9XX XXX XXXX *' 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
            />
          </div>
          <div className='mt-4'>
            <textarea className='w-full min-h-28 rounded-md p-3 border border-white/10 bg-zinc-800/50 text-white placeholder-gray-500 focus:border-teal-400 focus:ring-teal-400' placeholder='Any special requests or messages...' value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>

          <div className='mt-6 p-6 bg-zinc-900/60 rounded-2xl border border-white/10 text-center'>
            <p className='text-white text-xl font-semibold mb-3 flex items-center'>
              Scan to Pay via GCash 
            </p>
            <div className='w-40 h-40 bg-white mx-auto flex items-center justify-center rounded-lg overflow-hidden border border-white/20'>
              {/* Placeholder for GCash QR Code - Replace src with your actual GCash QR image */}
              <Image 
                src={'/images/terdimage/QR_Code_Example.svg.png'} 
                alt='GCash Payment QR Code' 
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
              className='w-full p-3 border border-white/10 bg-transparent rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500/20 file:text-teal-400 hover:file:bg-teal-500/30' 
              onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
            />
            {selectedFile && <p className='text-gray-400 text-sm mt-2'>Selected file: {selectedFile.name}</p>}
          </div>

          {errors && <p className='text-destructive mt-3 text-sm'>{errors}</p>}

          <div className='mt-6'>
            <Button type='submit' size='lg' className='w-full' disabled={totalTicketsSelected === 0}>Select Tickets to Continue</Button>
          </div>
        </form>
      </div>

      {showConfirmationModal && confirmationOrderId && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-zinc-900/90 rounded-lg p-6 shadow-xl max-w-sm w-full text-center border border-white/10">
            <h3 className="text-2xl font-bold mb-4 text-white">Order Placed!</h3>
            <p className="text-gray-300 mb-4">Your order has been placed successfully.</p>
            <p className="text-gray-300 font-semibold mb-6">Order ID: {confirmationOrderId}</p>
            <Button onClick={() => setShowConfirmationModal(false)} className="w-full">OK</Button>
          </div>
        </div>
      )}
    </section>
  )
}


