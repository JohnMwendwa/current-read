import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import connectDB from "lib/db/connection";
import User from "lib/db/models/user_model";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        await connectDB();

        const user = await User.findByCredentials(
          credentials.email,
          credentials.password
        );

        return {
          email: user.email,
          image: "",
          name: user.firstName,
          id: user._id.toString(),
        };
      },
    }),
  ],

  pages: {
    error: "/api/auth/signin",
  },
};

export default NextAuth(authOptions);
