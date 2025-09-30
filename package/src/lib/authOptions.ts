import { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const result = await supabase
            .from("users") // Assuming your user table is named 'users'
            .select("id, email, password, isAdmin") // Fetch isAdmin flag
            .eq("email", credentials.email)
            .single();

          const { data: user, error } = result;

          if (error || !user) {
            throw new Error("Invalid credentials.");
          }

          const isValidPassword = await bcrypt.compare(credentials.password, user.password);

          if (isValidPassword) {
            return { id: user.id, name: user.email, email: user.email, isAdmin: user.isAdmin }; // Include isAdmin in user object
          }

          return null;
        } catch {
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
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // Extend the session.user object to include id and isAdmin
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id as string,
            isAdmin: token.isAdmin as boolean, // Add isAdmin to session.user
          },
        };
      }
      return session;
    },
  },
};
