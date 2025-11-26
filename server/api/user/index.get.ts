import { getDatabase } from "~~/database/drizzle"
import { usersTable } from "~~/database/schema"

export default defineEventHandler(async (event) => {
  const { user: _ } = await requireUserSession(event)
  const db = getDatabase()
  const users = await db.select().from(usersTable)

  return users
})
