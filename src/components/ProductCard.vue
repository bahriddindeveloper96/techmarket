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
      class="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
      :class="{'text-red-500 dark:text-red-400': product.isFavorite, 'text-gray-400 dark:text-gray-500': !product.isFavorite}"
    >
      <i class="fas fa-heart text-lg transform transition-transform duration-300" 
         :class="[
           product.isFavorite ? 'text-red-500 scale-110' : 'text-gray-400 group-hover:text-gray-600',
           'hover:scale-125'
         ]">
      </i>
    </button>

    <!-- Product Image -->
    <div class="h-[300px] w-full overflow-hidden bg-gray-50 dark:bg-gray-900 relative rounded-t-2xl">
      <router-link :to="{ name: 'product', params: { id: product.id }}" class="block h-full">
        <swiper
          :modules="[SwiperAutoplay, SwiperPagination]"
          :autoplay="{
            delay: 3000,
            disableOnInteraction: false
          }"
          :pagination="{
            clickable: true,
            el: '.swiper-pagination'
          }"
          :loop="true"
          class="h-full w-full product-swiper"
        >
          <swiper-slide v-for="(image, index) in product.images" :key="index" class="h-full w-full">
            <div class="w-full h-full">
              <img 
                :src="image" 
                :alt="product.name + ' ' + (index + 1)"
                class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </swiper-slide>
          <div class="swiper-pagination"></div>
        </swiper>
      </router-link>
    </div>

    <!-- Product Info -->
    <div class="p-5">
      <!-- Title -->
      <router-link :to="{ name: 'product', params: { id: product.id }}" class="block group-hover:text-primary-600 transition-colors duration-300">
        <h3 class="font-medium text-gray-900 dark:text-white text-sm sm:text-base line-clamp-2 mb-3 tracking-wide">
          {{ $t(`products.${product.id}.name`, product.name) }}
        </h3>
      </router-link>

      <!-- Rating -->
      <div class="flex items-center mb-4">
        <div class="flex items-center space-x-0.5">
          <i v-for="i in 5" :key="i" 
            :class="[
              'fas fa-star text-xs sm:text-sm transition-colors duration-300',
              i <= product.rating ? 'text-amber-400 dark:text-amber-300' : 'text-gray-300 dark:text-gray-600'
            ]"
          ></i>
        </div>
        <span class="text-xs text-gray-500 dark:text-gray-400 ml-2 font-medium">({{ product.reviews }})</span>
      </div>

      <!-- Price -->
      <div class="space-y-2">
        <div v-if="product.oldPrice" class="flex items-center gap-2">
          <span class="text-sm text-gray-500 dark:text-gray-400 line-through font-medium">
            {{ formatPrice(product.oldPrice) }} {{ $t('currency') }}
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span class="font-bold text-lg text-gray-900 dark:text-white tracking-tight">
            {{ formatPrice(product.price) }} {{ $t('currency') }}
          </span>
          <button 
            @click="addToCartAndNavigate"
            class="p-3 text-primary-600 hover:text-white hover:bg-primary-600 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary-600/20"
          >
            <i class="fas fa-shopping-cart text-lg"></i>
          </button>
        </div>
      </div>

      <!-- Installment Badge -->
      <div v-if="product.installment" class="mt-4 flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-2.5 backdrop-blur-sm">
        <i class="fas fa-credit-card mr-2"></i>
        <span>{{ formatPrice(calculateMonthlyPayment(product.price)) }} {{ $t('currency') }} x 12 {{ $t('month') }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const router = useRouter()
const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      name: '',
      price: 0,
      oldPrice: null,
      rating: 0,
      reviews: 0,
      isFavorite: false,
      installment: false,
      images: [] // array of image URLs
    })
  }
})

// Swiper modules
const SwiperAutoplay = Autoplay
const SwiperPagination = Pagination

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
  // Add your favorite toggle logic here
}

// Add to cart and navigate to cart view
const addToCartAndNavigate = (event) => {
  event.stopPropagation()
  // Add your cart logic here
  router.push({ name: 'cart' })
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
  height: 100% !important;
  width: 100% !important;
}

.product-swiper .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100% !important;
  width: 100% !important;
  overflow: hidden;
}

.product-swiper img {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
  object-position: center;
}

.product-swiper .swiper-wrapper {
  height: 100% !important;
}

.product-swiper .swiper-pagination {
  position: absolute;
  bottom: 10px !important;
  left: 0;
  right: 0;
  z-index: 10;
}

.product-swiper .swiper-pagination-bullet {
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.6);
  opacity: 1;
  transition: all 0.3s ease;
  margin: 0 4px;
}

.product-swiper .swiper-pagination-bullet-active {
  background: #ffffff;
  width: 20px;
  border-radius: 4px;
}

.dark .product-swiper .swiper-pagination-bullet {
  background: rgba(255, 255, 255, 0.4);
}

.dark .product-swiper .swiper-pagination-bullet-active {
  background: #ffffff;
}
</style>
