import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser, error: existingUserError } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 409 }
      );
    }

    if (existingUserError && existingUserError.code !== "PGRST116") { // PGRST116 means no rows found
        console.error("Supabase query error during existing user check:", existingUserError);
        return NextResponse.json(
          { error: "An unexpected error occurred." },
          { status: 500 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data: newUser, error } = await supabase.from("users").insert([
      { email, password: hashedPassword },
    ]).select().single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Error registering user." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User registered successfully.", user: { id: newUser.id, email: newUser.email } },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Registration failed:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
