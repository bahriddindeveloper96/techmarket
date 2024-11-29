<template>
  <div class="min-h-screen bg-white">
    <!-- Orders Header -->
    <div class="mb-6">
      <h2 class="text-2xl font-semibold text-gray-900">Mening buyurtmalarim</h2>
      <p class="text-gray-500">Barcha buyurtmalaringizni kuzatib boring</p>
    </div>

    <!-- Orders Filters -->
    <div class="mb-6">
      <div class="flex flex-wrap items-center gap-4">
        <!-- Search -->
        <div class="flex-grow max-w-md">
          <div class="relative">
            <input 
              type="text" 
              v-model="searchQuery"
              class="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Buyurtma raqami yoki mahsulot nomi"
            >
            <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <!-- Status Filter -->
        <div class="relative">
          <select 
            v-model="statusFilter"
            class="appearance-none pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Barcha holatlar</option>
            <option value="pending">Kutilmoqda</option>
            <option value="processing">Jarayonda</option>
            <option value="shipped">Yetkazilmoqda</option>
            <option value="delivered">Yetkazildi</option>
            <option value="cancelled">Bekor qilindi</option>
          </select>
          <i class="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
        </div>

        <!-- Date Filter -->
        <div class="relative">
          <select 
            v-model="dateFilter"
            class="appearance-none pl-4 pr-10 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">Barcha vaqt</option>
            <option value="today">Bugun</option>
            <option value="week">Shu hafta</option>
            <option value="month">Shu oy</option>
          </select>
          <i class="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
        </div>
      </div>
    </div>

    <!-- Orders List -->
    <div class="space-y-4">
      <div v-for="order in filteredOrders" :key="order.id" class="bg-gray-50 rounded-2xl p-4">
        <!-- Order Header -->
        <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <p class="text-sm text-gray-500">Buyurtma raqami: <span class="font-medium text-gray-900">#{{ order.number }}</span></p>
            <p class="text-sm text-gray-500">Sana: <span class="font-medium text-gray-900">{{ formatDate(order.date) }}</span></p>
          </div>
          <div :class="getStatusClass(order.status)" class="px-3 py-1 rounded-full text-sm font-medium">
            {{ getStatusText(order.status) }}
          </div>
        </div>

        <!-- Order Items -->
        <div class="space-y-4">
          <div v-for="item in order.items" :key="item.id" class="flex items-center gap-4 bg-white p-4 rounded-xl">
            <div class="w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
              <img :src="item.image" :alt="item.name" class="w-full h-full object-cover">
            </div>
            <div class="flex-grow">
              <h3 class="font-medium text-gray-900">{{ item.name }}</h3>
              <p class="text-sm text-gray-500">{{ item.quantity }} × {{ formatPrice(item.price) }}</p>
            </div>
            <div class="text-right">
              <p class="font-medium text-gray-900">{{ formatPrice(item.price * item.quantity) }}</p>
            </div>
          </div>
        </div>

        <!-- Order Footer -->
        <div class="mt-4 pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p class="text-sm text-gray-500">Jami: <span class="font-medium text-gray-900">{{ formatPrice(order.total) }}</span></p>
            <p class="text-sm text-gray-500">To'lov usuli: <span class="font-medium text-gray-900">{{ order.paymentMethod }}</span></p>
          </div>
          <div class="flex items-center gap-3">
            <button class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors">
              Buyurtmani kuzatish
            </button>
            <button class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors">
              Qayta buyurtma berish
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredOrders.length === 0" class="text-center py-12">
      <div class="w-20 h-20 mx-auto mb-4 text-gray-400">
        <i class="ri-shopping-bag-line text-5xl"></i>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Buyurtmalar yo'q</h3>
      <p class="text-gray-500 mb-6">Siz hali hech qanday buyurtma bermagansiz</p>
      <router-link to="/" class="inline-flex items-center px-6 py-3 text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors">
        Xarid qilishni boshlash
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// State
const searchQuery = ref('')
const statusFilter = ref('')
const dateFilter = ref('all')

// Mock data
const orders = ref([
  {
    id: 1,
    number: '1234',
    date: '2024-01-15',
    status: 'processing',
    total: 2500000,
    paymentMethod: 'Click',
    items: [
      {
        id: 1,
        name: 'iPhone 13 Pro',
        quantity: 1,
        price: 1500000,
        image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-max-gold-select?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1631652956000'
      },
      {
        id: 2,
        name: 'AirPods Pro',
        quantity: 1,
        price: 1000000,
        image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1660803972361'
      }
    ]
  },
  {
    id: 2,
    number: '1235',
    date: '2024-01-14',
    status: 'delivered',
    total: 3500000,
    paymentMethod: 'Payme',
    items: [
      {
        id: 3,
        name: 'MacBook Air M2',
        quantity: 1,
        price: 3500000,
        image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-midnight-select-20220606?wid=452&hei=420&fmt=jpeg&qlt=95&.v=1653084303665'
      }
    ]
  }
])

// Computed
const filteredOrders = computed(() => {
  let result = orders.value

  if (searchQuery.value) {
    result = result.filter(order => 
      order.number.includes(searchQuery.value) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
    )
  }

  if (statusFilter.value) {
    result = result.filter(order => order.status === statusFilter.value)
  }

  if (dateFilter.value !== 'all') {
    const now = new Date()
    
    switch(dateFilter.value) {
      case 'today':
        result = result.filter(order => 
          new Date(order.date).toDateString() === now.toDateString()
        )
        break
      case 'week':
        const weekAgo = new Date(now.setDate(now.getDate() - 7))
        result = result.filter(order => 
          new Date(order.date) >= weekAgo
        )
        break
      case 'month':
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1))
        result = result.filter(order => 
          new Date(order.date) >= monthAgo
        )
        break
    }
  }

  return result
})

// Utility functions
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('uz-UZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ', {
    style: 'currency',
    currency: 'UZS'
  }).format(price)
}

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-50 text-yellow-700',
    processing: 'bg-blue-50 text-blue-700',
    shipped: 'bg-purple-50 text-purple-700',
    delivered: 'bg-green-50 text-green-700',
    cancelled: 'bg-red-50 text-red-700'
  }
  return classes[status] || 'bg-gray-50 text-gray-700'
}

const getStatusText = (status) => {
  const statusTexts = {
    pending: 'Kutilmoqda',
    processing: 'Jarayonda',
    shipped: 'Yetkazilmoqda',
    delivered: 'Yetkazildi',
    cancelled: 'Bekor qilindi'
  }
  return statusTexts[status] || status
}

const getImageUrl = (image) => {
  return new URL(`../assets/images/products/${image}`, import.meta.url).href
}
</script>
