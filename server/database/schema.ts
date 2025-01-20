import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
})

export const cabins = sqliteTable('cabins', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
  isBooked: integer('is_booked', { mode: 'boolean' }).default(false),
  bookingEmail: text('booking_email'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
})
