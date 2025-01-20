<script setup lang="ts">
const { notification } = useNotification()
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform -translate-y-2 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform -translate-y-2 opacity-0"
  >
    <UAlert
      v-if="notification"
      :title="notification.title"
      :description="notification.description"
      :variant="notification.variant"
      class="fixed top-4 right-4 z-50 max-w-md shadow-lg"
    />
  </Transition>
</template>
