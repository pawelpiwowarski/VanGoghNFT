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

    claim: publicProcedure.input(z.object({ address: z.string(), id: z.string(), contract_address: z.string()})).mutation(({ctx, input }) => {

   // check the transaction hash

 
      



    return ctx.prisma.token.update({
        where: {
        id: input.id,
        },
        data: {
        claimedBy: input.address,
        claimedAt: new Date()        ,
        claimed: true,
        OpenSeaLink: `https://opensea.io/assets/matic/${input.contract_address}/${input.id}`,
        },
    });
    }),
    hasAddressClaimed: publicProcedure.input(z.object({ address: z.string() })).query(({ctx, input }) => {

      return ctx.prisma.token.findFirst({

          where: {
          claimedBy: input.address,
          },
          

      });
  }),



    
  

  })
