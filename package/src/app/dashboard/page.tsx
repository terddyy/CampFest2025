"use client"

import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  isAdmin?: boolean; // Add isAdmin to User interface
  created_at: string;
}

interface Order {
  id: string;
  purchaser_email: string;
  purchaser_phone: string;
  total_amount: number;
  special_requests?: string;
  payment_receipt_url?: string;
  created_at: string;
  plate_number?: string;
  vehicle_type?: string;
  drivetrain?: string;
  setup1?: string;
  setup2?: string;
  is_paid?: boolean; // New column for payment status
  is_verified?: boolean; // Add is_verified to Order interface
  tent_count: string | null; // Add tent_count to Order interface
  attendees: {
    id: string;
    first_name: string;
    last_name: string;
  }[];
}

interface Attendee {
  id: string;
  first_name: string;
  last_name: string;
}

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const [verifiedOrders, setVerifiedOrders] = useState<Order[]>([]); // New state for verified orders
  const [verifiedOrdersError, setVerifiedOrdersError] = useState<string | null>(null); // New state for verified orders error

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders');
      const data = await response.json();
      console.log('API response for orders:', data);

      if (!response.ok) {
        setOrdersError(data.error || 'Failed to fetch orders.');
        return;
      }
      setOrders(data.orders);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setOrdersError('An unexpected error occurred while fetching orders.');
    }
  };

  const fetchVerifiedOrders = async () => { // New function to fetch verified orders
    try {
      const response = await fetch('/api/orders'); // Call the new GET API for verified orders
      const data = await response.json();
      console.log('API response for verified orders:', data);

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

  const handleVerifyPayment = async (orderId: string) => {
    if (!window.confirm('Are you sure you want to mark this order as paid?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isPaid: true }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to update payment status.');
        return;
      }

      alert('Order marked as paid successfully!');
      fetchOrders(); // Refresh the orders list
      fetchVerifiedOrders(); // Also refresh verified orders
    } catch (err) {
      console.error('Error verifying payment:', err);
      alert('An unexpected error occurred while verifying payment.');
    }
  };

  const handleUnverifyPayment = async (orderId: string) => {
    if (!window.confirm('Are you sure you want to mark this order as unpaid?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ isPaid: false }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to update payment status.');
        return;
      }

      alert('Order marked as unpaid successfully!');
      fetchOrders(); // Refresh the orders list
      fetchVerifiedOrders(); // Also refresh verified orders
    } catch (err) {
      console.error('Error unverifying payment:', err);
      alert('An unexpected error occurred while unverifying payment.');
    }
  };

  const handleDownloadReceipt = (url: string) => {
    window.open(url, '_blank');
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login');
    }

    // Redirect non-admin users
    if (status === "authenticated" && session && !session.user?.isAdmin) {
      router.push('/'); // Redirect to home page or an unauthorized page
    }

    

    if (status === "authenticated" && session) {
      // Only fetch users if authenticated
      
      fetchOrders(); // Fetch orders as well
      fetchVerifiedOrders(); // Fetch verified orders on component mount
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">Loading...</div>;
  }

  if (!session) {
    return null; // Redirecting is handled by useEffect
  }

  return (
    <div className="container max-w-7xl mx-auto px-5 pt-28 pb-20 text-white">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="mb-8 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
      >
        Sign Out
      </button>

      <div className="mb-8">
        <Link href="/dashboard/verified-orders" className="text-teal-400 hover:underline">
          View Verified Orders
        </Link>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Pending Orders</h2>
      {ordersError && <p className="text-red-500 mb-4">{ordersError}</p>}
      {orders.length === 0 && !ordersError && <p className="mb-8">No pending orders found.</p>}
      {orders.length > 0 && (
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
                <th className="py-2 px-4 border-b border-white/10">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
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
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleVerifyPayment(order.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 mr-2"
                    >
                      Verify
                    </button>
                    <button
                      onClick={() => handleUnverifyPayment(order.id)}
                      className="bg-yellow-600 text-white px-3 py-1 rounded-md hover:bg-yellow-700"
                    >
                      Unverify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-8">
        <Link href="/dashboard/metrics" className="text-teal-400 hover:underline">
          Go to Metrics Management
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
