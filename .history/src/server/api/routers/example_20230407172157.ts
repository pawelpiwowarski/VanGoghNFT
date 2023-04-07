import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

// Disable the @typescript-eslint/no-unsafe-member-access and @typescript-eslint/no-unsafe-return rules for this block of code
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    // This code is using ctx.prisma.example.findMany(), which can potentially cause unsafe member access or return an unsafe value.
    // If possible, it's recommended to use a more specific type or interface to describe the shape of the data being returned by findMany().
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
