import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/^@/, '') || '';
    console.log("--- API CALL START ---");
    console.log("Supabase URL (cleaned):", supabaseUrl);
    console.log("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY:", process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY);

    const formData = await req.formData();
    console.log("Form data parsed.");

    const purchaserEmail = formData.get('email') as string;
    const purchaserPhone = formData.get('phone') as string;
    const totalAmount = parseFloat(formData.get('total') as string);
    const specialRequests = formData.get('message') as string | null;
    const attendeesString = formData.get('attendees') as string;
    const paymentReceipt = formData.get('paymentReceipt') as File | null;
    const plateNumber = formData.get('plateNumber') as string | null;
    const vehicleType = formData.get('vehicleType') as string | null;
    const drivetrain = formData.get('drivetrain') as string | null;
    const setup1 = formData.get('setup1') as string | null;
    const setup2 = formData.get('setup2') as string | null;
    const tentCount = formData.get('tentCount') as string | null;

    console.log("Extracted form fields.");

    if (!purchaserEmail || !purchaserPhone || isNaN(totalAmount) || !attendeesString) {
      console.log("Validation failed: Missing required order details.");
      return NextResponse.json(
        { error: "Missing required order details." },
        { status: 400 }
      );
    }

    const attendees = JSON.parse(attendeesString);
    console.log("Attendees parsed:", attendees);
    if (!Array.isArray(attendees) || attendees.length === 0) {
      console.log("Validation failed: Attendees information is missing or invalid.");
      return NextResponse.json(
        { error: "Attendees information is missing or invalid." },
        { status: 400 }
      );
    }

    let paymentReceiptUrl: string | null = null;

    if (paymentReceipt) {
      console.log("Payment receipt detected, attempting upload.");
      const fileExt = paymentReceipt.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = fileName;

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
      console.log("Receipt uploaded successfully. uploadData.path:", uploadData.path);
      paymentReceiptUrl = `${supabaseUrl}/storage/v1/object/public/receipts/${uploadData.path}`;
      console.log("Payment Receipt URL:", paymentReceiptUrl);
    }

    console.log("Attempting to insert order into database.");
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        purchaser_email: purchaserEmail,
        purchaser_phone: purchaserPhone,
        total_amount: totalAmount,
        payment_receipt_url: paymentReceiptUrl,
        special_requests: specialRequests,
        plate_number: plateNumber,
        vehicle_type: vehicleType,
        drivetrain: drivetrain,
        setup1: setup1,
        setup2: setup2,
        tent_count: tentCount,
      })
      .select('id')
      .single();

    if (orderError || !orderData) {
      console.error("Supabase order insert error:", orderError);
      console.log("Order insert error details:", orderError);
      return NextResponse.json(
        { error: "Failed to create order." },
        { status: 500 }
      );
    }

    const orderId = orderData.id;
    console.log("Order created with ID:", orderId);

    console.log("Attempting to insert attendees.");
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
      return NextResponse.json(
        { error: "Failed to save attendees." },
        { status: 500 }
      );
    }
    console.log("Attendees saved successfully.");

    console.log("--- API CALL END (Success) ---");
    return NextResponse.json(
      { message: "Order placed successfully!", orderId: orderId },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("--- API CALL END (Error) ---");
    console.error("Order submission failed:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred during order submission." },
      { status: 500 }
    );
  }
}
