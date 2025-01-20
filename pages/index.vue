<script setup lang="ts">
useHead({
  title: 'Our Cabins | Wilderness Retreats',
})

const { cabins: data, isSubmitting, book, clearReservation } = useBooking()
const { isAuthenticated, user, logout } = useAuth()
const { show: showNotification } = useNotification()
const isLoginModalOpen = ref(false)

const {
  isOpen: isBookingModalOpen,
  selectedCabin,
  email: bookingEmail,
  error: bookingError,
  open: openBookingModal,
  close: closeBookingModal
} = useBookingModal()

const handleSubmit = async () => {
  if (!selectedCabin.value?.id) return

  const { success, error } = await book(selectedCabin.value.id, bookingEmail.value)
  if (success) {
    closeBookingModal()
    showNotification({
      title: 'Booking Confirmed!',
      description: 'Your cabin has been successfully booked. Check your email for details.',
      variant: 'solid'
    })
  }
}

const handleClearReservation = async (cabin: any) => {
  const { success, error } = await clearReservation(cabin.id)
  if (success) {
    showNotification({
      title: 'Reservation Cleared',
      description: `The reservation for ${cabin.name} has been cleared.`,
      variant: 'solid'
    })
  } else {
    showNotification({
      title: 'Error',
      description: error || 'Failed to clear reservation',
      variant: 'solid'
    })
  }
}
</script>

<template>
  <main class="container mx-auto px-4 py-8">
    <!-- Header with auth -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold">Our Cabins</h1>
      <div v-if="isAuthenticated" class="flex items-center gap-4">
        <span class="text-gray-600">Welcome, {{ user?.name }}</span>
        <UButton color="gray" variant="soft" @click="logout">
          Logout
        </UButton>
      </div>
      <UButton v-else @click="isLoginModalOpen = true">
        Login
      </UButton>
    </div>

    <!-- Loading state -->
    <div v-if="!data" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard v-for="i in 6" :key="i">
        <template #header>
          <div class="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-t-lg" />
        </template>
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </UCard>
    </div>

    <!-- Error state -->
    <UAlert
      v-else-if="bookingError"
      title="Error"
      :description="bookingError"
      color="red"
      variant="soft"
      class="mb-4"
    />

    <!-- Cabins list -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <UCard
        v-for="cabin in data.cabins"
        :key="cabin.id"
        class="hover:shadow-lg transition-shadow"
      >
        <template #header>
          <NuxtImg
            :src="cabin.imageUrl || 'https://images.unsplash.com/photo-1572455825634-2c63e14ecae1?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'"
            :alt="cabin.name"
            class="w-full h-48 object-cover rounded-t-lg"
            loading="lazy"
            placeholder
          />
        </template>

        <h2 class="text-xl font-semibold mb-2">{{ cabin.name }}</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {{ cabin.description }}
        </p>
        <template v-if="cabin.isBooked">
          <p class="text-red-500 dark:text-red-400 mb-2">
            This cabin is currently unavailable
          </p>
          <div v-if="isAuthenticated" class="space-y-2">
            <p class="text-sm text-gray-500">
              Booked by: {{ cabin.bookingEmail }}
            </p>
            <UButton
              color="red"
              variant="soft"
              :loading="isSubmitting"
              :disabled="isSubmitting"
              @click="handleClearReservation(cabin)"
            >
              Clear Reservation
            </UButton>
          </div>
        </template>
        <UButton
          v-else
          :disabled="isAuthenticated"
          @click="!isAuthenticated ? openBookingModal(cabin) : null"
        >
          {{ isAuthenticated ? 'Login to Book' : 'Book Now' }}
        </UButton>
      </UCard>
    </div>

    <!-- Booking Modal -->
    <UModal v-model="isBookingModalOpen" @close="closeBookingModal">
      <UCard>
        <template #header>
          <h3 class="text-xl font-semibold">Book {{ selectedCabin?.name }}</h3>
        </template>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <UFormGroup label="Email" name="email">
            <UInput
              v-model="bookingEmail"
              type="email"
              placeholder="Enter your email"
              required
              :disabled="isSubmitting"
            />
          </UFormGroup>

          <UAlert
            v-if="bookingError"
            title="Error"
            :description="bookingError"
            color="red"
            variant="soft"
            class="mb-4"
          />

          <div class="flex justify-end gap-2">
            <UButton
              color="gray"
              variant="soft"
              @click="closeBookingModal"
              :disabled="isSubmitting"
            >
              Cancel
            </UButton>
            <UButton
              type="submit"
              :loading="isSubmitting"
              :disabled="isSubmitting"
            >
              Confirm Booking
            </UButton>
          </div>
        </form>
      </UCard>
    </UModal>

    <LoginModal v-model="isLoginModalOpen" />
  </main>
</template>
