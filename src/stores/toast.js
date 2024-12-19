import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const isVisible = ref(false)
  const message = ref('')
  const type = ref('success') // success, error, warning, info
  const timeout = ref(null)

  function showToast({ message: msg, type: toastType = 'success', duration = 3000 }) {
    if (timeout.value) clearTimeout(timeout.value)
    
    message.value = msg
    type.value = toastType
    isVisible.value = true

    timeout.value = setTimeout(() => {
      isVisible.value = false
    }, duration)
  }

  function hideToast() {
    isVisible.value = false
    if (timeout.value) {
      clearTimeout(timeout.value)
      timeout.value = null
    }
  }

  return {
    isVisible,
    message,
    type,
    showToast,
    hideToast
  }
})
