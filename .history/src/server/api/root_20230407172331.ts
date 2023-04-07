import { createTRPCRouter } from "~/server/api/trpc";

import {workRouter} from "~/server/api/routers/work";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({

  work: workRouter

});

// export type definition of API
export type AppRouter = typeof appRouter;
