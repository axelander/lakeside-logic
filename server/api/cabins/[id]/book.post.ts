import { useDrizzle } from '~/server/utils/drizzle'
import { cabins } from '~/server/database/schema'
import { eq } from 'drizzle-orm'
import type { BookCabinResponse } from '~/types/api'

export default defineEventHandler(async (event): Promise<BookCabinResponse> => {
  const id = getRouterParam(event, 'id')
  const { email } = await readBody(event)

  if (!id || !email) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields'
    })
  }

  try {
    const existingCabin = await useDrizzle().select()
      .from(cabins)
      .where(eq(cabins.id, parseInt(id)))
      .get()

    if (!existingCabin) {
      throw createError({
        statusCode: 404,
        message: 'Cabin not found'
      })
    }

    if (existingCabin.isBooked) {
      throw createError({
        statusCode: 400,
        message: 'Cabin is already booked'
      })
    }

    // Update the cabin
    await useDrizzle().update(cabins)
      .set({
        isBooked: true,
        bookingEmail: email
      })
      .where(eq(cabins.id, parseInt(id)))

    // Fetch and return the updated cabin
    const updatedCabin = await useDrizzle().select()
      .from(cabins)
      .where(eq(cabins.id, parseInt(id)))
      .get()

    if (!updatedCabin) {
      throw createError({
        statusCode: 500,
        message: 'Failed to fetch updated cabin'
      })
    }

    return {
      success: true,
      cabin: updatedCabin
    }
  } catch (error) {
    console.error('Error booking cabin:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to book cabin'
    })
  }
})
