<template>
  <main class="min-h-screen">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-[1240px]">
      <!-- Breadcrumb -->
      <nav class="flex mb-8" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <router-link to="/" class="text-gray-700 hover:text-primary-600">
              Bosh sahifa
            </router-link>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
              </svg>
              <router-link :to="'/category/' + product.categoryId" class="text-gray-700 hover:text-primary-600">
                {{ product.category }}
              </router-link>
            </div>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
              </svg>
              <span class="text-gray-500">{{ product.name }}</span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- Product Details -->
      <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 md:p-8">
          <!-- Product Images -->
          <div class="space-y-4">
            <div class="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img :src="selectedImage" :alt="product.name" class="w-full h-full object-contain" />
            </div>
            <div class="grid grid-cols-4 gap-4">
              <button 
                v-for="(image, index) in product.images" 
                :key="index"
                @click="selectedImage = image"
                class="aspect-square rounded-lg overflow-hidden bg-gray-100 hover:ring-2 hover:ring-primary-500 transition-all"
                :class="{ 'ring-2 ring-primary-500': selectedImage === image }"
              >
                <img :src="image" :alt="product.name" class="w-full h-full object-contain" />
              </button>
            </div>
          </div>

          <!-- Product Info -->
          <div class="space-y-6">
            <div>
              <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{{ product.name }}</h1>
              <div class="flex items-center gap-4 mb-4">
                <div class="flex items-center">
                  <div class="flex items-center">
                    <i v-for="i in 5" :key="i" 
                      :class="[
                        'fas fa-star text-sm',
                        i <= product.rating ? 'text-yellow-400' : 'text-gray-300'
                      ]"
                    ></i>
                  </div>
                  <span class="text-sm text-gray-500 ml-2">({{ product.reviews }} sharh)</span>
                </div>
                <button @click="toggleFavorite" class="text-gray-400 hover:text-red-500">
                  <i class="fas fa-heart text-xl" :class="{ 'text-red-500': product.isFavorite }"></i>
                </button>
              </div>
            </div>

            <!-- Price Section -->
            <div class="space-y-4 p-6 bg-gray-50 rounded-xl">
              <div class="space-y-2">
                <div class="flex items-center gap-3">
                  <p v-if="product.oldPrice" class="text-lg text-gray-500 line-through">
                    {{ formatPrice(product.oldPrice) }} so'm
                  </p>
                  <span v-if="product.discount" class="px-2 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-full">
                    -{{ calculateDiscount(product.price, product.oldPrice) }}%
                  </span>
                </div>
                <p class="text-3xl font-bold text-gray-900">
                  {{ formatPrice(product.price) }} so'm
                </p>
              </div>

              <!-- Installment Option -->
              <div v-if="product.installment" class="p-4 bg-green-50 rounded-lg">
                <p class="text-green-800 font-medium mb-1">Muddatli to'lov</p>
                <p class="text-lg text-green-900">
                  <span class="font-semibold">{{ formatPrice(calculateMonthlyPayment(product.price)) }}</span> so'm x 12 oy
                </p>
              </div>

              <!-- Stock Status -->
              <div class="flex items-center text-sm" :class="product.inStock ? 'text-green-600' : 'text-red-600'">
                <i :class="['fas', product.inStock ? 'fa-check-circle' : 'fa-times-circle', 'mr-2']"></i>
                {{ product.inStock ? 'Sotuvda bor' : 'Sotuvda yo\'q' }}
              </div>
            </div>

            <!-- Actions -->
            <div class="space-y-4">
              <button 
                @click="addToCartAndNavigate"
                class="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                :disabled="!product.inStock"
              >
                <i class="fas fa-shopping-cart"></i>
                Savatga qo'shish
              </button>
              <button class="w-full py-4 border border-gray-200 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                Bir klikda sotib olish
              </button>
            </div>

            <!-- Delivery Info -->
            <div class="space-y-4 border-t pt-6">
              <div class="flex items-start gap-4">
                <i class="fas fa-truck text-gray-400 mt-1"></i>
                <div>
                  <p class="font-medium text-gray-900">Bepul yetkazib berish</p>
                  <p class="text-sm text-gray-500">Toshkent bo'ylab bepul yetkazib berish</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <i class="fas fa-shield-alt text-gray-400 mt-1"></i>
                <div>
                  <p class="font-medium text-gray-900">12 oylik kafolat</p>
                  <p class="text-sm text-gray-500">Rasmiy distribyutor kafolati</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Description -->
        <div class="border-t">
          <div class="p-6">
            <h2 class="text-xl font-bold mb-4">Mahsulot haqida</h2>
            <div class="prose max-w-none" v-html="product.description"></div>
          </div>
        </div>
      </div>

      <!-- Similar Products -->
      <div class="mt-12">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">O'xshash mahsulotlar</h2>
          <router-link 
            :to="'/category/' + product.categoryId" 
            class="text-primary-600 hover:text-primary-700 font-medium"
          >
            Barchasini ko'rish
          </router-link>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'

const route = useRoute()
const router = useRouter()
const selectedImage = ref('')

// Sample product data
const product = ref({
  id: 1,
  name: 'Apple iPhone 14 Pro 256GB Space Black',
  price: 15_000_000,
  oldPrice: 16_500_000,
  discount: true,
  installment: true,
  category: 'Smartfonlar',
  categoryId: 1,
  rating: 4.8,
  reviews: 245,
  inStock: true,
  isFavorite: false,
  images: [
    'https://picsum.photos/800/800?random=1',
    'https://picsum.photos/800/800?random=2',
    'https://picsum.photos/800/800?random=3',
    'https://picsum.photos/800/800?random=4'
  ],
  description: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  `
})

// Similar products data
const similarProducts = ref([
  {
    id: 2,
    name: 'Samsung Galaxy S23 Ultra 512GB Black',
    price: 13_500_000,
    oldPrice: 14_800_000,
    image: 'https://picsum.photos/400?random=2',
    rating: 4.7,
    reviews: 189,
    isFavorite: false
  },
  // Add more similar products...
])

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

const addToCartAndNavigate = () => {
  // Add to cart logic here
  console.log('Adding to cart:', product.value)
  // Navigate to cart page
  router.push('/cart')
}

const toggleFavorite = () => {
  product.value.isFavorite = !product.value.isFavorite
}

onMounted(() => {
  // Set initial selected image
  selectedImage.value = product.value.images[0]
  
  // Fetch product data based on route.params.id
  // This would typically be an API call
  console.log('Product ID:', route.params.id)
})
</script>

<style>
@media screen and (max-width: 480px) {
  .text-2xl {
    font-size: 1.25rem !important;
  }
  
  .text-lg {
    font-size: 1rem !important;
  }
  
  .text-base {
    font-size: 0.875rem !important;
  }
  
  .text-sm {
    font-size: 0.75rem !important;
  }
}
</style>
