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
  index: integer("index").notNull(),
  lat: real("lat"),
  lon: real("lon"),
  routeId: text("routeId")
    .notNull()
    .references(() => route.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const stopRelations = relations(stop, ({ one }) => ({
  route: one(route, {
    fields: [stop.routeId],
    references: [route.id],
  }),
}));

export const busSession = sqliteTable("busSession", {
  id: text("id")
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  driverId: text("driverId").unique(),
  routeId: text("routeId").references(() => route.id, { onDelete: "cascade", onUpdate: "cascade" }),
  lat: real("lat"),
  lon: real("lon"),
});

export const busSessionRelations = relations(busSession, ({ one }) => ({
  route: one(route, {
    fields: [busSession.routeId],
    references: [route.id],
  }),
}));

export const registeredDrivers = sqliteTable("registeredDrivers", {
  id: text("id")
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  driverId: text("driverId").unique(),
});

export const qrKeys = sqliteTable("qrKeys", {
  id: text("id")
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  // 0 -> Bus, 1 -> Driver
  type: integer("type"),
  key: text("key").notNull(),
});
