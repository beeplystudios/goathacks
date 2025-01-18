import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const test = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .unique()
});
