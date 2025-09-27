import NextAuth, { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";

const authOptions: AuthOptions = {
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

          const { data: user, error } = await supabase
            .from("users") // Assuming your user table is named 'users'
            .select("id, email, password")
            .eq("email", credentials.email)
            .single();

          if (error || !user) {
            throw new Error("Invalid credentials.");
          }

          const isValidPassword = await bcrypt.compare(credentials.password, user.password);

          if (isValidPassword) {
            return { id: user.id, name: user.email, email: user.email }; // You might want to fetch more user details
          }

          return null;
        } catch (authorizeError: unknown) {
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
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
