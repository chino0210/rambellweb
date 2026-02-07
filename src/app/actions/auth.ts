import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { loginSchema } from "./zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const validated = loginSchema.safeParse(credentials);
        if (!validated.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: validated.data.email },
        });
        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          validated.data.password,
          user.password,
        );
        if (!isValid) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.role && session.user) {
        session.user.role = token.role as string;
      }
      if (token.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
