import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { createAccount, selectAccount } from "../user";
import clientPromise from "../../../lib/mongodb";

export default NextAuth({
  theme: {
    logo: "https://i.ibb.co/H4SQNtG/image.png",
    colorScheme: "dark",
  },
  // Configure one or more authentication providers
  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    async session({ session, user, token }: any) {
      if (session) {
        const accountMatch = await selectAccount(user.email);
        return { ...session, id: accountMatch.id };
      } else {
        return { session };
      }
    },
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

    // ...add more providers here
  ],
});
