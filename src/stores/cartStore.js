import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const showNotification = ref(false)
  
  // Cart total
  const total = computed(() => {
    return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  })

  // Cart items count
  const itemsCount = computed(() => {
    return items.value.reduce((count, item) => count + item.quantity, 0)
  })
  
  function addToCart(item) {
    const existingItem = items.value.find(i => 
      i.product_variant_id === item.product_variant_id && 
      i.product_id === item.product_id
    )
    
    if (existingItem) {
      existingItem.quantity += item.quantity
    } else {
      items.value.push(item)
    }
    
    showNotification.value = true
    setTimeout(() => {
      showNotification.value = false
    }, 800)
  }

  function removeFromCart(itemId) {
    const index = items.value.findIndex(item => item.id === itemId)
    if (index > -1) {
      items.value.splice(index, 1)
    }
  }

  function updateQuantity(itemId, quantity) {
    const item = items.value.find(item => item.id === itemId)
    if (item) {
      item.quantity = quantity
    }
  }

  function clearCart() {
    items.value = []
  }

  return { 
    items, 
    total, 
    itemsCount, 
    showNotification,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
})
