import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function PATCH(
  req: NextRequest,
  context: { params: { orderId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderId } = context.params;
    const { is_paid } = await req.json();

    if (typeof is_paid !== 'boolean') {
      return NextResponse.json({ error: "Invalid payload. 'is_paid' must be a boolean." }, { status: 400 });
    }

    const { data } = await supabase
      .from('orders')
      .update({ is_paid: is_paid })
      .eq('id', orderId)
      .select();

    if (!data) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Order payment status updated successfully.", order: data[0] });
  } catch (error) {
    console.error("Unexpected error in PATCH /api/admin/orders/[orderId]:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}

