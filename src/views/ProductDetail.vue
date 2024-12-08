<template>
  <main class="py-2">    
    <!-- Breadcrumb -->
    
      <div class="mx-auto px-4 py-2">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <router-link to="/" class="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Bosh sahifa
              </router-link>
            </li>
            <li>
              <div class="flex items-center">
                <svg class="w-3 h-3 text-gray-400 dark:text-gray-600 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span class="text-gray-500 dark:text-gray-400">{{ product.category }}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    

    <!-- Product Info -->
    
      <div class="bg-white dark:bg-gray-900 rounded-3xl shadow-lg shadow-purple-100/50 dark:shadow-purple-900/50 overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-8 p-8">
          <!-- Left Column - Product Images (3 column) -->
          <div class="md:col-span-3 space-y-6">
            <!-- Main Images -->
            <div class="grid md:grid-cols-2 grid-cols-1 gap-2 relative group">
              <div class="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50 to-gray-50 dark:from-purple-900/20 dark:to-gray-800 cursor-pointer relative" @click="openImageModal(selectedImage)">
                <img :src="selectedImage" :alt="product.name" class="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div class="hidden md:block aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50 to-gray-50 dark:from-purple-900/20 dark:to-gray-800 cursor-pointer relative" @click="openImageModal(nextImage)">
                <img :src="nextImage" :alt="product.name" class="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>

              <!-- Navigation Buttons -->
              <button 
                @click="previousImage" 
                class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <svg class="w-6 h-6 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                @click="nextImageSlide" 
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <svg class="w-6 h-6 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <!-- Thumbnail Grid -->
            <div class="grid grid-cols-5 gap-2">
              <button 
                v-for="(image, index) in product.images" 
                :key="index"
                @click="selectedImageIndex = index"
                class="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-gray-50 dark:from-purple-900/20 dark:to-gray-800 relative hover:shadow-lg transition-all duration-300"
                :class="selectedImageIndex === index ? 'ring-2 ring-purple-500 dark:ring-purple-400 shadow-lg' : ''"
              >
                <img :src="image" :alt="product.name" class="absolute inset-0 w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- Right Column - Product Details (2 column) -->
          <div class="md:col-span-2 p-4 space-y-4">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ $t(`products.${product.id}.name`, product.name) }}
            </h1>

            <!-- Rating & Reviews -->
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <div class="flex items-center">
                  <svg v-for="i in 5" :key="i" 
                    :class="[
                      'w-4 h-4',
                      i <= product.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                    ]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span class="text-sm text-gray-600 dark:text-gray-400">{{ product.rating }} {{ $t('product.rating') }}</span>
              </div>
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ product.reviews }} {{ $t('product.reviews') }}</span>
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ product.orders }} {{ $t('product.orders') }}</span>
            </div>

            <!-- Price -->
            <div class="bg-gradient-to-br from-purple-50 to-gray-50 dark:from-purple-900/20 dark:to-gray-800 rounded-xl p-2 space-y-2">
              <div class="flex items-baseline gap-2">
                <span class="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                  {{ formatPrice(product.price) }} {{ $t('currency') }}
                </span>
                <span class="text-base text-gray-400 dark:text-gray-500 line-through">
                  {{ formatPrice(product.oldPrice) }} {{ $t('currency') }}
                </span>
              </div>
              <div class="flex items-center gap-2">
                <span class="px-1 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full text-xs font-medium">
                  -{{ calculateDiscount(product.price, product.oldPrice) }}%
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ $t('product.sale_price') }}</span>
              </div>
            </div>

            <!-- Colors -->
            <div class="space-y-2">
              <h3 class="font-medium text-gray-900 dark:text-white">{{ $t('product.colors') }}</h3>
              <div class="flex gap-2">
                <button
                  v-for="color in product.colors"
                  :key="color"
                  @click="selectedColor = color"
                  class="w-8 h-8 rounded-full border-2 dark:border-gray-700 transition-all duration-300"
                  :class="selectedColor === color ? 'ring-2 ring-purple-500 dark:ring-purple-400 ring-offset-2 dark:ring-offset-gray-900' : ''"
                  :style="{ backgroundColor: color }"
                ></button>
              </div>
            </div>

            <!-- Sizes -->
            <div class="space-y-2">
              <h3 class="font-medium text-gray-900 dark:text-white">{{ $t('product.sizes') }}</h3>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="size in product.sizes"
                  :key="size"
                  @click="selectedSize = size"
                  class="px-2 py-2 rounded-lg border transition-all duration-300"
                  :class="selectedSize === size ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' : 'border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400'"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <!-- Quantity -->
            <div class="space-y-2">
              <h3 class="font-medium text-gray-900 dark:text-white">{{ $t('product.quantity') }}</h3>
              <div class="flex items-center gap-2">
                <button
                  @click="quantity > 1 && quantity--"
                  class="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
                >
                  <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </button>
                <span class="text-lg font-medium w-8 text-center text-gray-900 dark:text-white">{{ quantity }}</span>
                <button
                  @click="quantity++"
                  class="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
                >
                  <svg class="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Add to Cart -->
            <div class="flex gap-2">
              <button 
                id="addToCartButton"
                @click="addToCart"
                class="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:from-purple-700 hover:to-purple-800 dark:hover:from-purple-600 dark:hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-200 dark:hover:shadow-purple-900 active:scale-[0.98]"
              >
                {{ $t('product.add_to_cart') }}
              </button>
            </div>

            <!-- Specifications -->
            <div class="border-t dark:border-gray-700 pt-2">
              <h3 class="font-medium mb-2 text-sm text-gray-900 dark:text-white">{{ $t('product.specifications') }}</h3>
              <div class="prose prose-sm text-gray-600 dark:text-gray-400 mb-2 text-sm">
                {{ $t(`products.${product.id}.description`, product.description) }}
              </div>
              <div class="space-y-2">
                <div v-for="(spec, index) in product.specifications" :key="index" 
                  class="flex py-1 px-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-sm"
                >
                  <span class="text-gray-500 dark:text-gray-400 w-1/3">{{ $t(`products.${product.id}.specs.${spec.name}`, spec.name) }}:</span>
                  <span class="text-gray-900 dark:text-gray-100 w-2/3 font-medium">{{ $t(`products.${product.id}.specs.${spec.name}_value`, spec.value) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Image Modal -->
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" @click="closeImageModal">
        <div class="relative max-w-5xl w-full h-full flex items-center justify-center" @click.stop>
          <!-- Close button -->
          <button @click="closeImageModal" class="absolute top-4 right-4 text-white hover:text-gray-300 z-10">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <!-- Previous button -->
          <button @click="showPrevImage" class="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <!-- Next button -->
          <button @click="showNextImage" class="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 z-10">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <!-- Modal image -->
          <img 
            :src="modalImage" 
            :alt="product.name" 
            class="w-full h-full object-contain"
          />
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
        <img :src="selectedImage" class="w-full h-full object-cover rounded-full border-4 border-primary-500/50" />
      </div>

      <!-- Similar Products -->
      <div class="mt-4">
        <h2 class="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-purple-900 dark:from-gray-100 dark:to-purple-400 bg-clip-text text-transparent">
          {{ $t('product.similar') }}
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <ProductCard 
            v-for="product in similarProducts" 
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    

  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cartStore'
import ProductCard from '@/components/ProductCard.vue'

const cartStore = useCartStore()
const router = useRouter()

const product = ref({
  id: 1,
  name: "iPhone 14 Pro",
  category: "Telefonlar",
  images: [
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-deeppurple?wid=2560&hei=1440&fmt=jpeg&qlt=95&.v=1663703840578',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-gold?wid=2560&hei=1440&fmt=jpeg&qlt=95&.v=1663703840519',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-silver?wid=2560&hei=1440&fmt=jpeg&qlt=95&.v=1663703840488',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch-spaceblack?wid=2560&hei=1440&fmt=jpeg&qlt=95&.v=1663703840418',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-2-202209?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753617559'
  ],
  price: 14_999_000,
  oldPrice: 15_999_000,
  rating: 4.8,
  reviews: 256,
  orders: 1200,
  colors: ['#574F6F', '#F4E8CE', '#F1F3F2', '#53514F'],
  sizes: ['128GB', '256GB', '512GB', '1TB'],
  description: "iPhone 14 Pro - eng zo'r flagman smartfon. Dynamic Island, yangi A16 Bionic protsessor, 48MP asosiy kamera.",
  specifications: [
    { name: 'Protsessor', value: 'A16 Bionic' },
    { name: 'Ekran', value: '6.1" Super Retina XDR OLED' },
    { name: 'Kamera', value: '48MP + 12MP + 12MP' },
    { name: 'Batareya', value: '3200 mAh' },
    { name: 'RAM', value: '6GB' }
  ]
})

// Similar Products data
const similarProducts = ref([
{
    id: 1,
    name: 'iPhone 13 Pro Max',
    price: 13_999_000,
    oldPrice: 15_999_000,
    rating: 4.8,
    reviews: 245,
    isFavorite: false,
    installment: true,
    images: [
      'https://picsum.photos/400/400?random=1',
      'https://picsum.photos/400/400?random=2',
      'https://picsum.photos/400/400?random=3'
    ]
  },
  {
    id: 2,
    name: 'Samsung Galaxy S21 Ultra',
    price: 12_999_000,
    oldPrice: 14_499_000,
    rating: 4.7,
    reviews: 189,
    isFavorite: false,
    installment: true,
    images: [
      'https://picsum.photos/400/400?random=4',
      'https://picsum.photos/400/400?random=5',
      'https://picsum.photos/400/400?random=6'
    ]
  },
  {
    id: 5,
    name: 'MacBook Pro 16"',
    price: 15_999_000,
    oldPrice: null,
    rating: 5.0,
    reviews: 87,
    isFavorite: false,
    installment: true,
    images: [
      'https://picsum.photos/400/400?random=1',
      'https://picsum.photos/400/400?random=8',
      'https://picsum.photos/400/400?random=7'
    ]
  },
  {
    id: 6,
    name: 'iPad Pro 10.9"',
    price: 10_999_000,
    oldPrice: 13_499_000,
    rating: 4.9,
    reviews: 156,
    isFavorite: false,
    installment: true,
    images: [
      'https://picsum.photos/400/400?random=15',
      'https://picsum.photos/400/400?random=11',
      'https://picsum.photos/400/400?random=14'
    ]
  },
  {
    id: 8,
    name: 'iPad Pro 10.9"',
    price: 10_999_000,
    oldPrice: 13_499_000,
    rating: 4.9,
    reviews: 156,
    isFavorite: false,
    installment: true,
    images: [
      'https://picsum.photos/400/400?random=15',
      'https://picsum.photos/400/400?random=11',
      'https://picsum.photos/400/400?random=14'
    ]
  }
])

// Image slider logic
const selectedImageIndex = ref(0)
const selectedImage = computed(() => product.value.images[selectedImageIndex.value])
const nextImage = computed(() => {
  const nextIndex = (selectedImageIndex.value + 1) % product.value.images.length
  return product.value.images[nextIndex]
})

const previousImage = () => {
  selectedImageIndex.value = (selectedImageIndex.value - 1 + product.value.images.length) % product.value.images.length
}

const nextImageSlide = () => {
  selectedImageIndex.value = (selectedImageIndex.value + 1) % product.value.images.length
}

// Modal functionality
const showModal = ref(false)
const modalImage = ref('')
const currentImageIndex = ref(0)

const openImageModal = (image) => {
  modalImage.value = image
  currentImageIndex.value = product.value.images.indexOf(image)
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

const closeImageModal = () => {
  showModal.value = false
  document.body.style.overflow = ''
}

const showPrevImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + product.value.images.length) % product.value.images.length
  modalImage.value = product.value.images[currentImageIndex.value]
}

const showNextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % product.value.images.length
  modalImage.value = product.value.images[currentImageIndex.value]
}

// Keyboard navigation
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

const handleKeydown = (e) => {
  if (!showModal.value) return
  
  switch(e.key) {
    case 'Escape':
      closeImageModal()
      break
    case 'ArrowLeft':
      showPrevImage()
      break
    case 'ArrowRight':
      showNextImage()
      break
  }
}

// State variables
const selectedColor = ref(product.value.colors[0])
const selectedSize = ref(product.value.sizes[0])
const quantity = ref(1)

// Flying animation
const flyingItem = ref(null)
const showFlyingItem = ref(false)
const flyingItemPosition = ref({ x: 0, y: 0 })
const flyingItemScale = ref(1)
const flyingItemOpacity = ref(1)

const addToCart = async () => {
  const item = {
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    image: product.value.images[0],
    color: selectedColor.value,
    size: selectedSize.value,
    quantity: quantity.value
  }

  // Check if mobile view
  const isMobile = window.innerWidth < 768

  // Add to cart immediately for notification
  cartStore.addToCart(item)

  // Get button position
  const button = document.querySelector('#addToCartButton')
  const buttonRect = button.getBoundingClientRect()

  // Get cart icon position based on device
  const cartIcon = isMobile ? 
    document.querySelector('#mobileCartWrapper') : 
    document.querySelector('#cartIcon')
  const cartRect = cartIcon.getBoundingClientRect()

  // Set initial position with offset for larger size
  flyingItemPosition.value = {
    x: buttonRect.left - 32,
    y: buttonRect.top - 32
  }
  flyingItemScale.value = 1
  flyingItemOpacity.value = 1
  showFlyingItem.value = true

  if (!isMobile) {
    // Desktop: Scroll to top with slower speed
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Animate to cart
  await new Promise(resolve => {
    requestAnimationFrame(async () => {
      // Add transition with longer duration and more dramatic curve
      flyingItem.value.style.transition = 'all 1.8s cubic-bezier(0.25, 0.1, 0.25, 1.5)'
      
      if (isMobile) {
        // Mobile: Two-step animation with downward arc
        // Step 1: Move slightly up first
        flyingItemPosition.value = {
          x: buttonRect.left,
          y: buttonRect.top - 50 // Move up first
        }
        await new Promise(resolve => setTimeout(resolve, 600))

        // Step 2: Arc down to cart in navbar
        flyingItemPosition.value = {
          x: cartRect.left + (cartRect.width / 2) - 16,
          y: cartRect.top + (cartRect.height / 2) - 16
        }
      } else {
        // Desktop: Direct path to navbar cart
        flyingItemPosition.value = {
          x: cartRect.left + (cartRect.width / 2) - 16,
          y: cartRect.top + (cartRect.height / 2) - 16
        }
      }
      
      flyingItemScale.value = 0.3
      flyingItemOpacity.value = 0.9

      await new Promise(resolve => setTimeout(resolve, 1200))
      resolve()
    })
  })

  showFlyingItem.value = false

  // Show notification on mobile cart icon
  if (isMobile) {
    const cartWrapper = document.querySelector('#mobileCartWrapper')
    const cartCount = document.querySelector('#cartCount')
    
    if (cartWrapper && cartCount) {
      // Add notification animation to wrapper
      cartWrapper.classList.add('mobile-cart-notification')
      
      // Add count animation
      cartCount.classList.add('count-update')
      
      // Remove animation classes after animation completes
      setTimeout(() => {
        cartWrapper.classList.remove('mobile-cart-notification')
        cartCount.classList.remove('count-update')
      }, 2000)
    }
  }
}

// Helper functions
const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price)
}

const calculateDiscount = (price, oldPrice) => {
  return Math.round(((oldPrice - price) / oldPrice) * 100)
}
</script>

<style scoped>
.prose {
  max-width: none;
}
</style>
