import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "next-auth";
import { authorizeUser } from "@/services/auth";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials: {
        email: string;
        password: string;
      }): Promise<User | null> {
        const response = await authorizeUser(credentials);

        if (!response.user) {
          throw new Error("No User found with email, Please sign up...!");
        }
        return response.user;
      },
    } as any),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...user, ...token };
    },
    async session({ session, token }: any) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signOut: "/logout",
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
});
