<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <!-- Orders Header -->
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ $t('orders.title') }}</h1>
    </div>

    <!-- Orders Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Search -->
        <div class="relative">
          <span class="absolute inset-y-0 left-3 flex items-center text-gray-400 dark:text-gray-500">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('orders.filters.search')"
            class="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:text-white dark:placeholder-gray-400"
          >
        </div>

        <!-- Status Filter -->
        <div class="relative">
          <select
            v-model="statusFilter"
            class="appearance-none pl-4 pr-10 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:text-white"
          >
            <option value="">{{ $t('orders.filters.status.all') }}</option>
            <option value="pending">{{ $t('orders.filters.status.pending') }}</option>
            <option value="processing">{{ $t('orders.filters.status.processing') }}</option>
            <option value="shipped">{{ $t('orders.filters.status.shipped') }}</option>
            <option value="delivered">{{ $t('orders.filters.status.delivered') }}</option>
            <option value="cancelled">{{ $t('orders.filters.status.cancelled') }}</option>
          </select>
          <span class="absolute inset-y-0 right-3 flex items-center text-gray-400 dark:text-gray-500 pointer-events-none">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>

        <!-- Period Filter -->
        <div class="relative">
          <select
            v-model="periodFilter"
            class="appearance-none pl-4 pr-10 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:text-white"
          >
            <option value="">{{ $t('orders.filters.period.all') }}</option>
            <option value="today">{{ $t('orders.filters.period.today') }}</option>
            <option value="week">{{ $t('orders.filters.period.week') }}</option>
            <option value="month">{{ $t('orders.filters.period.month') }}</option>
          </select>
          <span class="absolute inset-y-0 right-3 flex items-center text-gray-400 dark:text-gray-500 pointer-events-none">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </div>
      </div>
    </div>

    <!-- Orders List -->
    <div class="space-y-4">
      <div v-for="order in filteredOrders" :key="order.id" class="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4">
        <!-- Order Header -->
        <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div class="space-y-1">
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('orders.order.number') }}: <span class="font-medium text-gray-900 dark:text-white">#{{ order.number }}</span></p>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('orders.order.date') }}: <span class="font-medium text-gray-900 dark:text-white">{{ formatDate(order.date) }}</span></p>
          </div>
          <div :class="getStatusClass(order.status)" class="px-3 py-1 rounded-full text-sm font-medium">
            {{ $t(`orders.filters.status.${order.status}`) }}
          </div>
        </div>

        <!-- Order Items -->
        <div class="space-y-2">
          <div v-for="item in order.items" :key="item.id" class="flex items-center gap-4 bg-white dark:bg-gray-700 p-4 rounded-xl">
            <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-lg">
            <div class="flex-1 min-w-0">
              <h4 class="font-medium text-gray-900 dark:text-white truncate">{{ item.name }}</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ item.quantity }} {{ $t('orders.order.quantity') }} × {{ formatPrice(item.price) }}
              </p>
            </div>
            <div class="text-right">
              <p class="font-medium text-gray-900 dark:text-white">{{ formatPrice(item.price * item.quantity) }}</p>
            </div>
          </div>
        </div>

        <!-- Order Footer -->
        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-4">
          <div class="space-y-1">
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('orders.order.total') }}: <span class="font-medium text-gray-900 dark:text-white">{{ formatPrice(order.total) }}</span></p>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('orders.order.payment_method') }}: <span class="font-medium text-gray-900 dark:text-white">{{ order.paymentMethod }}</span></p>
          </div>
          <button class="px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
            {{ $t('common.details') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredOrders.length === 0" class="text-center py-12">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
        <svg class="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-1">{{ $t('orders.empty.title') }}</h3>
      <p class="text-gray-500 dark:text-gray-400">{{ $t('orders.empty.description') }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// State
const searchQuery = ref('')
const statusFilter = ref('')
const periodFilter = ref('')

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

  if (periodFilter.value !== '') {
    const now = new Date()
    
    switch(periodFilter.value) {
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
