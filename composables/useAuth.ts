import type { User } from '~/types/db'

interface LoginResponse {
  user: User
}

export const useAuth = () => {
  const sessionCookie = useCookie<User | null>('session_user', {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/'
  })

  const user = useState<User | null>('user')
  const isLoading = ref(false)
  const error = ref('')

  const isAuthenticated = computed(() => !!user.value)

  const login = async (email: string, password: string) => {
    isLoading.value = true
    error.value = ''

    try {
      const response = await $fetch<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })

      user.value = response.user
      sessionCookie.value = response.user
      return { success: true }
    } catch (err: any) {
      error.value = err.message || 'Failed to login'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    sessionCookie.value = null
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout
  }
}
