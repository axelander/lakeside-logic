import { tables } from '~/server/utils/drizzle'

export type User = typeof tables.users.$inferSelect
export type Cabin = typeof tables.cabins.$inferSelect
