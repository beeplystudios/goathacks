import { sqliteTable, text, real, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";

export const route = sqliteTable("route", {
  id: text("id")
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  name: text("name"),
});

export const routeRelations = relations(route, ({ many }) => ({
  stops: many(stop),
}));

export const stop = sqliteTable("stop", {
  id: text("id")
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  name: text("name"),
  index: integer("index"),
  lat: real("lat"),
  lon: real("lon"),
  routeId: text("routeId")
    .notNull()
    .references(() => route.id),
});

export const stopRelations = relations(stop, ({ one }) => ({
  route: one(route, {
    fields: [stop.routeId],
    references: [route.id],
  }),
}));

