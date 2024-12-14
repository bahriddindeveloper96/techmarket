import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([])
  const showNotification = ref(false)
  
  // Cart total
  const total = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  // Cart items count
  const itemsCount = computed(() => {
    return cartItems.value.reduce((count, item) => count + item.quantity, 0)
  })
  
  function addToCart(item) {
    const existingItem = cartItems.value.find(i => i.id === item.id)
    
    if (existingItem) {
      // Agar mahsulot savatchada bo'lsa, sonini yangi qo'shilayotgan miqdorga oshiramiz
      existingItem.quantity += item.quantity
    } else {
      // Agar mahsulot savatchada bo'lmasa, yangi mahsulot qo'shamiz
      cartItems.value.push(item)
    }
    
    showNotification.value = true
    setTimeout(() => {
      showNotification.value = false
    }, 800)
  }

  function removeFromCart(itemId) {
    const index = cartItems.value.findIndex(item => item.id === itemId)
    if (index > -1) {
      cartItems.value.splice(index, 1)
    }
  }

  function updateQuantity(itemId, quantity) {
    const item = cartItems.value.find(item => item.id === itemId)
    if (item) {
      item.quantity = quantity
    }
  }

  function clearCart() {
    cartItems.value = []
  }

  return {
    cartItems,
    showNotification,
    total,
    itemsCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
})
