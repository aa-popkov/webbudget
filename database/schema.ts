import { sqliteTable, text, numeric, unique } from "drizzle-orm/sqlite-core"
import { v4 as uuidv4 } from "uuid"

export const usersTable = sqliteTable("users_table", {
  id: text().primaryKey().$defaultFn(uuidv4).notNull(),
  email: text().unique().notNull(),
  lastAuth: text(),
})

export const categoryTable = sqliteTable(
  "category_table",
  {
    id: text().primaryKey().$defaultFn(uuidv4).notNull(),
    userId: text()
      .references(() => usersTable.id)
      .notNull(),
    name: text().notNull(),
  },
  (t) => [unique().on(t.userId, t.name)]
)

export const budgetTable = sqliteTable("budget_table", {
  id: text().primaryKey().$defaultFn(uuidv4).notNull(),
  userId: text()
    .references(() => usersTable.id)
    .notNull(),
  amount: numeric().notNull(),
  category: text()
    .references(() => categoryTable.id)
    .notNull(),
  date: text(),
  type: text(),
})
