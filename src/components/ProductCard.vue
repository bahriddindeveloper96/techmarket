<!-- ProductCard.vue -->
<template>
  <div class="group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
    <!-- Discount Badge -->
    <div v-if="product.oldPrice" class="absolute top-3 left-3 z-10">
      <span class="bg-red-100 text-red-600 text-xs font-medium px-2.5 py-1 rounded-full">
        -{{ calculateDiscount(product.price, product.oldPrice) }}%
      </span>
    </div>

    <!-- Favorite Button -->
    <button 
      @click.stop="toggleFavorite"
      class="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full 
             shadow-sm hover:shadow-md transition-all duration-300"
    >
      <i class="fas fa-heart text-lg" 
         :class="product.isFavorite ? 'text-red-500' : 'text-gray-400 group-hover:text-gray-600'">
      </i>
    </button>

    <!-- Quick View Button -->
    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
      <router-link 
        :to="'/product/' + product.id"
        class="bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full
               shadow-lg hover:shadow-xl transition-all duration-300
               transform translate-y-4 group-hover:translate-y-0"
      >
        <i class="fas fa-eye mr-2"></i>
        Batafsil ko'rish
      </router-link>
    </div>

    <!-- Product Image -->
    <div class="aspect-square overflow-hidden bg-gray-50">
      <router-link :to="'/product/' + product.id">
        <img 
          :src="product.image" 
          :alt="product.name"
          class="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
        />
      </router-link>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <!-- Title -->
      <router-link :to="'/product/' + product.id" class="block group-hover:text-primary-600 transition-colors duration-300">
        <h3 class="font-medium text-gray-900 text-sm sm:text-base line-clamp-2 mb-2">
          {{ product.name }}
        </h3>
      </router-link>

      <!-- Rating -->
      <div class="flex items-center mb-3">
        <div class="flex items-center">
          <i v-for="i in 5" :key="i" 
            :class="[
              'fas fa-star text-xs sm:text-sm',
              i <= product.rating ? 'text-yellow-400' : 'text-gray-300'
            ]"
          ></i>
        </div>
        <span class="text-xs text-gray-500 ml-2">({{ product.reviews }})</span>
      </div>

      <!-- Price -->
      <div class="space-y-1">
        <div v-if="product.oldPrice" class="flex items-center gap-2">
          <span class="text-sm text-gray-500 line-through">
            {{ formatPrice(product.oldPrice) }} so'm
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span class="font-semibold text-gray-900">
            {{ formatPrice(product.price) }} so'm
          </span>
          <button 
            @click.stop="addToCart"
            class="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-full transition-colors duration-300"
          >
            <i class="fas fa-shopping-cart"></i>
          </button>
        </div>
      </div>

      <!-- Installment Badge -->
      <div v-if="product.installment" class="mt-3 flex items-center text-xs text-green-600 bg-green-50 rounded-lg p-2">
        <i class="fas fa-credit-card mr-1"></i>
        <span>{{ formatPrice(calculateMonthlyPayment(product.price)) }} so'm x 12 oy</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

// Methods
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

const calculateDiscount = (price, oldPrice) => {
  return Math.round(((oldPrice - price) / oldPrice) * 100)
}

const calculateMonthlyPayment = (price) => {
  return Math.round(price / 12)
}

const toggleFavorite = (event) => {
  event.preventDefault()
  props.product.isFavorite = !props.product.isFavorite
}

const addToCart = (event) => {
  event.preventDefault()
  // Add to cart logic here
  console.log('Adding to cart:', props.product)
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
