import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    console.log("NEXT_PUBLIC_SUPABASE_URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("NEXT_PUBLIC_SUPABASE_ANON_KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    const formData = await req.formData();

    const purchaserEmail = formData.get('email') as string;
    const purchaserPhone = formData.get('phone') as string;
    const totalAmount = parseFloat(formData.get('total') as string);
    const specialRequests = formData.get('message') as string | null;
    const attendeesString = formData.get('attendees') as string;
    const paymentReceipt = formData.get('paymentReceipt') as File | null;

    if (!purchaserEmail || !purchaserPhone || isNaN(totalAmount) || !attendeesString) {
      return NextResponse.json(
        { error: "Missing required order details." },
        { status: 400 }
      );
    }

    const attendees = JSON.parse(attendeesString);
    if (!Array.isArray(attendees) || attendees.length === 0) {
      return NextResponse.json(
        { error: "Attendees information is missing or invalid." },
        { status: 400 }
      );
    }

    let paymentReceiptUrl: string | null = null;

    if (paymentReceipt) {
      const fileExt = paymentReceipt.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `receipts/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('receipts') // Make sure this bucket exists in your Supabase Storage
        .upload(filePath, paymentReceipt, { cacheControl: '3600', upsert: false });

      if (uploadError) {
        console.error("Supabase storage upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload payment receipt." },
          { status: 500 }
        );
      }
      // Ensure no leading '@' or extra characters are prepended to the URL
      paymentReceiptUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${uploadData.path}`.replace(/^@/, '');
    }

    // Insert into orders table
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        purchaser_email: purchaserEmail,
        purchaser_phone: purchaserPhone,
        total_amount: totalAmount,
        payment_receipt_url: paymentReceiptUrl,
        special_requests: specialRequests,
      })
      .select('id')
      .single();

    if (orderError || !orderData) {
      console.error("Supabase order insert error:", orderError);
      return NextResponse.json(
        { error: "Failed to create order." },
        { status: 500 }
      );
    }

    const orderId = orderData.id;

    // Insert into attendees table
    const attendeesToInsert = attendees.map((attendee: { firstName: string; lastName: string }) => ({
      order_id: orderId,
      first_name: attendee.firstName,
      last_name: attendee.lastName,
    }));

    const { error: attendeesError } = await supabase
      .from('attendees')
      .insert(attendeesToInsert);

    if (attendeesError) {
      console.error("Supabase attendees insert error:", attendeesError);
      // Optionally, you might want to delete the order if attendees insertion fails
      return NextResponse.json(
        { error: "Failed to save attendees." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Order placed successfully!", orderId: orderId },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Order submission failed:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred during order submission." },
      { status: 500 }
    );
  }
}
