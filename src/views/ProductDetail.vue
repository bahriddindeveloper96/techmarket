<template>
  <main class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <Banner />
    <!-- Breadcrumb -->
    <div class="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
      <div class="container mx-auto px-4 py-3">
        <nav class="flex" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <router-link to="/" class="text-gray-500 hover:text-purple-600 transition-colors">
                Bosh sahifa
              </router-link>
            </li>
            <li>
              <div class="flex items-center">
                <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
                <span class="text-gray-500">{{ product.category }}</span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
    </div>

    <!-- Product Info -->
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-3xl shadow-lg shadow-purple-100/50 overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-5 gap-8 p-8">
          <!-- Left Column - Product Images (3 column) -->
          <div class="md:col-span-3 space-y-6">
            <!-- Main Images -->
            <div class="grid grid-cols-2 gap-4 relative group">
              <div class="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50 to-gray-50 p-8">
                <img :src="selectedImage" :alt="product.name" class="w-full h-full object-contain hover:scale-105 transition-transform duration-300" />
              </div>
              <div class="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-50 to-gray-50 p-8">
                <img :src="nextImage" :alt="product.name" class="w-full h-full object-contain hover:scale-105 transition-transform duration-300" />
              </div>

              <!-- Navigation Buttons -->
              <button 
                @click="previousImage" 
                class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                @click="nextImageSlide" 
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <svg class="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <!-- Thumbnail Grid -->
            <div class="grid grid-cols-5 gap-4">
              <button 
                v-for="(image, index) in product.images" 
                :key="index"
                @click="selectedImageIndex = index"
                class="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-gray-50 p-2 hover:shadow-lg transition-all duration-300"
                :class="selectedImageIndex === index ? 'ring-2 ring-purple-500 shadow-lg' : ''"
              >
                <img :src="image" :alt="product.name" class="w-full h-full object-contain" />
              </button>
            </div>
          </div>

          <!-- Right Column - Product Details (2 column) -->
          <div class="md:col-span-2 space-y-6">
            <!-- Title and Rating -->
            <div>
              <h1 class="text-2xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent">
                {{ product.name }}
              </h1>
              <div class="flex items-center gap-4 text-sm">
                <div class="flex items-center gap-1">
                  <div class="flex items-center text-yellow-400">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span class="ml-1 font-medium">{{ product.rating }}</span>
                  </div>
                  <span class="text-gray-400">•</span>
                  <span class="text-gray-600">{{ product.reviews }} ta sharh</span>
                </div>
              </div>
            </div>

            <!-- Price Info -->
            <div class="bg-gradient-to-br from-purple-50 to-gray-50 rounded-xl p-4 space-y-2">
              <div class="flex items-baseline gap-2">
                <span class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  {{ formatPrice(product.price) }}
                </span>
                <span class="text-base text-gray-400 line-through">{{ formatPrice(product.oldPrice) }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                  -{{ calculateDiscount(product.price, product.oldPrice) }}%
                </span>
                <span class="text-sm text-gray-500">Aksiya narxi</span>
              </div>
            </div>

            <!-- Variants -->
            <div class="space-y-4">
              <!-- Colors -->
              <div v-if="product.colors && product.colors.length">
                <h3 class="text-sm font-medium text-gray-700 mb-2">Ranglar:</h3>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="color in product.colors"
                    :key="color"
                    class="w-10 h-10 rounded-xl transition-transform hover:scale-105 duration-300 relative group"
                    :class="selectedColor === color ? 'ring-2 ring-purple-500 ring-offset-2' : ''"
                    @click="selectedColor = color"
                  >
                    <div class="w-full h-full rounded-xl" :style="{ backgroundColor: color }"></div>
                    <div class="absolute inset-0 rounded-xl bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </button>
                </div>
              </div>

              <!-- Sizes -->
              <div v-if="product.sizes && product.sizes.length">
                <h3 class="text-sm font-medium text-gray-700 mb-2">O'lchamlar:</h3>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="size in product.sizes"
                    :key="size"
                    class="px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-300 hover:shadow-md"
                    :class="selectedSize === size ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-200 text-gray-700 hover:border-purple-200'"
                    @click="selectedSize = size"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Add to Cart -->
            <div class="flex gap-3">
              <div class="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                <button 
                  @click="decrementQuantity"
                  class="px-3 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                  :disabled="quantity <= 1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                  </svg>
                </button>
                <span class="w-10 text-center font-medium text-gray-900">{{ quantity }}</span>
                <button 
                  @click="incrementQuantity"
                  class="px-3 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                </button>
              </div>
              <button 
                @click="addToCart"
                class="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg px-6 py-2 text-sm font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-300 hover:shadow-lg hover:shadow-purple-200 active:scale-[0.98]"
              >
                Savatga qo'shish
              </button>
            </div>

            <!-- Specifications -->
            <div class="border-t pt-4">
              <h3 class="font-medium mb-3 text-sm">Mahsulot haqida</h3>
              <div class="prose prose-sm text-gray-600 mb-4 text-sm">
                {{ product.description }}
              </div>
              <div class="space-y-2">
                <div v-for="(spec, index) in product.specifications" :key="index" 
                  class="flex py-1.5 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  <span class="text-gray-500 w-1/3">{{ spec.name }}:</span>
                  <span class="text-gray-900 w-2/3 font-medium">{{ spec.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Similar Products -->
      <div class="mt-12">
        <h2 class="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent">
          O'xshash mahsulotlar
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <ProductCard 
            v-for="product in similarProducts" 
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Banner from './../components/Banner.vue'
import ProductCard from '@/components/ProductCard.vue'

const router = useRouter()

const product = ref({
  id: 1,
  name: 'iPhone 15 Pro Max',
  price: 15999000,
  oldPrice: 17999000,
  rating: 4.8,
  reviews: 256,
  orders: 1200,
  images: [
    'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg'
  ],
  colors: ['#A6A6A6', '#4F4F4F', '#2B2B2B', '#4169E1'],
  sizes: ['128GB', '256GB', '512GB', '1TB'],
  description: 'iPhone 15 Pro Max - eng zo\'r flagman smartfon. Dynamic Island, yangi 3nm A17 Pro protsessor, titanli korpus, 48MP asosiy kamera.',
  specifications: [
    { name: 'Protsessor', value: 'A17 Pro' },
    { name: 'Ekran', value: '6.7" Super Retina XDR OLED' },
    { name: 'Kamera', value: '48MP + 12MP + 12MP' },
    { name: 'Batareya', value: '4422 mAh' }
  ]
})

const selectedImageIndex = ref(0)
const selectedColor = ref(product.value.colors[0])
const selectedSize = ref(product.value.sizes[0])
const quantity = ref(1)

// Slider uchun computed properties
const selectedImage = computed(() => product.value.images[selectedImageIndex.value])
const nextImage = computed(() => {
  const nextIndex = (selectedImageIndex.value + 1) % product.value.images.length
  return product.value.images[nextIndex]
})

// Slider funksiyalari
const previousImage = () => {
  selectedImageIndex.value = selectedImageIndex.value === 0 
    ? product.value.images.length - 1 
    : selectedImageIndex.value - 1
}

const nextImageSlide = () => {
  selectedImageIndex.value = (selectedImageIndex.value + 1) % product.value.images.length
}

// Avtomatik slayd
let slideInterval
onMounted(() => {
  slideInterval = setInterval(nextImageSlide, 5000) // Har 5 sekundda
})

// Boshqa funksiyalar
const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price)
}

const calculateDiscount = (price, oldPrice) => {
  return Math.round(((oldPrice - price) / oldPrice) * 100)
}

const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  console.log('Adding to cart:', {
    product: product.value.name,
    color: selectedColor.value,
    size: selectedSize.value,
    quantity: quantity.value
  })
  router.push({ name: 'cart' })
}

// O'xshash mahsulotlar
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
</script>

<style scoped>
.prose {
  max-width: none;
}
</style>
