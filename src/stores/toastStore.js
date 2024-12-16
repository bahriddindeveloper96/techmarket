import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const show = ref(false)
  const type = ref('success')
  const title = ref('')
  const message = ref('')
  let timeout = null

  function showToast({ type: toastType = 'success', title: toastTitle, message: toastMessage, duration = 3000 }) {
    // Clear any existing timeout
    if (timeout) {
      clearTimeout(timeout)
    }

    // Set toast data
    type.value = toastType
    title.value = toastTitle
    message.value = toastMessage
    show.value = true

    // Auto hide after duration
    timeout = setTimeout(() => {
      hideToast()
    }, duration)
  }

  function hideToast() {
    show.value = false
  }

  return {
    show,
    type,
    title,
    message,
    showToast,
    hideToast
  }
})
