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
    <div class="relative h-[200px] sm:h-[250px] md:h-[300px] w-full overflow-hidden bg-gray-50 dark:bg-gray-900 rounded-t-2xl">
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
            id="addToCartButton"
            @click="addToCartAndNavigate"
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
  </div>
</template>

<script>
// Sample product images (high quality, square format 800x800)
const sampleImages = {
  laptop: [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1661961110372-8a7682543120?q=80&w=800&h=800&fit=crop'
  ],
  smartphone: [
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?q=80&w=800&h=800&fit=crop'
  ],
  headphones: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?q=80&w=800&h=800&fit=crop'
  ],
  watch: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=800&h=800&fit=crop'
  ],
  tablet: [
    'https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?q=80&w=800&h=800&fit=crop'
  ]
}
</script>

<script setup>
import { defineProps, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const router = useRouter()
const cartStore = useCartStore()

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
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca4?q=80&w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1661961110372-8a7682543120?q=80&w=800&h=800&fit=crop'
      ]
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

// Flying animation states
const flyingItem = ref(null)
const showFlyingItem = ref(false)
const flyingItemPosition = ref({ x: 0, y: 0 })
const flyingItemScale = ref(1)
const flyingItemOpacity = ref(1)

// Add to cart with animation
const addToCartAndNavigate = async (event) => {
  event.stopPropagation()

  const item = {
    id: props.product.id,
    name: props.product.name,
    price: props.product.price,
    image: props.product.images[0],
    quantity: 1
  }

  // Add to cart immediately for notification
  cartStore.addToCart(item)

  // Get button position
  const button = event.currentTarget
  const buttonRect = button.getBoundingClientRect()

  // Get cart icon position
  const cartIcon = document.querySelector('#cartIcon')
  const cartRect = cartIcon.getBoundingClientRect()

  // Set initial position with offset for larger size
  flyingItemPosition.value = {
    x: buttonRect.left - 32,
    y: buttonRect.top - 32
  }
  flyingItemScale.value = 1
  flyingItemOpacity.value = 1
  showFlyingItem.value = true

  // Calculate the midpoint for the arc
  const startX = buttonRect.left
  const startY = buttonRect.top
  const endX = cartRect.left + (cartRect.width / 2)
  const endY = cartRect.top + (cartRect.height / 2)
  
  // Create upward arc by making midpoint higher
  const midX = startX + (endX - startX) * 0.5  // 0.5 = o'rtadan
  const midY = Math.min(startY, endY) - 300    // -300 = balandlik

  // Scroll to top with slower speed
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })

  // Animate to cart
  await new Promise(resolve => {
    requestAnimationFrame(async () => {
      // Add transition with longer duration and more dramatic curve
      flyingItem.value.style.transition = 'all 2s cubic-bezier(0.25, 0.1, 0.25, 1.5)'
      
      // Animate in two steps for arc effect
      const animate = async () => {
        // Step 1: Move to mid point (up)
        flyingItemPosition.value = {
          x: midX,
          y: midY
        }
        flyingItemScale.value = 0.6
        flyingItemOpacity.value = 1

        await new Promise(resolve => setTimeout(resolve, 1000))

        // Step 2: Move to cart (down)
        flyingItemPosition.value = {
          x: endX - 16,
          y: endY - 16
        }
        flyingItemScale.value = 0.3
        flyingItemOpacity.value = 0.9

        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      await animate()
      resolve()
    })
  })

  showFlyingItem.value = false
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
  width: 100%;
  height: 100%;
}

.product-swiper :deep(.swiper-wrapper) {
  display: flex;
  align-items: stretch;
  height: 100%;
}

.product-swiper :deep(.swiper-slide) {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: #fff;
}

.dark .product-swiper :deep(.swiper-slide) {
  background: #1f2937;
}

.image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.product-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.group:hover .product-image {
  transform: scale(1.05);
}

.product-swiper :deep(.swiper-pagination) {
  position: absolute;
  bottom: 10px !important;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  gap: 4px;
}

.product-swiper :deep(.swiper-pagination-bullet) {
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.6);
  opacity: 1;
  transition: all 0.3s ease;
  margin: 0;
}

.product-swiper :deep(.swiper-pagination-bullet-active) {
  background: #ffffff;
  width: 20px;
  border-radius: 4px;
}

.dark .product-swiper :deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.4);
}

.dark .product-swiper :deep(.swiper-pagination-bullet-active) {
  background: #ffffff;
}
</style>
