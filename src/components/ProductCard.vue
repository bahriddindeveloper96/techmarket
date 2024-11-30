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

    <!-- Product Image -->
    <div class="aspect-square overflow-hidden bg-gray-50 relative">
      <router-link :to="{ name: 'product', params: { id: product.id }}">
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
          class="h-full product-swiper"
        >
          <swiper-slide v-for="(image, index) in product.images" :key="index" class="h-full">
            <img 
              :src="image" 
              :alt="product.name + ' ' + (index + 1)"
              class="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
            />
          </swiper-slide>
          <div class="swiper-pagination"></div>
        </swiper>
      </router-link>
    </div>

    <!-- Product Info -->
    <div class="p-4">
      <!-- Title -->
      <router-link :to="{ name: 'product', params: { id: product.id }}" class="block group-hover:text-primary-600 transition-colors duration-300">
        <h3 class="font-medium text-gray-900 text-sm sm:text-base line-clamp-2 mb-2">
          {{ $t(`products.${product.id}.name`, product.name) }}
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
            {{ formatPrice(product.oldPrice) }} {{ $t('currency') }}
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span class="font-semibold text-gray-900">
            {{ formatPrice(product.price) }} {{ $t('currency') }}
          </span>
          <button 
            @click="addToCartAndNavigate"
            class="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-full transition-colors duration-300"
          >
            <i class="fas fa-shopping-cart text-lg"></i>
          </button>
        </div>
      </div>

      <!-- Installment Badge -->
      <div v-if="product.installment" class="mt-3 flex items-center text-xs text-green-600 bg-green-50 rounded-lg p-2">
        <i class="fas fa-credit-card mr-1"></i>
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
  height: 100%;
  width: 100%;
}

.product-swiper .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.product-swiper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-swiper .swiper-pagination {
  position: absolute;
  top: 70% !important;
  left: 0;
  right: 0;
  z-index: 10;
}

.product-swiper .swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  background: #000;
  opacity: 0.3;
  margin: 0 4px;
}

.product-swiper .swiper-pagination-bullet-active {
  background: #000;
  opacity: 0.8;
}
</style>
