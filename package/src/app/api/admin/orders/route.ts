import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    // For demonstration, authorization is commented out.
    // In a real application, implement role-based access control here.
    // const session = await getServerSession(authOptions);
    // if (!session || !session.user || !session.user.isAdmin) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { data: orders, error } = await supabase
      .from('orders')
      .select(`
        id,
        purchaser_email,
        purchaser_phone,
        total_amount,
        payment_receipt_url,
        special_requests,
        created_at,
        plate_number,
        vehicle_type,
        drivetrain,
        setup1,
        setup2,
        attendees ( 
          id,
          first_name,
          last_name
        )
      `);

    if (error) {
      console.error("Supabase query error fetching orders:", error);
      return NextResponse.json(
        { error: "Error fetching orders." },
        { status: 500 }
      );
    }

    return NextResponse.json({ orders }, { status: 200 });
  } catch (err: unknown) {
    console.error("Failed to fetch orders:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
