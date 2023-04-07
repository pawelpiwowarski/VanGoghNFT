import type { GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";

import GoogleProvider from "next-auth/providers/google";


import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { prisma } from "./db";

import { env } from "~/env.mjs";

/**
 * Module augmentation for `next-auth` types.
 * Allows us to add custom properties to the `session` object and keep type
 * safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 **/
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      subscriptionValidUntil: Date;

    
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
  //   // ...other propertiesx
  //   // role: UserRole;
  subscriptionValidUntil: Date;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks,
 * etc.
 *
 * @see https://next-auth.js.org/configuration/options
 **/
export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.subscriptionValidUntil = user.subscriptionValidUntil;
        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [



    //InstagramProvider({
      //clientId: process.env.INSTAGRAM_CLIENT_ID!,
      //clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!

    //}),
  //  Auth0Provider({
    //  clientId: process.env.AUTH0_CLIENT_ID!,
      //clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      //issuer: process.env.AUTH0_ISSUER
    //}),
    //EmailProvider({
      //server: process.env.EMAIL_SERVER,
     // from: process.env.EMAIL_FROM
    //})


  
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     **/
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the
 * `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 **/
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};