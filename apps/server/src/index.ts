import { Hono } from "hono";
import { cors } from "hono/cors";
import { serve } from "@hono/node-server";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter, createTRPCContext } from "@goathacks/trpc";
import { config } from "dotenv";
import { db } from "@goathacks/db";
import { qrKeys, route, stop } from "@goathacks/db/schema";
import { randomBytes } from "crypto";

interface Location {
  lat: number;
  lng: number;
}

interface Stop {
  loc: Location;
  name: string;
}

config();

const app = new Hono();

app.use(cors({ origin: "*" }));

app.get("/", (c) => c.text("Hono!"));

app.get("/create-key/:type", async (c) => {
  const type = c.req.param("type");
  const key = randomBytes(6).toString("hex");

  const result = await db
    .insert(qrKeys)
    .values({
      type: parseInt(type),
      key: key,
    })
    .returning();

  return c.json({ key });
});

app.get("/routes", async (c) => {
  const data = await db.query.route.findMany({
    with: {
      stops: true,
    },
  });

  return c.json(
    data.map((route) => ({
      name: route.name,
      id: route.id,
      stops: route.stops.map((stop) => ({ lat: stop.lat, lng: stop.lon }))
    }))
  );
});

app.post("/routes", async (c) => {
  const args = (await c.req.json()) as Stop[][];
  await db.delete(route);
  // await db.delete(stop);
  const routes = await db
    .insert(route)
    .values(args.map((_, i) => ({ name: `Route ${i + 1}`})))
    .returning();
  await db.insert(stop).values(
    routes.flatMap((route, i) =>
      args[i].map((stop, j) => ({
        routeId: route.id,
        lat: stop.loc.lat,
        lon: stop.loc.lng,
        name: stop.name,
        index: j,
      }))
    )
  );
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

serve(app);
