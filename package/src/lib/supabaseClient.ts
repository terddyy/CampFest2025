import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing environment variables for Supabase. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchTotalCounts() {
  const { count: attendeesCount, error: attendeesError } = await supabase
    .from('attendees')
    .select('*', { count: 'exact' });

  const { count: rigsCount, error: rigsError } = await supabase
    .from('orders')
    .select('plate_number', { count: 'exact' })
    .not('plate_number', 'is', null);

  if (attendeesError) {
    console.error("Error fetching attendees count:", attendeesError);
    return { totalAttendees: 0, totalRigs: 0 };
  }

  if (rigsError) {
    console.error("Error fetching rigs count:", rigsError);
    return { totalAttendees: 0, totalRigs: 0 };
  }

  return { totalAttendees: attendeesCount || 0, totalRigs: rigsCount || 0 };
}

