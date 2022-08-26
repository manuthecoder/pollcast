import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import EmailProvider from "next-auth/providers/email";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  // Configure one or more authentication providers
  adapter: MongoDBAdapter(clientPromise),

  // callbacks: {
  //   async redirect({ url, baseUrl }) {
  //     // Allows relative callback URLs
  //     if (url.startsWith("/")) return `${baseUrl}${url}`;
  //     // Allows callback URLs on the same origin
  //     else if (new URL(url).origin === baseUrl) return url;
  //     return baseUrl;
  //   },
  // },

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
    GitHubProvider({
      clientId: process.env.GITHUB_ID!.toString(),
      clientSecret: process.env.GITHUB_SECRET!.toString(),
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!.toString(),
      clientSecret: process.env.DISCORD_CLIENT_SECRET!.toString(),
    }),
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
});
