import type { User } from '~/types/db'

export default defineNuxtPlugin(async () => {
  const sessionCookie = useCookie<User | null>('session_user')
  const user = useState<User | null>('user')

  // Initialize user state from cookie if it exists
  if (sessionCookie.value && !user.value) {
    user.value = sessionCookie.value
  }
})
