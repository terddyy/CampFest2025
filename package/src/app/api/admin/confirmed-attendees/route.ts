import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    const { data: confirmedAttendees, error } = await supabase
      .from('orders')
      .select(`
        id,
        attendees (
          id,
          first_name,
          last_name
        )
      `)
      .eq('is_paid', true)
      .not('attendees', 'is', null);

    if (error) {
      console.error("Supabase query error fetching confirmed attendees:", error);
      return NextResponse.json(
        { error: "Error fetching confirmed attendees." },
        { status: 500 }
      );
    }

    // Flatten the attendees array from all orders
    const allConfirmedAttendees = confirmedAttendees.flatMap(order => order.attendees);

    return NextResponse.json({ confirmedAttendees: allConfirmedAttendees }, { status: 200 });
  } catch (err: unknown) {
    console.error("Failed to fetch confirmed attendees:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
