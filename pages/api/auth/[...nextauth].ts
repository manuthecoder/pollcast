import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

const prisma = new PrismaClient();

export default NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!.toString(),
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!.toString(),
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],
});
