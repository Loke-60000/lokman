import { createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  // Add sub-routers here as needed
});

export const createCaller = appRouter.createCaller;
