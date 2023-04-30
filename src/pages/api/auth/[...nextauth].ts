
// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google"
// import { authorizeUser } from "../../../services/auth";
// import { useRouter } from "next/router";
// import { useMutation } from "@tanstack/react-query";
// import { NextApiRequest, NextApiResponse } from "next";

// const providers = [
//   GoogleProvider({
//     clientId: process.env.GOOGLE_CLIENT_ID as string,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//   }),
// ]

// const authOptions: NextAuthOptions = {
//   providers,
//   pages: {
//     signIn: "/login",
//   },
//   // callbacks: {
//   //   signIn: async (user, account, profile) => {
//   //     if (account.provider === "google" && profile.verified_email) {
//   //       // Only allow sign in with verified email address
//   //       return true
//   //     }

//   //     // Perform other custom checks or transformations here...

//   //     return false
//   //   },
//   // },
// };

// // export default NextAuth(authOptions);
// // eslint-disable-next-line import/no-anonymous-default-export
// export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);

import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest } from "next";
import { User } from "next-auth";
// import { User } from "../../login/login.types";
// import { UseAuthorize } from "@/hooks/useAuthorize";
import { authorizeUser } from "@/services/auth";
import Cookies from "js-cookie";

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
      async authorize(
        credentials: { email: string, password: string},
        req: NextApiRequest
      ): Promise<User | null> {
        const result = await authorizeUser(credentials);
        const { data, error, token } = result;

        console.log(token)

        // set token to cookie
        Cookies.set("AccessToken", token);


        if (!result.user) {
          throw new Error("No User found with email, Please sign up...!");
        }
        
        return result.user;

      },
    } as any),
  ],
  pages: {
    signOut: "/logout",
  },
});
