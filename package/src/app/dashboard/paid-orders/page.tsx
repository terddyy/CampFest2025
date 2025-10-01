"use client"

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Breadcrumb from '@/components/Breadcrumb';

interface Order {
  id: string;
  purchaser_email: string;
  purchaser_phone: string;
  total_amount: number;
  payment_receipt_url: string | null;
  is_paid: boolean;
  created_at: string;
  plate_number: string | null;
  vehicle_type: string | null;
  drivetrain: string | null;
  setup1: string | null;
  setup2: string | null;
  tent_count: string | null;
  attendees: {
    id: string;
    first_name: string;
    last_name: string;
  }[];
}

const VerifiedOrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [paidOrders, setPaidOrders] = useState<Order[]>([]);
  const [paidOrdersError, setPaidOrdersError] = useState<string | null>(null);

  const handleDownloadReceipt = (url: string) => {
    window.open(url, '_blank');
  };

  const downloadCSV = () => {
    const headers = [
      'ID',
      'Email',
      'Phone',
      'Amount',
      'Plate Number',
      'Attendees',
      'Vehicle Type',
      'Drivetrain',
      'Setup 1',
      'Setup 2',
      'Tent Count',
      'Receipt URL',
    ];
    const csvRows: string[] = [];

    csvRows.push(headers.join(','));

    for (const order of paidOrders) {
      const attendees = order.attendees
        .map((a) => `${a.first_name} ${a.last_name}`)
        .join('; ');
      const row = [
        order.id,
        order.purchaser_email,
        order.purchaser_phone,
        order.total_amount.toFixed(2),
        order.plate_number || 'N/A',
        `"${attendees}"`,
        order.vehicle_type || 'N/A',
        order.drivetrain || 'N/A',
        order.setup1 || 'N/A',
        order.setup2 || 'N/A',
        order.tent_count || 'N/A',
        order.payment_receipt_url || 'N/A',
      ];
      csvRows.push(row.map((item) => (typeof item === 'string' && item.includes(',') ? `"${item}"` : item)).join(','));
    }

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'paid_orders.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchPaidOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();

      if (!response.ok) {
        setPaidOrdersError(data.error || 'Failed to fetch paid orders.');
        return;
      }
      const sortedData = data.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setPaidOrders(sortedData);
    } catch (err) {
      console.error('Failed to fetch paid orders:', err);
      setPaidOrdersError('An unexpected error occurred while fetching paid orders.');
    }
  };

  useEffect(() => {
    if (status === 'loading') return;

    if (!session || !session.user?.isAdmin) {
      router.push('/login');
      return;
    }

    fetchPaidOrders();
  }, [session, status, router]);

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen text-white">Loading paid orders...</div>;
  }

  if (!session?.user?.isAdmin) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Access Denied: You are not an administrator.</div>;
  }

  const breadcrumbLinks = [
    { href: '/', text: 'Home' },
    { href: '/dashboard', text: 'Dashboard' },
    { href: '/dashboard/paid-orders', text: 'Paid Orders' },
  ];

  return (
    <div className="container max-w-7xl mx-auto px-5 pt-28 pb-20 text-white">
      <Breadcrumb links={breadcrumbLinks} />
      <h1 className="text-3xl font-semibold mb-6">Paid Orders</h1>

      {paidOrders.length > 0 && (
        <button
          onClick={downloadCSV}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Download CSV
        </button>
      )}

      {paidOrdersError && <p className="text-red-500 mb-4">{paidOrdersError}</p>}
      {paidOrders.length === 0 && !paidOrdersError && <p className="mb-8">No paid orders found.</p>}
      {paidOrders.length > 0 && (
        <div className="bg-zinc-900/60 rounded-2xl border border-white/10 p-6 mb-8 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-white/10">ID</th>
                <th className="py-2 px-4 border-b border-white/10">Email</th>
                <th className="py-2 px-4 border-b border-white/10">Phone</th>
                <th className="py-2 px-4 border-b border-white/10">Amount</th>
                <th className="py-2 px-4 border-b border-white/10">Plate Number</th>
                <th className="py-2 px-4 border-b border-white/10">Attendees</th>
                <th className="py-2 px-4 border-b border-white/10">Vehicle Type</th>
                <th className="py-2 px-4 border-b border-white/10">Drivetrain</th>
                <th className="py-2 px-4 border-b border-white/10">Setup 1</th>
                <th className="py-2 px-4 border-b border-white/10">Setup 2</th>
                <th className="py-2 px-4 border-b border-white/10">Tent Count</th>
                <th className="py-2 px-4 border-b border-white/10">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {paidOrders.map((order) => (
                <tr key={order.id} className="border-b border-white/10 last:border-b-0">
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.purchaser_email}</td>
                  <td className="py-2 px-4">{order.purchaser_phone}</td>
                  <td className="py-2 px-4">₱{order.total_amount.toFixed(2)}</td>
                  <td className="py-2 px-4">{order.plate_number || 'N/A'}</td>
                  <td className="py-2 px-4">
                    {order.attendees && order.attendees.length > 0 ? (
                      order.attendees.map((attendee, index) => (
                        <div key={attendee.id}>
                          {attendee.first_name} {attendee.last_name}
                        </div>
                      ))
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="py-2 px-4">{order.vehicle_type || 'N/A'}</td>
                  <td className="py-2 px-4">{order.drivetrain || 'N/A'}</td>
                  <td className="py-2 px-4">{order.setup1 || 'N/A'}</td>
                  <td className="py-2 px-4">{order.setup2 || 'N/A'}</td>
                  <td className="py-2 px-4">{order.tent_count || 'N/A'}</td>
                  <td className="py-2 px-4">
                    {order.payment_receipt_url ? (
                      <button
                        onClick={() => handleDownloadReceipt(order.payment_receipt_url as string)}
                        className="text-teal-400 hover:underline"
                      >
                        View Receipt
                      </button>
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default VerifiedOrdersPage;
