<template>
  <main class="py-4">
    
      <!-- Favorites Header -->
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 dark:from-purple-400 dark:to-purple-300 bg-clip-text text-transparent">
          {{ $t('nav.favorites') }}
        </h1>
        <button v-if="favoriteStore.count" @click="clearFavorites" class="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors">
          {{ $t('favorites.clear_all') }}
        </button>
      </div>

      <!-- Empty Favorites -->
      <div v-if="!favoriteStore.count" class="text-center py-8">
        <div class="w-24 h-24 mx-auto mb-6 text-gray-300 dark:text-gray-600">
          <i class="ri-heart-3-line text-6xl"></i>
        </div>
        <p class="text-gray-500 dark:text-gray-400 mb-4">{{ $t('favorites.empty_description') }}</p>
        <router-link to="/" class="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl px-6 py-3 font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-300 hover:shadow-lg hover:shadow-purple-200 dark:hover:shadow-purple-900 active:scale-[0.98]">
          <i class="ri-store-2-line"></i>
          {{ $t('favorites.browse_products') }}
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Favorites Items -->
        <div class="lg:col-span-2 space-y-4">
          <div v-for="item in favoriteStore.items" :key="item.id" class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-4 relative group">
            <div class="flex gap-4">
              <!-- Product Image -->
              <div class="w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-gray-50 dark:from-gray-700 dark:to-gray-800 p-2 flex-shrink-0">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-contain" @error="handleImageError" />
              </div>

              <!-- Product Info -->
              <div class="flex-grow">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 
                      class="font-medium text-gray-900 dark:text-white mb-1 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors"
                      @click="goToProduct(item.id)"
                    >
                      {{ item.name }}
                    </h3>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                      <p>
                        <span class="hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition-colors" @click="goToCategory(item.category)">
                          {{ $t('favorites.category') }}: {{ item.category }}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button @click="removeFromFavorites(item.id)" class="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors" :title="$t('favorites.remove')">
                    <i class="ri-close-line text-xl"></i>
                  </button>
                </div>

                <!-- Price and Add to Cart -->
                <div class="flex justify-between items-center mt-4">
                  <div class="flex items-center gap-2">
                    <span class="font-medium text-purple-600 dark:text-purple-400">${{ item.price }}</span>
                  </div>
                  
                  <button 
                    @click="addToCartAndNavigate(item)"
                    class="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                  >
                    <i class="ri-shopping-cart-2-line"></i>
                    {{ $t('favorites.add_to_cart') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Similar Products -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 sticky top-4">
            <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">{{ $t('favorites.recommended_products') }}</h2>
            
            <div class="space-y-4">
              <div v-for="product in recommendedProducts" :key="product.id" 
                class="flex gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                @click="goToProduct(product.id)"
              >
                <img :src="product.image" :alt="product.name" 
                  class="w-16 h-16 rounded-lg object-cover"
                  @error="handleImageError"
                />
                <div>
                  <h3 class="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">{{ product.name }}</h3>
                  <p class="text-sm text-purple-600 dark:text-purple-400 font-medium">${{ product.price }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useCartStore } from '@/stores/cartStore'

const router = useRouter()
const { t } = useI18n()
const favoriteStore = useFavoriteStore()
const cartStore = useCartStore()

// Debug log to check store items
onMounted(() => {
  console.log('Favorite items:', favoriteStore.items)
})

// Recommended products
const recommendedProducts = ref([
  {
    id: 5,
    name: 'Google Pixel 7 Pro',
    price: 899,
    image: 'https://lh3.googleusercontent.com/Z1YhXoqYFCijH8kQOeB-tPY0SQkCX5bGrFXY-YvYlBxVtAQZE3bsqws-K2Q9nDKlgHsW_EAZfFHJTX0XqGtfdA8QhUg-Ng=w1000',
    category: 'Smartphones'
  },
  {
    id: 6,
    name: 'OnePlus 10 Pro',
    price: 799,
    image: 'https://image01.oneplus.net/ebp/202201/13/1-m00-3c-c3-rb8lb2hgidwabrzdaaitc8yv0_c712_600_600.png',
    category: 'Smartphones'
  },
  {
    id: 7,
    name: 'Sony WH-1000XM4',
    price: 349,
    image: 'https://electronics.sony.com/image/5d02da5df552836db894cad8e0ebb89f?fmt=png-alpha&wid=660&hei=660',
    category: 'Headphones'
  }
])

const handleImageError = (e) => {
  // Fallback image if the main image fails to load
  e.target.src = 'https://via.placeholder.com/400x400?text=Product+Image'
}

const removeFromFavorites = (productId) => {
  favoriteStore.removeFromFavorites(productId)
}

const clearFavorites = () => {
  favoriteStore.clearFavorites()
}

const addToCartAndNavigate = async (product) => {
  try {
    await cartStore.addToCart(product)
    alert(t('favorites.added_to_cart'))
    await router.push('/cart')
  } catch (error) {
    console.error('Error adding to cart:', error)
    alert(t('favorites.error_adding_to_cart'))
  }
}

const goToProduct = (productId) => {
  router.push(`/product/${productId}`)
}

const goToCategory = (category) => {
  router.push(`/category/${category}`)
}
</script>
