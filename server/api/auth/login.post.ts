import { useDrizzle } from '~/server/utils/drizzle'
import { users } from '~/server/database/schema'
import { eq } from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: 'Email and password are required'
    })
  }

  try {
    const user = await useDrizzle().select()
      .from(users)
      .where(eq(users.email, email))
      .get()

    if (!user || user.password !== password) { // Dead simple password check, not for production use
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    }

    // Don't send the password back
    const { password: _, ...userWithoutPassword } = user

    return {
      user: userWithoutPassword
    }
  } catch (error) {
    console.error('Login error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to login'
    })
  }
})
