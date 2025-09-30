import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  try {
    // For demonstration, let's assume any logged-in user can view this for now.
    // In a real application, you would implement role-based access control here.
    // e.g., check if the user has an 'admin' role.
    // const session = await getServerSession(authOptions);
    // if (!session || !session.user) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { data: users, error } = await supabase
      .from("users")
      .select("id, email, created_at"); // Select relevant user fields

    if (error) {
      console.error("Supabase query error fetching users:", error);
      return NextResponse.json(
        { error: "Error fetching users." },
        { status: 500 }
      );
    }

    return NextResponse.json({ users }, { status: 200 });
  } catch (err: unknown) {
    console.error("Failed to fetch users:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
