import { sqliteTable, text, real } from "drizzle-orm/sqlite-core";
import {createId} from "@paralleldrive/cuid2"

export const route = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  name: text("name"),

});

export const stop = sqliteTable("stop", {
  id: text("id")
    .primaryKey()
    .unique() 
    .$defaultFn(() => createId()),
  name: text(),
  lat: real("lat"),
  lon: real("lon")
})
