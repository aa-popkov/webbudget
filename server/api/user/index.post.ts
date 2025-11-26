import { getDatabase } from "~~/database/drizzle"
import { usersTable } from "~~/database/schema"

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string }>(event)
  const db = getDatabase()

  await db
    .insert(usersTable)
    .values({
      email: body.email,
    })
    .execute()

  return "Hello Nitro"
})
