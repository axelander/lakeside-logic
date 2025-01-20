import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
export { sql, eq, and, or } from 'drizzle-orm'

import * as schema from '../database/schema'

const db = new Database('./server/database/db.sqlite')

export const tables = schema

export function useDrizzle() {
  return drizzle(db, { schema })
}
