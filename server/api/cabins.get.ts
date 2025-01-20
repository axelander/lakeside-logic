import { useDrizzle } from '../utils/drizzle'
import { cabins } from '../database/schema'
import { GetCabinsResponse } from '~/types/api'
import { Cabin } from '~/types/db'



export default defineEventHandler(async (event): Promise<GetCabinsResponse> => {
  try {
    const allCabins = await useDrizzle().select().from(cabins) as Cabin[]
    return {
      cabins: allCabins.map(cabin => ({
        ...cabin,
        createdAt: cabin.createdAt,
      }))
    }
  } catch (error) {
    console.error('Error fetching cabins:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch cabins',
      data: process.dev ? error : undefined
    })
  }
})
