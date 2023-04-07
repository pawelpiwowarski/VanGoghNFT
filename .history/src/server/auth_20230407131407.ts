/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { GetServerSidePropsContext } from "next";
import CredentialsProvider from 'next-auth/providers/credentials'
import { SiweMessage } from 'siwe'
import { getCsrfToken } from 'next-auth/react'
import { AdapterUser } from 'next-auth/adapters'
import { User } from '@prisma/client'

import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";



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

        // session.user.role = user.role; <-- put other properties on the session here
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [

    CredentialsProvider({
      name: 'Ethereum',
      credentials: {
          message: {
              label: 'Message',
              type: 'text',
              placeholder: '0x0',
          },
          signature: {
              label: 'Signature',
              type: 'text',
              placeholder: '0x0',
          },
      },
      async authorize(credentials) {
          try {
              const siwe = new SiweMessage(
                  JSON.parse(credentials?.message || '{}'),
              )
              const nextAuthUrl = new URL(env.NEXTAUTH_URL)

              const result = await siwe.verify({
                  signature: credentials?.signature || '',
                  domain: nextAuthUrl.host,
                  nonce: await getCsrfToken({ req }),
              })

              if (result.success) {
                  let user: AdapterUser | User | null =
                      await PrismaAdapter(prisma).getUserByAccount({
                          provider: 'ethereum',
                          providerAccountId: siwe.address,
                      })
                  if (!user) {
                      user = await prisma.user.create({
                          data: {
                              email: 'undefined',
                              emailVerified: null,
                              address: siwe.address,
                              accounts: {
                                  create: {
                                      provider: 'ethereum',
                                      providerAccountId: siwe.address,
                                      type: 'evm',
                                  },
                              },
                          },
                      })
                  }

                  return {
                      ...user,
                      address: siwe.address,
                      id: siwe.address,
                  }
              }
              return null
          } catch (e) {
              return null
          }
      },
  }),


  

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
