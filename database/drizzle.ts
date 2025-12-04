import "dotenv/config"
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from "./schema"
import { eq } from "drizzle-orm"

export const getDatabase = () => drizzle(process.env.DATABASE_URL!)

// TODO: Move this to a auth route
const initAdminEmail = async () => {
  const db = getDatabase()
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    console.error("ADMIN_EMAIL is not set!")
    return
  }
  const adminUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, adminEmail))
    .limit(1)
    .execute()
  if (adminUser.length) {
    console.log("ADMIN_EMAIL is already set")
    return
  }
  await db.insert(usersTable).values({ email: adminEmail }).execute()
  console.log("ADMIN_EMAIL is inserted")
}

initAdminEmail()