import { eq } from "drizzle-orm"
import { getDatabase } from "~~/database/drizzle"
import { usersTable } from "~~/database/schema"

export default defineEventHandler(async (event) => {
  const { user: _ } = await requireUserSession(event)
  const userId = getRouterParam(event, "id")
  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "User ID is required",
    })
  }
  const db = getDatabase()
  const users = await db.delete(usersTable).where(eq(usersTable.id, userId)).returning()

  return users
})
