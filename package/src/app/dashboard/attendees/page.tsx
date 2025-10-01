'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

type Attendee = {
  id: number;
  first_name: string;
  last_name: string;
};

const AttendeesPage = () => {
  const { data: session } = useSession();
  const [confirmedAttendees, setConfirmedAttendees] = useState<Attendee[]>([]);
  const [confirmedAttendeesError, setConfirmedAttendeesError] = useState<string | null>(null);

  const fetchConfirmedAttendees = async () => {
    // Placeholder for fetching data
    // In a real application, you would fetch this from your API
    try {
      // const response = await fetch('/api/admin/confirmed-attendees');
      // if (!response.ok) {
      //   throw new Error('Failed to fetch confirmed attendees');
      // }
      // const data = await response.json();
      // setConfirmedAttendees(data);
      setConfirmedAttendees([
        { id: 1, first_name: 'John', last_name: 'Doe' },
        { id: 2, first_name: 'Jane', last_name: 'Smith' },
      ]);
      setConfirmedAttendeesError(null);
    } catch (error) {
      if (error instanceof Error) {
        setConfirmedAttendeesError(error.message);
      } else {
        setConfirmedAttendeesError('An unknown error occurred.');
      }
      setConfirmedAttendees([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard, {session?.user?.name || session?.user?.email}!</h1>
      <p className="text-lg mb-8">You are logged in as an administrator.</p>

      <div className="w-full max-w-4xl bg-white rounded-2xl border border-black/10 p-8 shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4">Confirmed Attendees</h2>
        <button
          onClick={fetchConfirmedAttendees}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
        >
          Show All Confirmed Attendees
        </button>
        {confirmedAttendeesError && <p className="text-red-500 mb-4">{confirmedAttendeesError}</p>}
        {confirmedAttendees.length === 0 && !confirmedAttendeesError && <p>No confirmed attendees found.</p>}
        {confirmedAttendees.length > 0 && (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {confirmedAttendees.map((attendee) => (
                  <tr key={attendee.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{attendee.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attendee.first_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{attendee.last_name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendeesPage;