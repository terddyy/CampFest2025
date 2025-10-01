"use client"

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

interface Order {
  id: string;
  purchaser_email: string;
  purchaser_phone: string;
  total_amount: number;
  payment_receipt_url: string | null;
  special_requests: string | null;
  is_verified: boolean;
  created_at: string;
  plate_number: string | null;
  vehicle_type: string | null;
  drivetrain: string | null;
  setup1: string | null;
  setup2: string | null;
  tent_count: string | null;
}

const VerifiedOrdersPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [verifiedOrders, setVerifiedOrders] = useState<Order[]>([]);
  const [verifiedOrdersError, setVerifiedOrdersError] = useState<string | null>(null);

  const handleDownloadReceipt = (url: string) => {
    window.open(url, '_blank');
  };

  const fetchVerifiedOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();

      if (!response.ok) {
        setVerifiedOrdersError(data.error || 'Failed to fetch verified orders.');
        return;
      }
      setVerifiedOrders(data);
    } catch (err) {
      console.error('Failed to fetch verified orders:', err);
      setVerifiedOrdersError('An unexpected error occurred while fetching verified orders.');
    }
  };

  useEffect(() => {
    if (status === 'loading') return;

    if (!session || !session.user?.isAdmin) {
      router.push('/login');
      return;
    }

    fetchVerifiedOrders();
  }, [session, status, router]);

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen text-white">Loading verified orders...</div>;
  }

  if (!session?.user?.isAdmin) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">Access Denied: You are not an administrator.</div>;
  }

  return (
    <div className="container max-w-7xl mx-auto px-5 pt-28 pb-20 text-white">
      <h1 className="text-3xl font-semibold mb-6">Verified Orders</h1>

      {verifiedOrdersError && <p className="text-red-500 mb-4">{verifiedOrdersError}</p>}
      {verifiedOrders.length === 0 && !verifiedOrdersError && <p className="mb-8">No verified orders found.</p>}
      {verifiedOrders.length > 0 && (
        <div className="bg-zinc-900/60 rounded-2xl border border-white/10 p-6 mb-8 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-white/10">ID</th>
                <th className="py-2 px-4 border-b border-white/10">Email</th>
                <th className="py-2 px-4 border-b border-white/10">Phone</th>
                <th className="py-2 px-4 border-b border-white/10">Amount</th>
                <th className="py-2 px-4 border-b border-white/10">Special Requests</th>
                <th className="py-2 px-4 border-b border-white/10">Plate Number</th>
                <th className="py-2 px-4 border-b border-white/10">Vehicle Type</th>
                <th className="py-2 px-4 border-b border-white/10">Drivetrain</th>
                <th className="py-2 px-4 border-b border-white/10">Setup 1</th>
                <th className="py-2 px-4 border-b border-white/10">Setup 2</th>
                <th className="py-2 px-4 border-b border-white/10">Tent Count</th>
                <th className="py-2 px-4 border-b border-white/10">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {verifiedOrders.map((order) => (
                <tr key={order.id} className="border-b border-white/10 last:border-b-0">
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.purchaser_email}</td>
                  <td className="py-2 px-4">{order.purchaser_phone}</td>
                  <td className="py-2 px-4">₱{order.total_amount.toFixed(2)}</td>
                  <td className="py-2 px-4">{order.special_requests || 'N/A'}</td>
                  <td className="py-2 px-4">{order.plate_number || 'N/A'}</td>
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
