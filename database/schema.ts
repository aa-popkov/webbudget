import {
  pgTable,
  uuid,
  text,
  unique,
  numeric,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const usersTable = pgTable("user", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`)
    .notNull(),
  email: text().unique().notNull(),
  lastAuth: timestamp(),
})

export const categoryTable = pgTable(
  "category",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`)
      .notNull(),
    userId: uuid()
      .references(() => usersTable.id, { onDelete: "cascade" })
      .notNull(),
    name: text().notNull(),
  },
  (t) => [unique().on(t.userId, t.name)]
)

export const budgetTable = pgTable("budget", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`)
    .notNull(),
  userId: uuid()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  amount: numeric({ mode: "number" }).notNull(),
  categoryId: uuid()
    .references(() => categoryTable.id, { onDelete: "cascade" })
    .notNull(),
  date: timestamp({ mode: "date", withTimezone: true }).notNull(),
  type: boolean().notNull(),
})
