"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function AdminMetricsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [totalAttendees, setTotalAttendees] = useState<number | ''>('');
  const [totalRigs, setTotalRigs] = useState<number | ''>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'loading') return;

    if (!session || !session.user?.isAdmin) {
      router.push('/login'); // Redirect non-admins
      return;
    }

    fetchMetrics();
  }, [session, status, router]);

  const fetchMetrics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/admin/metrics');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch metrics');
      }
      setTotalAttendees(data.totalAttendees);
      setTotalRigs(data.totalRigs);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred while fetching metrics.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch('/api/admin/metrics', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalAttendees: typeof totalAttendees === 'number' ? totalAttendees : null,
          totalRigs: typeof totalRigs === 'number' ? totalRigs : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update metrics.');
      }
      setMessage(data.message);
      fetchMetrics(); // Re-fetch to confirm changes
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred while updating metrics.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return <div className="text-white p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-6">Error: {error}</div>;
  }

  return (
    <div className="container max-w-4xl mx-auto px-5 pt-28 pb-20 text-white">
      <h1 className="text-3xl font-semibold mb-6">Admin Metrics Management</h1>

      <form onSubmit={handleSubmit} className="bg-zinc-900/60 rounded-2xl border border-white/10 p-6">
        <div className="mb-4">
          <label htmlFor="totalAttendees" className="block text-sm font-medium text-gray-300 mb-2">Total Attendees</label>
          <input
            type="number"
            id="totalAttendees"
            className="w-full h-11 rounded-md px-3 border border-white/10 bg-zinc-800/50 text-white placeholder-gray-500 focus:border-teal-400 focus:ring-teal-400"
            value={totalAttendees}
            onChange={(e) => setTotalAttendees(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
            placeholder="Enter total attendees (leave empty to use database count)"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="totalRigs" className="block text-sm font-medium text-gray-300 mb-2">Total Rigs</label>
          <input
            type="number"
            id="totalRigs"
            className="w-full h-11 rounded-md px-3 border border-white/10 bg-zinc-800/50 text-white placeholder-gray-500 focus:border-teal-400 focus:ring-teal-400"
            value={totalRigs}
            onChange={(e) => setTotalRigs(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
            placeholder="Enter total rigs (leave empty to use database count)"
          />
        </div>

        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? 'Updating...' : 'Update Metrics'}
        </Button>
      </form>
    </div>
  );
}
