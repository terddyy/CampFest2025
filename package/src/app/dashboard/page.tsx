"use client"

import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const DashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login');
    }
  }, [status, router]);

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
