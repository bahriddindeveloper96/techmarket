import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([])
  const showNotification = ref(false)
  
  function addToCart(item) {
    // Add item and show notification immediately
    cartItems.value.push(item)
    showNotification.value = true
    
    // Reset notification after animation
    setTimeout(() => {
      showNotification.value = false
    }, 800)
  }

  return {
    cartItems,
    showNotification,
    addToCart
  }
})
