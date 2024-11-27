<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center text-sm mb-6">
      <router-link to="/" class="text-gray-500 hover:text-purple-600">Bosh sahifa</router-link>
      <span class="mx-2">/</span>
      <span class="text-gray-900">{{ product.name }}</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Product Images -->
      <div class="relative">
        <div class="bg-gray-100 rounded-lg overflow-hidden mb-4">
          <swiper
            :modules="modules"
            :pagination="{ clickable: true }"
            :navigation="true"
            class="h-[400px]"
          >
            <swiper-slide v-for="(image, index) in product.images" :key="index">
              <img :src="image" :alt="product.name" class="w-full h-full object-contain">
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <!-- Product Info -->
      <div>
        <h1 class="text-2xl font-semibold mb-4">{{ product.name }}</h1>
        
        <!-- Rating and Reviews -->
        <div class="flex items-center mb-4">
          <div class="flex items-center">
            <i class="fas fa-star text-yellow-400"></i>
            <span class="ml-1">{{ product.rating }}</span>
          </div>
          <span class="mx-2">|</span>
          <span class="text-gray-500">{{ product.reviews }} sharhlar</span>
        </div>

        <!-- Price -->
        <div class="mb-6">
          <div class="flex items-center">
            <span class="text-3xl font-bold">{{ formatPrice(product.price) }} so'm</span>
            <span v-if="product.oldPrice" class="ml-3 text-lg text-gray-500 line-through">
              {{ formatPrice(product.oldPrice) }} so'm
            </span>
          </div>
          <div class="mt-2 text-sm">
            <span class="text-gray-600">Oyiga {{ formatPrice(calculateMonthlyPayment(product.price)) }} so'mdan</span>
          </div>
        </div>

        <!-- Color Selection -->
        <div class="mb-6" v-if="product.colors">
          <h3 class="text-lg font-medium mb-2">Ranglar</h3>
          <div class="flex gap-2">
            <button
              v-for="color in product.colors"
              :key="color"
              class="w-12 h-12 rounded-full border-2"
              :class="selectedColor === color ? 'border-purple-600' : 'border-gray-200'"
              :style="{ backgroundColor: color }"
              @click="selectedColor = color"
            ></button>
          </div>
        </div>

        <!-- Size Selection -->
        <div class="mb-6" v-if="product.sizes">
          <h3 class="text-lg font-medium mb-2">O'lchamlar</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="size in product.sizes"
              :key="size"
              class="px-4 py-2 border rounded-md"
              :class="selectedSize === size ? 'border-purple-600 text-purple-600' : 'border-gray-200'"
              @click="selectedSize = size"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <!-- Add to Cart -->
        <div class="flex gap-4 mb-8">
          <button
            class="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition"
            @click="addToCart"
          >
            Savatga qo'shish
          </button>
          <button
            class="p-3 border border-gray-200 rounded-lg hover:border-purple-600 transition"
            @click="toggleFavorite"
          >
            <i class="fas" :class="isFavorite ? 'fa-heart text-red-500' : 'fa-heart text-gray-400'"></i>
          </button>
        </div>

        <!-- Product Description -->
        <div class="border-t pt-6">
          <h3 class="text-lg font-medium mb-4">Mahsulot haqida</h3>
          <p class="text-gray-600">{{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const modules = [Pagination, Navigation]
const selectedColor = ref(null)
const selectedSize = ref(null)
const isFavorite = ref(false)

// Mock product data
const product = {
  id: 1,
  name: 'Erkaklar uchun sport krossovkasi Nike Air Max',
  price: 1299000,
  oldPrice: 1599000,
  rating: 4.8,
  reviews: 124,
  description: 'Nike Air Max - bu sport va kundalik kiyish uchun mo\'ljallangan zamonaviy krossovka. Yuqori sifatli materiallardan tayyorlangan, oyoqni yaxshi ushlab turadi va qulay.',
  images: [
    'https://picsum.photos/800/800?random=1',
    'https://picsum.photos/800/800?random=2',
    'https://picsum.photos/800/800?random=3'
  ],
  colors: ['#000000', '#FFFFFF', '#FF0000', '#0000FF'],
  sizes: ['36', '37', '38', '39', '40', '41', '42', '43']
}

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

const calculateMonthlyPayment = (price) => {
  return Math.round(price / 12)
}

const addToCart = () => {
  // TODO: Implement cart functionality
  console.log('Adding to cart:', {
    product: product.id,
    color: selectedColor.value,
    size: selectedSize.value
  })
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

:deep(.swiper-pagination-bullet) {
  background: #9333ea;
  opacity: 0.7;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  color: #9333ea;
}
</style>
