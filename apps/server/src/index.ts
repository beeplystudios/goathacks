import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter, createTRPCContext } from "@goathacks/trpc"

const app = new Hono()

app.get('/', (c) => c.text('Hono!'))

app.use("/trpc/*", (ctx) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    router: appRouter,
    createContext: () => createTRPCContext(ctx),
    req: ctx.req.raw,
  })
);

serve(app)