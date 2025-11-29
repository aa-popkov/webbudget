import { eq } from "drizzle-orm"
import { getDatabase } from "~~/database/drizzle"
import { categoryTable } from "~~/database/schema"

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const db = getDatabase()
  const categories = await db
    .select()
    .from(categoryTable)
    .where(eq(categoryTable.userId, user.id))

  return categories
})
