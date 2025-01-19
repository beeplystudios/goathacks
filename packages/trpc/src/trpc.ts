import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import { type Context as HonoContext } from "hono";
import { db } from "@goathacks/db";
import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});

export const createTRPCContext = (ctx: HonoContext) => {
  return {
    honoCtx: ctx,
    db: db,
    clerk: clerkClient,
  };
};

const t = initTRPC
  .context<ReturnType<typeof createTRPCContext>>()
  .create({ transformer: SuperJSON });

export const publicProcedure = t.procedure;

export const router = t.router;

export const middleware = t.middleware;
