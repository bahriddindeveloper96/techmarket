<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="container mx-auto px-4 py-4">
        <h1 class="text-xl font-semibold text-gray-900">{{ $t('nav.favorites') }}</h1>
      </div>
    </div>

    <!-- Content -->
    <div class="container mx-auto px-4 py-6">
      <!-- Empty State -->
      <div v-if="favorites.length === 0" class="flex flex-col items-center justify-center py-12">
        <div class="w-24 h-24 rounded-full bg-primary-50 flex items-center justify-center mb-4">
          <i class="ri-heart-3-line text-4xl text-primary-500"></i>
        </div>
        <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ $t('favorites.empty_title') }}</h2>
        <p class="text-gray-600 text-center mb-6">{{ $t('favorites.empty_description') }}</p>
        <router-link to="/" class="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors duration-300">
          <i class="ri-store-2-line mr-2"></i>
          {{ $t('favorites.browse_products') }}
        </router-link>
      </div>

      <!-- Favorites Grid -->
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="product in favorites" :key="product.id" class="bg-white rounded-2xl shadow-sm overflow-hidden group">
          <!-- Product Image -->
          <div class="relative aspect-square overflow-hidden bg-gray-100">
            <img 
              :src="product.image" 
              :alt="product.name" 
              class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              @error="handleImageError"
            >
            <button @click.prevent="removeFromFavorites(product.id)" class="absolute top-3 right-3 w-8 h-8 rounded-xl bg-white shadow-md flex items-center justify-center text-primary-600 hover:bg-primary-50 transition-colors duration-300">
              <i class="ri-heart-fill"></i>
            </button>
          </div>

          <!-- Product Info -->
          <div class="p-4">
            <h3 class="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{{ product.name }}</h3>
            <div class="flex items-center justify-between">
              <div class="text-primary-600 font-semibold">${{ product.price }}</div>
              <button @click="addToCart(product)" class="w-8 h-8 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 hover:bg-primary-100 transition-colors duration-300">
                <i class="ri-shopping-cart-2-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Sample data
const favorites = ref([
  {
    id: 1,
    name: 'Apple iPhone 13 Pro Max',
    price: 1099,
    image: '/images/products/placeholder.svg'
  },
  {
    id: 2,
    name: 'Samsung Galaxy S22 Ultra',
    price: 999,
    image: '/images/products/placeholder.svg'
  },
  {
    id: 3,
    name: 'MacBook Pro 14"',
    price: 1999,
    image: '/images/products/placeholder.svg'
  },
  {
    id: 4,
    name: 'iPad Pro 12.9"',
    price: 1099,
    image: '/images/products/placeholder.svg'
  }
])

const handleImageError = (e) => {
  e.target.src = '/images/products/placeholder.svg'
}

const removeFromFavorites = (productId) => {
  favorites.value = favorites.value.filter(product => product.id !== productId)
}

const addToCart = (product) => {
  // Implement add to cart functionality
  console.log('Added to cart:', product)
}
</script>
