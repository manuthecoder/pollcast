import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import EmailProvider from "next-auth/providers/email";

import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

import { selectAccount, createAccount } from "../user";

export default NextAuth({
  theme: {
    logo: "https://i.ibb.co/H4SQNtG/image.png",
    colorScheme: "dark",
  },
  // Configure one or more authentication providers
  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    async signIn({ user, account, profile }: any) {
      const email: string = profile.email;
      const name: string = profile.name;
      const accountMatch = await selectAccount(email);

      if (accountMatch) {
        console.log("Sign in successful!", accountMatch);
      } else {
        // Create user
        const newAccountData = await createAccount(name, email);
        console.log("Account created!", newAccountData);
      }
      return true;
    },
  },

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
      // token: {
      //   url: "https://manuthecoder-pollcast-rxr6pjv5rvq25v4w-3000.githubpreview.dev/api/auth/callback/github",
      // },
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
