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
        is_paid,
        last_updated,
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
      `)
      .order('last_updated', { ascending: false })
      .order('created_at', { ascending: false });

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

export async function PUT(req: Request) {
  try {
    const { id, is_paid } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Order ID is required." }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('orders')
      .update({ is_paid: is_paid, last_updated: new Date().toISOString() })
      .eq('id', id)
      .select();

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json(
        { error: "Error updating order." },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json({ order: data[0] }, { status: 200 });
  } catch (err: unknown) {
    console.error("Failed to update order:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
