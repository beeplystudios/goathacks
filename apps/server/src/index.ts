import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter, createTRPCContext } from "@goathacks/trpc"
import { config } from 'dotenv';
import { db } from '@goathacks/db';
import { route, stop } from '@goathacks/db/schema';

interface Stop {
  lat: number;
  lng: number;
}

config()

const app = new Hono()

app.use(cors({ origin: "*" }))

app.get('/', (c) => c.text('Hono!'))

app.get('/routes', async (c) => {
  const data = await db.query.route.findMany({
    with: {
      stops: true
    }
  });

  return c.json(data.map((route) => route.stops.map((stop) => ({ lat: stop.lat, lng: stop.lon }))))
});

app.post('/routes', async (c) => {
  const args = await c.req.json() as Stop[][];
  await db.delete(route);
  await db.delete(stop);
  const routes = await db.insert(route).values(args.map((_) => ({}))).returning();
  await db.insert(stop).values(routes.flatMap((route, i) => args[i].map((stop, j) => ({ routeId: route.id, lat: stop.lat, lon: stop.lng, index: j }))));
  return c.json({ ok: true });
});

app.use("/trpc/*", (ctx) =>
  fetchRequestHandler({
    endpoint: "/trpc",
    router: appRouter,
    createContext: () => createTRPCContext(ctx),
    req: ctx.req.raw,
  })
);

serve(app)
