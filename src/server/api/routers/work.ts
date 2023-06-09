/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";
import { siweServer } from "~/utils/siweServer";


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

    getAll: publicProcedure.query(({ctx}) => {

        return ctx.prisma.token.findMany();
    }),
    

    claim: publicProcedure.input(z.object({ address: z.string(), id: z.string(), contract_address: z.string()})).mutation(({ctx, input }) => {
    



    
    if (!ctx.siweSession) {
        throw new Error("You are not logged in")
    }


    if (ctx.siweSession.address !== input.address) {
        throw new Error("You are not logged in with the correct address")
    }

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

      // check the host address

      
      
      return ctx.prisma.token.findFirst({

          where: {
          claimedBy: input.address,
          },
          

      });
  }),



    
  

  })
