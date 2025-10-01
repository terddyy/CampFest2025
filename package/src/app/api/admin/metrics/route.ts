import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

// Placeholder for admin-set overrides
// let adminOverrideAttendees: number | null = null;
// let adminOverrideRigs: number | null = null;

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch override counts from the metrics table
    const { data: metricsData, error: metricsError } = await supabase
      .from('metrics')
      .select('total_attendees, total_rigs')
      .single();

    let overriddenAttendees: number | null = null;
    let overriddenRigs: number | null = null;

    if (metricsError && metricsError.code !== 'PGRST116') { // PGRST116 means no rows found
      console.error("Error fetching metrics from DB:", metricsError);
      return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 });
    }

    if (metricsData) {
      overriddenAttendees = metricsData.total_attendees;
      overriddenRigs = metricsData.total_rigs;
    }

    // Fetch current counts from the database if no overrides are set
    const { count: dbAttendees, error: attendeesError } = await supabase
      .from('attendees')
      .select('*', { count: 'exact' });

    const { count: dbRigs, error: rigsError } = await supabase
      .from('orders')
      .select('plate_number', { count: 'exact' })
      .not('plate_number', 'is', null);

    if (attendeesError || rigsError) {
      console.error("Error fetching counts from DB:", attendeesError || rigsError);
      return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 });
    }

    const totalAttendees = overriddenAttendees !== null ? overriddenAttendees : dbAttendees || 0;
    const totalRigs = overriddenRigs !== null ? overriddenRigs : dbRigs || 0;

    return NextResponse.json({ totalAttendees, totalRigs }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/admin/metrics:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { totalAttendees, totalRigs } = await req.json();

    if (typeof totalAttendees !== 'number' && totalAttendees !== null) {
      return NextResponse.json({ error: "Invalid payload. 'totalAttendees' must be a number or null." }, { status: 400 });
    }
    if (typeof totalRigs !== 'number' && totalRigs !== null) {
      return NextResponse.json({ error: "Invalid payload. 'totalRigs' must be a number or null." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('metrics')
      .upsert({ id: 1, total_attendees: totalAttendees, total_rigs: totalRigs }, { onConflict: 'id' });

    if (error) {
      console.error("Supabase upsert error:", error);
      return NextResponse.json({ error: "Failed to update metrics." }, { status: 500 });
    }

    return NextResponse.json({ message: "Metrics updated successfully.", totalAttendees, totalRigs }, { status: 200 });
  } catch (error) {
    console.error("Error in PATCH /api/admin/metrics:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
