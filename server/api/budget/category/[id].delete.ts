import { eq } from "drizzle-orm"
import { getDatabase } from "~~/database/drizzle"
import { categoryTable } from "~~/database/schema"

export default defineEventHandler(async (event) => {
  const { user: _ } = await requireUserSession(event)
  const categoryId = getRouterParam(event, "id")
  if (!categoryId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Category ID is required",
    })
  }
  const db = getDatabase()
  const categories = await db
    .delete(categoryTable)
    .where(eq(categoryTable.id, categoryId))
    .returning()

  return categories
})
