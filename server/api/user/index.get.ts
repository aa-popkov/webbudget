import { getDatabase } from "~~/database/drizzle"
import { usersTable } from "~~/database/schema"

export default defineEventHandler(async (_) => {
  const db = getDatabase()
  const users = await db.select().from(usersTable)

  return users
})
