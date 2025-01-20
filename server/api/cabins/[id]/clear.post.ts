import { eq } from 'drizzle-orm'
import { useDrizzle } from '~/server/utils/drizzle'
import { cabins } from '~/server/database/schema'

export default defineEventHandler(async (event) => {
  // Check if user is authenticated via session cookie
  const sessionCookie = getCookie(event, 'session_user')
  if (!sessionCookie) {
    throw createError({
      statusCode: 401,
      message: 'You must be logged in to clear reservations'
    })
  }

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      message: 'Cabin ID is required'
    })
  }

  const db = useDrizzle()
  await db
    .update(cabins)
    .set({
      isBooked: false,
      bookingEmail: null
    })
    .where(eq(cabins.id, parseInt(id)))

  return { success: true }
})
