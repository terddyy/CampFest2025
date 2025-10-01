"use client"

import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Breadcrumb from '@/components/Breadcrumb';

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
  payment_receipt_url?: string;
  created_at: string;
  plate_number?: string;
  vehicle_type?: string;
  drivetrain?: string;
  setup1?: string;
  setup2?: string;
  is_paid: boolean; // Changed to required boolean for clarity
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
  const [totalAttendees, setTotalAttendees] = useState<number>(0);
  const [totalRigs, setTotalRigs] = useState<number>(0);
  const [newAttendeesInput, setNewAttendeesInput] = useState<string>('');
  const [newRigsInput, setNewRigsInput] = useState<string>('');
  const [metricsMessage, setMetricsMessage] = useState<string | null>(null);

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

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/admin/metrics');
      const data = await response.json();
      if (response.ok) {
        setTotalAttendees(data.totalAttendees);
        setNewAttendeesInput(data.totalAttendees.toString());
        setTotalRigs(data.totalRigs);
        setNewRigsInput(data.totalRigs.toString());
      } else {
        console.error("Failed to fetch metrics:", data.error);
      }
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };

  const handleSubmitMetrics = async (e: React.FormEvent) => {
    e.preventDefault();
    setMetricsMessage(null);
    try {
      const response = await fetch('/api/admin/metrics', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalAttendees: newAttendeesInput === '' ? null : Number(newAttendeesInput),
          totalRigs: newRigsInput === '' ? null : Number(newRigsInput),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setMetricsMessage("Metrics updated successfully.");
        setTotalAttendees(data.totalAttendees);
        setTotalRigs(data.totalRigs);
      } else {
        setMetricsMessage(data.error || "Failed to update metrics.");
      }
    } catch (error) {
      setMetricsMessage("An unexpected error occurred.");
      console.error("Error updating metrics:", error);
    }
  };

  const handleTogglePaymentStatus = async (orderId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    const confirmMessage = newStatus
      ? 'Are you sure you want to mark this order as paid?'
      : 'Are you sure you want to mark this order as unpaid?';

    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_paid: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to update payment status.');
        return;
      }

      alert(`Order marked as ${newStatus ? 'paid' : 'unpaid'} successfully!`);
      fetchOrders(); // Refresh the orders list
      fetchMetrics(); // Refresh metrics after order update
    } catch (err) {
      console.error('Error updating payment status:', err);
      alert('An unexpected error occurred while updating payment status.');
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
      fetchMetrics(); // Fetch metrics on component mount
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
      <Breadcrumb links={[{ href: '/', text: 'Home' }, { href: '/dashboard', text: 'Dashboard' }]} />
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="mb-8 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
      >
        Sign Out
      </button>

      {/* Admin Metrics Management */}
      {session?.user?.isAdmin && (
        <div className="bg-zinc-900/60 rounded-2xl border border-white/10 p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Admin Metrics Management</h2>
          <form onSubmit={handleSubmitMetrics} className="space-y-4">
            <div>
              <label htmlFor="totalAttendees" className="block text-sm font-medium text-gray-300">Total Attendees</label>
              <input
                type="number"
                id="totalAttendees"
                className="mt-1 block w-full rounded-md bg-zinc-700 border-transparent text-white focus:border-teal-500 focus:ring-teal-500"
                value={newAttendeesInput}
                onChange={(e) => setNewAttendeesInput(e.target.value)}
                placeholder="Enter total attendees"
              />
            </div>
            <div>
              <label htmlFor="totalRigs" className="block text-sm font-medium text-gray-300">Total Rigs</label>
              <input
                type="number"
                id="totalRigs"
                className="mt-1 block w-full rounded-md bg-zinc-700 border-transparent text-white focus:border-teal-500 focus:ring-teal-500"
                value={newRigsInput}
                onChange={(e) => setNewRigsInput(e.target.value)}
                placeholder="Enter total rigs"
              />
            </div>
            {metricsMessage && (
              <p className={`text-sm ${metricsMessage.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
                {metricsMessage}
              </p>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200"
            >
              Update Metrics
            </button>
          </form>
        </div>
      )}

      <div className="mb-8">
        <Link href="/dashboard/paid-orders" className="text-teal-400 hover:underline">
          View Paid Orders
        </Link>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Pending Orders</h2>
      {ordersError && <p className="text-red-500 mb-4">{ordersError}</p>}
      {orders.length === 0 && !ordersError && <p className="mb-8">No pending orders found.</p>}
      {orders.length > 0 && (
        <div className="bg-zinc-900/60 rounded-2xl border border-white/10 p-6 mb-8">
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-white/10">ID</th>
                  <th className="py-2 px-4 border-b border-white/10">Email</th>
                  <th className="py-2 px-4 border-b border-white/10">Phone</th>
                  <th className="py-2 px-4 border-b border-white/10">Amount</th>
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
                        onClick={() => handleTogglePaymentStatus(order.id, order.is_paid)}
                        className={`${order.is_paid ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'} text-white px-3 py-1 rounded-md mr-2 transition-colors duration-200`}
                      >
                        {order.is_paid ? 'Unverify' : 'Verify'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="md:hidden space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-zinc-800/50 rounded-lg p-4 border border-white/10">
                <p className="text-sm text-gray-400"><strong>ID:</strong> {order.id}</p>
                <p className="text-sm text-gray-400 mt-1"><strong>Email:</strong> {order.purchaser_email}</p>
                <p className="text-sm text-gray-400 mt-1"><strong>Phone:</strong> {order.purchaser_phone}</p>
                <p className="text-sm text-gray-400 mt-1"><strong>Amount:</strong> ₱{order.total_amount.toFixed(2)}</p>
                <p className="text-sm text-gray-400 mt-1"><strong>Plate:</strong> {order.plate_number || 'N/A'}</p>
                <p className="text-sm text-gray-400 mt-1"><strong>Vehicle:</strong> {order.vehicle_type || 'N/A'}</p>
                <p className="text-sm text-gray-400 mt-1"><strong>Drivetrain:</strong> {order.drivetrain || 'N/A'}</p>
                <p className="text-sm text-gray-400 mt-1"><strong>Setup 1:</strong> {order.setup1 || 'N/A'}</p>
                <p className="text-sm text-gray-400 mt-1"><strong>Setup 2:</strong> {order.setup2 || 'N/A'}</p>
                <p className="text-sm text-gray-400 mt-1"><strong>Tent Count:</strong> {order.tent_count || 'N/A'}</p>
                <div className="mt-2">
                  {order.payment_receipt_url ? (
                    <button
                      onClick={() => handleDownloadReceipt(order.payment_receipt_url as string)}
                      className="text-teal-400 hover:underline text-sm"
                    >
                      View Receipt
                    </button>
                  ) : (
                    <span className="text-sm text-gray-400">Receipt: N/A</span>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleTogglePaymentStatus(order.id, order.is_paid)}
                    className={`${order.is_paid ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'} text-white px-3 py-1 rounded-md flex-grow transition-colors duration-200`}
                  >
                    {order.is_paid ? 'Unverify' : 'Verify'}
                  </button>
                </div>
              </div>
            ))}
          </div>
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
