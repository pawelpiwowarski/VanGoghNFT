/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    
  } from "~/server/api/trpc";
  
  export const workRouter = createTRPCRouter({
    getByID: publicProcedure.input(z.object({ id: z.string() })).query(({ctx, input }) => {

        return ctx.prisma.token.findUnique({
            where: {
            id: input.id,
            },
        });
    }),

    claim: publicProcedure.input(z.object({ address: z.string(), id: z.string() })).mutation(({ctx, input }) => {


    const time = new Date()

    return ctx.prisma.token.update({
        where: {
        id: input.id,
        },
        data: {
        claimedBy: input.address,
        claimedAt: time,
        claimed: true,
        },
    });
    }),


    
  

  })
