import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("Authorization attempt started.");
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials.");
            return null;
          }

          console.log("Attempting to fetch user from Supabase with email:", credentials.email);
          const { data: user, error } = await supabase
            .from("users") // Assuming your user table is named 'users'
            .select("id, email, password")
            .eq("email", credentials.email)
            .single();

          if (error || !user) {
            console.error("Supabase query error or user not found:", error?.message || "User not found.");
            throw new Error("Invalid credentials.");
          }

          console.log("User fetched successfully. Comparing passwords.");
          const isValidPassword = await bcrypt.compare(credentials.password, user.password);

          if (isValidPassword) {
            console.log("Password is valid. Returning user.");
            return { id: user.id, name: user.email, email: user.email }; // You might want to fetch more user details
          }

          console.log("Invalid password.");
          return null;
        } catch (authorizeError: any) {
          console.error("Error during NextAuth authorization:", authorizeError.message);
          throw new Error("An unexpected error occurred during authorization.");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // Extend the session.user object to include id
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id as string,
          },
        };
      }
      return session;
    },
  },
});

export async function GET(req: Request, res: Response) {
  return handler(req, res);
}

export async function POST(req: Request, res: Response) {
  return handler(req, res);
}
