<template>
  <main class="py-4">      
      <!-- Cart Header -->
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent dark:text-white">
          {{ $t('cart.title') }}
        </h1>
        <button v-if="cartItems.length" @click="clearCart" class="text-sm text-red-500 hover:text-red-600 transition-colors dark:text-red-400 dark:hover:text-red-300">
          {{ $t('cart.clear_cart') }}
        </button>
      </div>

      <!-- Empty Cart -->
      <div v-if="!cartItems.length" class="text-center py-8">
        <div class="w-24 h-24 mx-auto mb-6 text-gray-300 dark:text-gray-600">
          <i class="fas fa-shopping-cart text-6xl"></i>
        </div>
        <h2 class="text-xl font-medium text-gray-600 dark:text-gray-400 mb-4">{{ $t('cart.empty') }}</h2>
        <router-link to="/" class="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors dark:bg-purple-500 dark:hover:bg-purple-600">
          {{ $t('cart.continue_shopping') }}
        </router-link>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Cart Items -->
        <div class="lg:col-span-2 space-y-4">
          <div v-for="item in cartItems" :key="item.id" 
            class="flex items-center gap-4 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <!-- Product Image -->
            <img :src="item.image" :alt="item.name" class="w-24 h-24 object-cover rounded-lg">
            
            <!-- Product Info -->
            <div class="flex-1">
              <h3 class="font-medium text-gray-900 dark:text-white">{{ $t(`products.${item.id}.name`, item.name) }}</h3>
              <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                <span v-if="item.color" class="mr-2">
                  <i class="fas fa-circle" :style="{ color: item.color }"></i>
                </span>
                <span v-if="item.size">{{ item.size }}</span>
              </div>
              <div class="mt-2 flex items-center gap-4">
                <span class="font-medium text-gray-900 dark:text-white">{{ formatPrice(item.price) }} {{ $t('currency') }}</span>
              </div>
            </div>

            <!-- Quantity Controls -->
            <div class="flex items-center gap-2">
              <button 
                @click="updateQuantity(item, -1)"
                class="w-8 h-8 flex items-center justify-center rounded-lg border hover:border-purple-500 transition-colors dark:border-gray-700 dark:hover:border-purple-400"
                :disabled="item.quantity <= 1"
              >
                <i class="fas fa-minus text-sm text-gray-600 dark:text-gray-400"></i>
              </button>
              <span class="w-8 text-center text-gray-900 dark:text-white">{{ item.quantity }}</span>
              <button 
                @click="updateQuantity(item, 1)"
                class="w-8 h-8 flex items-center justify-center rounded-lg border hover:border-purple-500 transition-colors dark:border-gray-700 dark:hover:border-purple-400"
              >
                <i class="fas fa-plus text-sm text-gray-600 dark:text-gray-400"></i>
              </button>
            </div>

            <!-- Actions -->
            <div class="flex gap-2">
              <button 
                @click="removeFromCart(item)"
                class="text-gray-400 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400"
                :title="$t('cart.remove')"
              >
                <i class="fas fa-trash"></i>
              </button>
              
            </div>
          </div>

          <!-- Clear Cart -->
          <button 
            @click="clearCart"
            class="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
          >
            {{ $t('cart.clear_cart') }}
          </button>
        </div>

        <!-- Order Summary -->
        <div class="lg:col-span-1">
          <div class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm">
            <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4">{{ $t('cart.total') }}</h2>
            
            <!-- Items Count -->
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {{ cartItems.length }} {{ $t('cart.total_items') }}
            </div>

            <!-- Subtotal -->
            <div class="flex justify-between py-2 border-t dark:border-gray-800">
              <span class="text-gray-600 dark:text-gray-400">{{ $t('cart.subtotal') }}</span>
              <span class="font-medium text-gray-900 dark:text-white">{{ formatPrice(subtotal) }} {{ $t('currency') }}</span>
            </div>

            <!-- Shipping -->
            <div class="flex justify-between py-2 border-t dark:border-gray-800">
              <span class="text-gray-600 dark:text-gray-400">{{ $t('cart.shipping') }}</span>
              <span class="text-green-500 dark:text-green-400">{{ $t('cart.free') }}</span>
            </div>

            <!-- Total -->
            <div class="flex justify-between py-2 border-t border-b dark:border-gray-800">
              <span class="font-medium text-gray-900 dark:text-white">{{ $t('cart.total') }}</span>
              <span class="font-bold text-gray-900 dark:text-white">{{ formatPrice(total) }} {{ $t('currency') }}</span>
            </div>

            <!-- Checkout Button -->
            <button 
              @click="checkout"
              class="w-full mt-6 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors dark:bg-purple-500 dark:hover:bg-purple-600"
            >
              {{ $t('cart.checkout') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Similar Products -->
      <div class="mt-2">
        <h2 class="text-2xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent dark:text-white">
          {{ $t('cart.similar_products') }}
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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Banner from './../components/Banner.vue'
import ProductCard from '@/components/ProductCard.vue'

const router = useRouter()

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

const updateQuantity = (item, quantity) => {
  item.quantity += quantity
  if (item.quantity < 1) {
    item.quantity = 1
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

const checkout = () => {
  router.push({ name: 'checkout' })
}
</script>
