import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    
  } from "~/server/api/trpc";
  
  export const workRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
      return ctx.prisma.token.findMany();
    })
  });
  


