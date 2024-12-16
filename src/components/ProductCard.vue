<!-- ProductCard.vue -->
<template>
  <div class="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-sm hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700">
    <!-- Discount Badge -->
    <div v-if="product.oldPrice" class="absolute top-3 left-3 z-10">
      <span class="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md">
        -{{ calculateDiscount(product.price, product.oldPrice) }}%
      </span>
    </div>

    <!-- Favorite Button -->
    <button 
      @click.stop="toggleFavorite"
      class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all duration-300 z-20 hover:bg-white dark:hover:bg-gray-800"
      :class="{
        'text-red-500 dark:text-red-400': favoriteStore.isFavorite(props.product.id),
        'text-gray-400 dark:text-gray-500': !favoriteStore.isFavorite(props.product.id)
      }"
    >
      <i class="fas fa-heart text-base transform transition-transform duration-300" 
         :class="[
           favoriteStore.isFavorite(props.product.id) ? 'text-red-500 scale-110' : 'text-gray-400 group-hover:text-gray-600',
           'hover:scale-125'
         ]">
      </i>
    </button>

    <!-- Product Image -->
    <div class="relative h-[200px] sm:h-[250px] md:h-[300px] w-full overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-t-2xl">
      <router-link :to="{ name: 'product', params: { id: product.id }}" class="block h-full">
        <swiper
          :modules="[Autoplay, Pagination]"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false
          }"
          :pagination="{
            clickable: true,
            el: '.swiper-pagination'
          }"
          :loop="true"
          class="product-swiper !h-full"
        >
          <swiper-slide v-for="(image, index) in product.images" :key="index" class="!h-full">
            <div class="image-container">
              <img 
                :src="image" 
                :alt="product.name + ' ' + (index + 1)"
                class="product-image"
              />
            </div>
          </swiper-slide>
          <div class="swiper-pagination"></div>
        </swiper>
      </router-link>
    </div>

    <!-- Product Info -->
    <div class="p-3">
      <!-- Title -->
      <router-link :to="{ name: 'product', params: { id: product.id }}" class="block group-hover:text-primary-600 transition-colors duration-300">
        <h3 class="font-medium text-gray-900 dark:text-white text-sm line-clamp-1 mb-2">
          {{ $t(`products.${product.id}.name`, product.name) }}
        </h3>
      </router-link>

      <!-- Rating -->
      <div class="flex items-center mb-2">
        <div class="flex items-center space-x-0.5">
          <i v-for="i in 5" :key="i" 
            :class="[
              'fas fa-star text-xs transition-colors duration-300',
              i <= product.rating ? 'text-amber-400 dark:text-amber-300' : 'text-gray-300 dark:text-gray-600'
            ]"
          ></i>
        </div>
        <span class="text-xs text-gray-500 dark:text-gray-400 ml-1.5 font-medium">({{ product.reviews }})</span>
      </div>

      <!-- Price -->
      <div class="space-y-1">
        <div v-if="product.oldPrice" class="flex items-center gap-1.5">
          <span class="text-xs text-gray-500 dark:text-gray-400 line-through font-medium">
            {{ formatPrice(product.oldPrice) }} {{ $t('currency') }}
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span class="font-bold text-base text-gray-900 dark:text-white tracking-tight">
            {{ formatPrice(product.price) }} {{ $t('currency') }}
          </span>
          <button 
            @click="handleAddToCartClick"
            class="p-2 text-primary-600 hover:text-white hover:bg-primary-600 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary-600/20"
          >
            <i class="fas fa-shopping-cart text-base"></i>
          </button>
        </div>
      </div>

      <!-- Installment Badge -->
      <div v-if="product.installment" class="mt-2 flex items-center text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg p-1.5 backdrop-blur-sm">
        <i class="fas fa-credit-card mr-1.5"></i>
        <span>{{ formatPrice(calculateMonthlyPayment(product.price)) }} {{ $t('currency') }} x 12 {{ $t('month') }}</span>
      </div>
    </div>

    <!-- Flying item animation -->
    <div 
      v-show="showFlyingItem" 
      ref="flyingItem"
      class="fixed w-32 h-32 rounded-full bg-white shadow-xl z-50 pointer-events-none"
      :style="{ 
        left: flyingItemPosition.x + 'px', 
        top: flyingItemPosition.y + 'px',
        transform: `scale(${flyingItemScale})`,
        opacity: flyingItemOpacity
      }"
    >
      <img :src="product.images[0]" class="w-full h-full object-cover rounded-full border-4 border-primary-500/50" />
    </div>

    <!-- Product Detail Modal -->
    <ProductDetailModal
      :show="showProductModal"
      :product="product"
      @close="showProductModal = false"
      @added-to-cart="handleAddedToCart"
    />
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

import { useFavoriteStore } from '@/stores/favoriteStore'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import ProductDetailModal from './ProductDetailModal.vue'

const router = useRouter()
const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const openProductModal = inject('openProductModal')

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default() {
      return {
        id: '',
        name: '',
        price: 0,
        oldPrice: null,
        rating: 0,
        reviews: 0,
        images: [],
        installment: false
      }
    }
  }
})

// Format price with thousand separators
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

// Calculate discount percentage
const calculateDiscount = (price, oldPrice) => {
  return Math.round(((oldPrice - price) / oldPrice) * 100)
}

// Calculate monthly installment payment
const calculateMonthlyPayment = (price) => {
  return Math.round(price / 12)
}

// Toggle favorite status
const toggleFavorite = (event) => {
  event.stopPropagation()
  if (favoriteStore.isFavorite(props.product.id)) {
    favoriteStore.removeFromFavorites(props.product.id)
  } else {
    favoriteStore.addToFavorites(props.product)
  }
}

// Flying animation states
const flyingItem = ref(null)
const showFlyingItem = ref(false)
const flyingItemPosition = ref({ x: 0, y: 0 })
const flyingItemScale = ref(1)
const flyingItemOpacity = ref(1)

// Add to cart with animation
const showProductModal = ref(false)

const handleAddToCartClick = (event) => {
  event.stopPropagation()
  openProductModal(props.product)
}

const handleAddedToCart = () => {
  showProductModal.value = false
  // Add any additional logic after adding to cart (e.g., show notification)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-swiper {
  position: relative;
}

.product-swiper .swiper-pagination {
  bottom: 8px !important;
}

.product-swiper .swiper-pagination-bullet {
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.8);
  opacity: 0.5;
}

.product-swiper .swiper-pagination-bullet-active {
  opacity: 1;
  background: white;
}

.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

/* Favorite button animation */
button i.fa-heart {
  transform-origin: center;
}

button:hover i.fa-heart {
  animation: heartBeat 0.3s ease-in-out;
}

button i.fa-heart.text-red-500 {
  animation: heartPop 0.3s ease-in-out;
}

@keyframes heartBeat {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes heartPop {
  0% { transform: scale(0.8); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}

/* Flying animation */
.flying-item {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  transition: all 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.flying-item.active {
  transform: scale(0.1) rotate(360deg);
  opacity: 0;
}
</style>
