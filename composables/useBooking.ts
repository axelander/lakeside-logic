import type { Cabin } from '~/types/db'
import type { BookCabinResponse, GetCabinsResponse } from '~/types/api'

export const useBookingModal = () => {
  const isOpen = ref(false)
  const selectedCabin = ref<Cabin | null>(null)
  const email = ref('')
  const error = ref('')

  const open = (cabin: Cabin) => {
    selectedCabin.value = cabin
    isOpen.value = true
    error.value = ''
    email.value = ''
  }

  const close = () => {
    isOpen.value = false
    selectedCabin.value = null
    email.value = ''
    error.value = ''
  }

  return {
    isOpen,
    selectedCabin,
    email,
    error,
    open,
    close
  }
}
  
export const useBooking = () => {
  const cabins = useState<GetCabinsResponse | null>('cabins', () => null)
  const isSubmitting = ref(false)
  const error = ref('')

  const fetchCabins = async () => {
    try {
      const response = await $fetch<GetCabinsResponse>('/api/cabins')
      cabins.value = response
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch cabins'
    }
  }

  const book = async (cabinId: number, email: string) => {
    isSubmitting.value = true
    error.value = ''

    try {
      await $fetch<BookCabinResponse>(`/api/cabins/${cabinId}/book`, {
        method: 'POST',
        body: { email }
      })
      await fetchCabins()
      return { success: true }
    } catch (err: any) {
      error.value = err.message || 'Failed to book cabin'
      return { success: false, error: error.value }
    } finally {
      isSubmitting.value = false
    }
  }

  const clearReservation = async (cabinId: number) => {
    isSubmitting.value = true
    error.value = ''

    try {
      await $fetch(`/api/cabins/${cabinId}/clear`, {
        method: 'POST'
      })
      await fetchCabins()
      return { success: true }
    } catch (err: any) {
      error.value = err.message || 'Failed to clear reservation'
      return { success: false, error: error.value }
    } finally {
      isSubmitting.value = false
    }
  }

  // Fetch cabins on composable creation
  if (import.meta.client) {
    fetchCabins()
  }

  return {
    cabins,
    isSubmitting,
    error,
    book,
    clearReservation
  }
}
