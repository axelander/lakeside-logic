interface Notification {
  title: string
  description: string
  variant?: 'solid' | 'soft' | 'outline'
  timeout?: number
}

export const useNotification = () => {
  const notification = useState<Notification | null>('notification', () => null)
  let timeoutId: NodeJS.Timeout | null = null

  const show = (params: Notification) => {
    // Clear any existing timeout
    if (timeoutId) clearTimeout(timeoutId)

    // Set the notification
    notification.value = {
      variant: 'soft',
      timeout: 5000,
      ...params
    }

    // Auto-hide after timeout
    if (params.timeout !== 0) {
      timeoutId = setTimeout(() => {
        notification.value = null
      }, params.timeout || 5000)
    }
  }

  const clear = () => {
    if (timeoutId) clearTimeout(timeoutId)
    notification.value = null
  }

  return {
    notification,
    show,
    clear
  }
}
