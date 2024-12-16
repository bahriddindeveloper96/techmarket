import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoriteStore = defineStore('favorite', () => {
  const items = ref([])

  const count = computed(() => items.value.length)

  function addToFavorites(product) {
    if (!items.value.find(item => item.id === product.id)) {
      items.value.push(product)
    }
  }

  function removeFromFavorites(productId) {
    const index = items.value.findIndex(item => item.id === productId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  function isFavorite(productId) {
    return items.value.some(item => item.id === productId)
  }

  function clearFavorites() {
    items.value = []
  }

  return {
    items,
    count,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearFavorites
  }
})
