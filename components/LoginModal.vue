<script setup lang="ts">
const isOpen = defineModel<boolean>('modelValue')
const emit = defineEmits<{
  (e: 'success'): void
}>()

const { login, isLoading, error } = useAuth()
const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  const { success } = await login(email.value, password.value)
  if (success) {
    email.value = ''
    password.value = ''
    isOpen.value = false
    emit('success')
  }
}
</script>

<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        <h3 class="text-xl font-semibold">Login</h3>
      </template>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <UFormGroup label="Email" name="email">
          <UInput
            v-model="email"
            type="email"
            placeholder="Enter your email"
            required
            :disabled="isLoading"
          />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput
            v-model="password"
            type="password"
            placeholder="Enter your password"
            required
            :disabled="isLoading"
          />
        </UFormGroup>

        <UAlert
          v-if="error"
          title="Error"
          :description="error"
          color="red"
          variant="soft"
          class="mb-4"
        />

        <div class="flex justify-end gap-2">
          <UButton
            color="gray"
            variant="soft"
            @click="isOpen = false"
            :disabled="isLoading"
          >
            Cancel
          </UButton>
          <UButton
            type="submit"
            :loading="isLoading"
            :disabled="isLoading"
          >
            Login
          </UButton>
        </div>
      </form>
    </UCard>
  </UModal>
</template>
