<template>
  <main class="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    <Banner />
    
    <div class="container mx-auto px-4 py-8">
      <!-- Cart Header -->
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent">
          Savat
        </h1>
        <button v-if="cartItems.length" @click="clearCart" class="text-sm text-red-500 hover:text-red-600 transition-colors">
          Savatni tozalash
        </button>
      </div>

      <!-- Empty Cart -->
      <div v-if="!cartItems.length" class="text-center py-16">
        <div class="w-24 h-24 mx-auto mb-6 text-gray-300">
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <p class="text-gray-500 mb-6">Savatingiz bo'sh</p>
        <router-link to="/" class="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl px-6 py-3 font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-300 hover:shadow-lg hover:shadow-purple-200 active:scale-[0.98]">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Xarid qilishni davom ettirish
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <div v-for="item in cartItems" :key="item.id" class="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-4 relative group">
            <div class="flex gap-4">
              <!-- Product Image -->
              <div class="w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-gray-50 p-2 flex-shrink-0">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-contain" />
              </div>

              <!-- Product Info -->
              <div class="flex-grow">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-medium text-gray-900 mb-1">{{ item.name }}</h3>
                    <div class="text-sm text-gray-500 space-y-1">
                      <p v-if="item.color">Rang: <span class="inline-block w-3 h-3 rounded-full ml-1" :style="{ backgroundColor: item.color }"></span></p>
                      <p v-if="item.size">O'lcham: {{ item.size }}</p>
                    </div>
                  </div>
                  <button @click="removeFromCart(item)" class="text-gray-400 hover:text-red-500 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <!-- Price and Quantity -->
                <div class="flex justify-between items-center mt-4">
                  <div class="flex items-center gap-2">
                    <span class="font-medium text-purple-600">{{ formatPrice(item.price) }}</span>
                    <span v-if="item.oldPrice" class="text-sm text-gray-400 line-through">{{ formatPrice(item.oldPrice) }}</span>
                  </div>
                  
                  <div class="flex items-center border-2 border-gray-200 rounded-lg">
                    <button 
                      @click="decrementQuantity(item)"
                      class="px-3 py-1 text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                      :disabled="item.quantity <= 1"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                      </svg>
                    </button>
                    <span class="w-8 text-center font-medium">{{ item.quantity }}</span>
                    <button 
                      @click="incrementQuantity(item)"
                      class="px-3 py-1 text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-sm p-6 sticky top-4">
            <h2 class="text-lg font-medium mb-4">Buyurtma ma'lumotlari</h2>
            
            <div class="space-y-3 mb-6">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Mahsulotlar ({{ totalItems }})</span>
                <span>{{ formatPrice(subtotal) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Chegirma</span>
                <span class="text-green-500">-{{ formatPrice(discount) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Yetkazib berish</span>
                <span>{{ formatPrice(shipping) }}</span>
              </div>
              <div class="border-t pt-3 flex justify-between font-medium">
                <span>Jami</span>
                <span class="text-lg text-purple-600">{{ formatPrice(total) }}</span>
              </div>
            </div>

            <button class="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl px-6 py-3 font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-300 hover:shadow-lg hover:shadow-purple-200 active:scale-[0.98]">
              Buyurtma berish
            </button>
          </div>
        </div>
      </div>

      <!-- Similar Products -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent">
          Sizga yoqishi mumkin
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
import { ref, computed } from 'vue'
import Banner from './../components/Banner.vue'
import ProductCard from '@/components/ProductCard.vue'

// Cart items
const cartItems = ref([
  {
    id: 1,
    name: 'iPhone 15 Pro Max 256GB Natural Titanium',
    price: 15999000,
    oldPrice: 17500000,
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    color: '#A6A6A6',
    size: '256GB',
    quantity: 1
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23 Ultra 512GB Black',
    price: 13500000,
    oldPrice: 14800000,
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    color: '#2B2B2B',
    size: '512GB',
    quantity: 1
  }
])

// Similar products
const similarProducts = ref([
  {
    id: 3,
    name: 'Google Pixel 8 Pro 256GB',
    price: 12500000,
    oldPrice: 13800000,
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    rating: 4.7,
    reviews: 156,
    isFavorite: false
  },
  {
    id: 4,
    name: 'Xiaomi 13T Pro 512GB',
    price: 9999000,
    oldPrice: 11200000,
    image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    rating: 4.5,
    reviews: 98,
    isFavorite: false
  },
  {
    id: 5,
    name: 'OnePlus 11 256GB',
    price: 11500000,
    oldPrice: 12800000,
    image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    rating: 4.6,
    reviews: 145,
    isFavorite: false
  }
])

// Computed properties
const totalItems = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0)
})

const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const discount = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + ((item.oldPrice - item.price) * item.quantity)
  }, 0)
})

const shipping = computed(() => {
  return totalItems.value > 0 ? 50000 : 0
})

const total = computed(() => {
  return subtotal.value + shipping.value
})

// Methods
const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price)
}

const incrementQuantity = (item) => {
  item.quantity++
}

const decrementQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--
  }
}

const removeFromCart = (item) => {
  const index = cartItems.value.findIndex(cartItem => cartItem.id === item.id)
  if (index > -1) {
    cartItems.value.splice(index, 1)
  }
}

const clearCart = () => {
  cartItems.value = []
}
</script>
