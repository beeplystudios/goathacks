import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter, createTRPCContext } from "@goathacks/trpc"
import { config } from 'dotenv';

config()

const app = new Hono()

app.get('/', (c) => c.text('Hono!'))

app.use("/trpc/*", (ctx) =>
  fetchRequestHandler({
    endpoint: "/trpc",
    router: appRouter,
    createContext: () => createTRPCContext(ctx),
    req: ctx.req.raw,
  })
);
 
serve(app)