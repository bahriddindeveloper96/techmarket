<template>
  <main class="min-h-screen bg-gray-50">
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
              <span class="text-gray-500">Savatcha</span>
            </div>
          </li>
        </ol>
      </nav>

      <div v-if="cartItems.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <!-- Cart Header -->
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Savatcha ({{ cartItems.length }})</h1>
            <button @click="clearCart" class="text-red-600 hover:text-red-700 text-sm font-medium">
              Hammasini o'chirish
            </button>
          </div>

          <!-- Cart Items List -->
          <div class="space-y-4">
            <div v-for="item in cartItems" :key="item.id" 
                 class="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div class="p-4 sm:p-6 flex gap-4">
                <!-- Product Image -->
                <router-link :to="'/product/' + item.id" class="shrink-0">
                  <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-50">
                    <img :src="item.image" :alt="item.name" class="w-full h-full object-contain" />
                  </div>
                </router-link>

                <!-- Product Info -->
                <div class="flex-grow min-w-0">
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <router-link :to="'/product/' + item.id" class="block group">
                        <h3 class="text-base sm:text-lg font-medium text-gray-900 group-hover:text-primary-600 line-clamp-2">
                          {{ item.name }}
                        </h3>
                      </router-link>
                      <p class="mt-1 text-sm text-gray-500">{{ item.category }}</p>
                    </div>
                    <button @click="removeFromCart(item)" class="text-gray-400 hover:text-red-500">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>

                  <div class="mt-4 flex flex-wrap items-end justify-between gap-4">
                    <!-- Price -->
                    <div>
                      <p v-if="item.oldPrice" class="text-sm text-gray-500 line-through">
                        {{ formatPrice(item.oldPrice) }} so'm
                      </p>
                      <p class="text-lg font-semibold text-gray-900">
                        {{ formatPrice(item.price) }} so'm
                      </p>
                    </div>

                    <!-- Quantity Controls -->
                    <div class="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                      <button 
                        @click="decreaseQuantity(item)"
                        class="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primary-600 
                               hover:bg-gray-100 rounded-lg transition-colors"
                        :disabled="item.quantity <= 1"
                      >
                        <i class="fas fa-minus"></i>
                      </button>
                      <span class="w-8 text-center font-medium">{{ item.quantity }}</span>
                      <button 
                        @click="increaseQuantity(item)"
                        class="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-primary-600 
                               hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-8">
            <div class="p-6">
              <h2 class="text-lg font-bold text-gray-900 mb-4">Buyurtma ma'lumotlari</h2>
              
              <!-- Summary Items -->
              <div class="space-y-3 mb-6">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Mahsulotlar ({{ cartItems.length }})</span>
                  <span class="font-medium">{{ formatPrice(subtotal) }} so'm</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Chegirma</span>
                  <span class="font-medium text-red-600">-{{ formatPrice(discount) }} so'm</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Yetkazib berish</span>
                  <span class="font-medium">Bepul</span>
                </div>
              </div>

              <!-- Total -->
              <div class="border-t pt-4 mb-6">
                <div class="flex justify-between items-center">
                  <span class="text-base font-bold text-gray-900">Jami</span>
                  <span class="text-xl font-bold text-gray-900">{{ formatPrice(total) }} so'm</span>
                </div>
              </div>

              <!-- Checkout Button -->
              <button 
                @click="checkout"
                class="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium 
                       transition-colors flex items-center justify-center gap-2"
              >
                <i class="fas fa-lock"></i>
                Buyurtma berish
              </button>

              <!-- Installment Option -->
              <div class="mt-4 p-4 bg-green-50 rounded-xl">
                <div class="flex items-center gap-3 text-green-800">
                  <i class="fas fa-credit-card text-lg"></i>
                  <div>
                    <p class="font-medium">Muddatli to'lov</p>
                    <p class="text-sm mt-0.5">
                      {{ formatPrice(calculateMonthlyPayment) }} so'm x 12 oy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else class="text-center py-12">
        <div class="w-24 h-24 mx-auto mb-6 text-gray-300">
          <i class="fas fa-shopping-cart text-6xl"></i>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Savatchangiz bo'sh</h2>
        <p class="text-gray-600 mb-8">Siz hali hech qanday mahsulot qo'shmagansiz</p>
        <router-link 
          to="/" 
          class="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-xl
                 hover:bg-primary-700 transition-colors"
        >
          Xarid qilishni boshlash
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'

// Sample cart data
const cartItems = ref([
  {
    id: 1,
    name: 'Apple iPhone 14 Pro 256GB Space Black',
    category: 'Smartfonlar',
    price: 15_000_000,
    oldPrice: 16_500_000,
    image: 'https://picsum.photos/400?random=1',
    quantity: 1
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23 Ultra 512GB Black',
    category: 'Smartfonlar',
    price: 13_500_000,
    oldPrice: 14_800_000,
    image: 'https://picsum.photos/400?random=2',
    quantity: 1
  }
])

// Computed properties
const subtotal = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)
})

const discount = computed(() => {
  return cartItems.value.reduce((total, item) => {
    if (item.oldPrice) {
      return total + ((item.oldPrice - item.price) * item.quantity)
    }
    return total
  }, 0)
})

const total = computed(() => {
  return subtotal.value
})

const calculateMonthlyPayment = computed(() => {
  return Math.round(total.value / 12)
})

// Methods
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}

const increaseQuantity = (item) => {
  item.quantity++
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--
  }
}

const removeFromCart = (item) => {
  const index = cartItems.value.indexOf(item)
  if (index > -1) {
    cartItems.value.splice(index, 1)
  }
}

const clearCart = () => {
  cartItems.value = []
}

const checkout = () => {
  // Checkout logic here
  console.log('Proceeding to checkout with items:', cartItems.value)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

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
