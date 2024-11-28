<!-- ProductCard.vue -->
<template>
  <div class="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
    <!-- Badges -->
    <div class="absolute top-3 left-3 z-10 flex flex-col gap-2">
      <span v-if="product.isNew" class="px-3 py-1 bg-accent-500 text-white text-xs font-medium rounded-full">
        Yangi
      </span>
      <span v-if="product.discount" class="px-3 py-1 bg-red-500 text-white text-xs font-medium rounded-full">
        -{{ product.discount }}%
      </span>
    </div>

    <!-- Quick Actions -->
    <div class="absolute top-3 right-3 z-10 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
      <button class="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 shadow-lg hover:shadow-xl transition-all">
        <i class="fas fa-heart"></i>
      </button>
      <button class="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 shadow-lg hover:shadow-xl transition-all">
        <i class="fas fa-exchange-alt"></i>
      </button>
    </div>

    <!-- Image -->
    <div class="aspect-square overflow-hidden bg-gray-50">
      <img 
        :src="product.image" 
        :alt="product.name"
        class="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    <!-- Content -->
    <div class="p-4">
      <!-- Category -->
      <div class="text-xs text-gray-500 mb-1">{{ product.category }}</div>

      <!-- Title -->
      <h3 class="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
        {{ product.name }}
      </h3>

      <!-- Rating -->
      <div class="flex items-center mb-2">
        <div class="flex items-center">
          <i v-for="i in 5" :key="i" 
            :class="[
              'fas fa-star text-xs',
              i <= product.rating ? 'text-yellow-400' : 'text-gray-300'
            ]"
          ></i>
        </div>
        <span class="text-xs text-gray-500 ml-2">({{ product.reviews }} sharh)</span>
      </div>

      <!-- Price -->
      <div class="flex items-center justify-between">
        <div>
          <span v-if="product.oldPrice" class="text-sm text-gray-500 line-through mr-2">
            {{ formatPrice(product.oldPrice) }}
          </span>
          <span class="text-lg font-semibold text-gray-900">
            {{ formatPrice(product.price) }}
          </span>
        </div>

        <!-- Add to Cart Button -->
        <button 
          class="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 transition-colors"
          @click="addToCart"
        >
          <i class="fas fa-shopping-cart"></i>
        </button>
      </div>

      <!-- Stock Status -->
      <div class="mt-2">
        <div v-if="product.stock > 0" class="flex items-center text-green-600 text-sm">
          <i class="fas fa-check-circle mr-1"></i>
          Sotuvda bor
        </div>
        <div v-else class="flex items-center text-red-600 text-sm">
          <i class="fas fa-times-circle mr-1"></i>
          Sotuvda yo'q
        </div>
      </div>
    </div>

    <!-- Quick View Overlay -->
    <div class="absolute inset-0 bg-black/50 backdrop-blur-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex items-center justify-center">
      <button class="px-6 py-2 bg-white text-primary-600 rounded-full font-medium hover:bg-primary-50 transition-colors">
        Tezkor ko'rish
      </button>
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

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const addToCart = () => {
  // Add to cart logic
}
</script>
