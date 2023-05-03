import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

import clientPromise from "../../../lib/db/connection";
// import { sendVerificationRequest } from "../../../lib/emails/send-verification";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authOptions);
