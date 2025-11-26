import "dotenv/config"
import { drizzle } from "drizzle-orm/libsql"

export const getDatabase = () => drizzle(process.env.DATABASE_URL!)
