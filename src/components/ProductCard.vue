<!-- ProductCard.vue -->
<template>
  <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
    <!-- Product Image -->
    <div class="relative aspect-[3/4] overflow-hidden">
      <img 
        :src="product.image" 
        :alt="product.name"
        class="w-full h-full object-cover"
      />
      <!-- Favorite Button -->
      <button 
        @click.stop="toggleFavorite"
        class="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-all duration-300 group/fav"
      >
        <i 
          class="fas fa-heart transition-all duration-300"
          :class="[
            isFavorite 
              ? 'text-red-500 scale-110' 
              : 'text-gray-400 group-hover/fav:text-red-500 group-hover/fav:scale-110'
          ]"
        ></i>
      </button>
    </div>

    <!-- Product Info -->
    <div class="p-3 space-y-2">
      <!-- Title -->
      <h3 class="font-medium text-gray-800 line-clamp-2 h-12">
        {{ product.name }}
      </h3>

      <!-- Price -->
      <div class="space-y-1">
        <p class="text-sm text-gray-500">
          <span class="line-through">{{ formatPrice(product.oldPrice) }}</span>
          <span v-if="product.oldPrice" class="ml-2 text-xs px-1.5 py-0.5 bg-red-100 text-red-600 rounded">
            -{{ calculateDiscount(product.price, product.oldPrice) }}%
          </span>
        </p>
        <p class="text-lg font-semibold text-gray-900">
          {{ formatPrice(product.price) }}
        </p>
      </div>

      <!-- Monthly Payment -->
      <div class="bg-gray-50 -mx-3 px-3 py-2">
        <p class="text-sm text-gray-600">
          <span class="font-medium text-gray-900">{{ formatPrice(calculateMonthlyPayment(product.price)) }}</span>
          x 12 oy
        </p>
      </div>

      <!-- Cart Button -->
      <button class="w-full py-2 bg-black hover:bg-gray-900 text-white rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2" @click.stop="addToCart">
        <i class="fas fa-shopping-cart"></i>
        <span>Savatga</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  product: {
    type: Object,
    required: true
  }
})

const isFavorite = ref(false)

// Format price with spaces and currency
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " so'm"
}

// Calculate discount percentage
const calculateDiscount = (currentPrice, oldPrice) => {
  return Math.round(((oldPrice - currentPrice) / oldPrice) * 100)
}

// Calculate monthly payment
const calculateMonthlyPayment = (price) => {
  return Math.round(price / 12)
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

const addToCart = () => {
  // TODO: Implement cart functionality
  console.log('Adding to cart:', product.id)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
