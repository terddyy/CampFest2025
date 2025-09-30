"use client"

import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
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
  attendees: {
    id: string;
    first_name: string;
    last_name: string;
  }[];
}

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [usersError, setUsersError] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders');
      const data = await response.json();

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
    } catch (err) {
      console.error('Error verifying payment:', err);
      alert('An unexpected error occurred while verifying payment.');
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login');
    }

    // Redirect non-admin users
    if (status === "authenticated" && session && !session.user?.isAdmin) {
      router.push('/'); // Redirect to home page or an unauthorized page
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');
        const data = await response.json();

        if (!response.ok) {
          setUsersError(data.error || 'Failed to fetch users.');
          return;
        }
        setUsers(data.users);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setUsersError('An unexpected error occurred while fetching users.');
      }
    };

    if (status === "authenticated" && session) {
      // Only fetch users if authenticated
      fetchUsers();
      fetchOrders(); // Fetch orders as well
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">Loading...</div>;
  }

  if (!session) {
    return null; // Redirecting is handled by useEffect
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard, {session.user?.name || session.user?.email}!</h1>
      <p className="text-lg mb-8">You are logged in as an administrator.</p>

      <div className="w-full max-w-4xl bg-white dark:bg-dark/40 rounded-2xl border border-black/10 dark:border-white/10 p-8 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
        {usersError && <p className="text-red-500 mb-4">{usersError}</p>}
        {users.length === 0 && !usersError && <p>No registered users found.</p>}
        {users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Registered At</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-dark/40 divide-y divide-gray-200 dark:divide-gray-700">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {new Date(user.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="w-full max-w-4xl bg-white dark:bg-dark/40 rounded-2xl border border-black/10 dark:border-white/10 p-8 shadow-md mt-8">
        <h2 className="text-2xl font-bold mb-4">Customer Orders</h2>
        {ordersError && <p className="text-red-500 mb-4">{ordersError}</p>}
        {orders.length === 0 && !ordersError && <p>No orders found.</p>}
        {orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border border-black/10 dark:border-white/10 rounded-xl p-5">
                <p className="text-lg font-semibold">Order ID: {order.id}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">Purchaser Email: {order.purchaser_email}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">Purchaser Phone: {order.purchaser_phone}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">Total Amount: {order.total_amount}</p>
                {order.plate_number && <p className="text-sm text-gray-700 dark:text-gray-300">Plate Number: {order.plate_number}</p>}
                {order.vehicle_type && <p className="text-sm text-gray-700 dark:text-gray-300">Vehicle Type: {order.vehicle_type}</p>}
                {order.drivetrain && <p className="text-sm text-gray-700 dark:text-gray-300">Drivetrain: {order.drivetrain}</p>}
                {order.setup1 && <p className="text-sm text-gray-700 dark:text-gray-300">Setup 1: {order.setup1}</p>}
                {order.setup2 && <p className="text-sm text-gray-700 dark:text-gray-300">Setup 2: {order.setup2}</p>}
                {order.special_requests && <p className="text-sm text-gray-700 dark:text-gray-300">Special Requests: {order.special_requests}</p>}
                {order.payment_receipt_url && (
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Payment Receipt: <a href={order.payment_receipt_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Receipt</a>
                  </p>
                )}
                <p className="text-sm text-gray-700 dark:text-gray-300">Order Date: {new Date(order.created_at).toLocaleString()}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Payment Status: {' '}
                  <span className={order.is_paid ? "text-green-500" : "text-red-500"}>
                    {order.is_paid ? 'Paid' : 'Unpaid'}
                  </span>
                </p>

                {!order.is_paid && (
                  <button
                    onClick={() => handleVerifyPayment(order.id)}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors duration-200"
                  >
                    Verify Payment
                  </button>
                )}

                <p className="text-base font-medium mt-4 mb-2">Attendees:</p>
                {order.attendees && order.attendees.length > 0 ? (
                  <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
                    {order.attendees.map((attendee) => (
                      <li key={attendee.id}>{attendee.first_name} {attendee.last_name}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No attendees found for this order.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="px-6 py-2 mt-4 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200"
      >
        Sign out
      </button>
    </div>
  );
};

export default DashboardPage;
