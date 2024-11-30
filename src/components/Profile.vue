<template>
  <div class="min-h-screen bg-gray-50">
    <Banner />
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="container mx-auto px-4 py-4">
        <h1 class="text-xl font-semibold text-gray-900">{{ $t('profile.title') }}</h1>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-6">
      <!-- Desktop Version -->
      <div class="hidden md:grid grid-cols-12 gap-8">
        <!-- Desktop Sidebar -->
        <div class="col-span-3">
          <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <div class="flex flex-col items-center space-y-4">
              <div class="w-24 h-24 rounded-full overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=John+Doe&background=6466f1&color=fff" alt="Profile" class="w-full h-full object-cover">
              </div>
              <div class="text-center">
                <button @click="activeTab = 'personal'" class="text-lg font-semibold text-gray-900 hover:text-primary-600">{{ $t('profile.personal_info') }}</button>
                <p class="text-sm text-gray-500">+998 90 123 45 67</p>
              </div>
              <div class="w-full pt-4 border-t">
                <nav class="space-y-2">
                  <button @click="activeTab = 'personal'" 
                    :class="[
                      'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors',
                      activeTab === 'personal' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50 text-gray-700'
                    ]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span class="font-medium">{{ $t('profile.personal_info') }}</span>
                  </button>

                  <button @click="activeTab = 'orders'"
                    :class="[
                      'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors',
                      activeTab === 'orders' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50 text-gray-700'
                    ]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span class="font-medium">{{ $t('profile.orders') }}</span>
                  </button>

                  <a href="#" class="flex items-center space-x-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{{ $t('profile.favorites') }}</span>
                  </a>

                  <button @click="activeTab = 'settings'" 
                    :class="[
                      'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors',
                      activeTab === 'settings' ? 'bg-primary-50 text-primary-600' : 'hover:bg-gray-50 text-gray-700'
                    ]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span class="font-medium">{{ $t('profile.settings') }}</span>
                  </button>

                  <a href="#" class="flex items-center space-x-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{{ $t('profile.settings') }}</span>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop Main Content -->
        <div class="col-span-9">
          <div class="bg-white rounded-2xl shadow-lg p-6">
            <div v-if="activeTab === 'orders'">
              <OrdersView />
            </div>
            <div v-else-if="activeTab === 'settings'">
              <Settings />
            </div>
            <div v-else>
              <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ $t('profile.personal_info') }}</h2>
              
              <!-- Form Grid -->
              <div class="grid grid-cols-2 gap-6">
                <!-- First Name -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">{{ $t('profile.first_name') }}</label>
                  <input 
                    v-model="userData.firstName"
                    type="text" 
                    class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" 
                    :placeholder="$t('profile.placeholders.first_name')" 
                  />
                </div>

                <!-- Last Name -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">{{ $t('profile.last_name') }}</label>
                  <input 
                    v-model="userData.lastName"
                    type="text" 
                    class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" 
                    :placeholder="$t('profile.placeholders.last_name')" 
                  />
                </div>

                <!-- Email -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">{{ $t('profile.email') }}</label>
                  <input 
                    v-model="userData.email"
                    type="email" 
                    class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" 
                    :placeholder="$t('profile.placeholders.email')" 
                  />
                </div>

                <!-- Phone -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">{{ $t('profile.phone') }}</label>
                  <input 
                    v-model="userData.phone"
                    type="tel" 
                    class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" 
                    :placeholder="$t('profile.placeholders.phone')" 
                  />
                </div>

                <!-- Birthday -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">{{ $t('profile.birthday') }}</label>
                  <input 
                    v-model="userData.birthday"
                    type="date" 
                    class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" 
                  />
                </div>

                <!-- Gender -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">{{ $t('profile.gender') }}</label>
                  <select 
                    v-model="userData.gender"
                    class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="">{{ $t('profile.select') }}</option>
                    <option value="male">{{ $t('profile.male') }}</option>
                    <option value="female">{{ $t('profile.female') }}</option>
                  </select>
                </div>

                <!-- Address -->
                <div class="col-span-2 space-y-2">
                  <label class="block text-sm font-medium text-gray-700">{{ $t('profile.address') }}</label>
                  <textarea 
                    v-model="userData.address"
                    class="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" 
                    rows="3" 
                    :placeholder="$t('profile.placeholders.address')"
                  ></textarea>
                </div>

                <!-- Save Button -->
                <div class="col-span-2 flex justify-end">
                  <button 
                    @click="saveUserData"
                    class="px-6 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors"
                  >
                    {{ $t('profile.save') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Version -->
      <div class="md:hidden">
        <div class="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 rounded-full overflow-hidden">
              <img src="https://ui-avatars.com/api/?name=John+Doe&background=6466f1&color=fff" alt="Profile" class="w-full h-full object-cover">
            </div>
            <div>
              <button @click="activeTab = 'personal'" class="text-lg font-semibold text-gray-900">{{ $t('profile.personal_info') }}</button>
              <p class="text-sm text-gray-500">+998 90 123 45 67</p>
            </div>
          </div>
        </div>

        <!-- Menu Items -->
        <div class="space-y-4">
          <!-- Orders -->
          <router-link to="/orders" class="block bg-white rounded-2xl shadow-sm">
            <div class="p-4 flex items-center">
              <div class="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                <i class="ri-file-list-3-line text-xl"></i>
              </div>
              <span class="ml-4 text-gray-900 font-medium">{{ $t('profile.orders') }}</span>
              <i class="ri-arrow-right-s-line text-xl text-gray-400 ml-auto"></i>
            </div>
          </router-link>

          <!-- Favorites -->
          <a href="#" class="block bg-white rounded-2xl shadow-sm">
            <div class="p-4 flex items-center">
              <div class="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                <i class="ri-heart-3-line text-xl"></i>
              </div>
              <span class="ml-4 text-gray-900 font-medium">{{ $t('profile.favorites') }}</span>
              <i class="ri-arrow-right-s-line text-xl text-gray-400 ml-auto"></i>
            </div>
          </a>

          <!-- Settings -->
          <router-link to="/settings" class="block bg-white rounded-2xl shadow-sm">
            <div class="p-4 flex items-center">
              <div class="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                <i class="ri-settings-3-line text-xl"></i>
              </div>
              <span class="ml-4 text-gray-900 font-medium">{{ $t('profile.settings') }}</span>
              <i class="ri-arrow-right-s-line text-xl text-gray-400 ml-auto"></i>
            </div>
          </router-link>

          <!-- Help Center -->
          <a href="#" class="block bg-white rounded-2xl shadow-sm">
            <div class="p-4 flex items-center">
              <div class="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                <i class="ri-question-line text-xl"></i>
              </div>
              <span class="ml-4 text-gray-900 font-medium">{{ $t('profile.help') }}</span>
              <i class="ri-arrow-right-s-line text-xl text-gray-400 ml-auto"></i>
            </div>
          </a>

          <!-- Logout -->
          <button class="w-full bg-white rounded-2xl shadow-sm">
            <div class="p-4 flex items-center">
              <div class="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <i class="ri-logout-box-r-line text-xl"></i>
              </div>
              <span class="ml-4 text-red-600 font-medium">{{ $t('profile.logout') }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Banner from './../components/Banner.vue'
import OrdersView from './../views/OrdersView.vue'
import Settings from './../components/Settings.vue'

// State
const activeTab = ref('orders')
const searchQuery = ref('')
const statusFilter = ref('')
const dateFilter = ref('all')
const userData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthday: '',
  gender: '',
  address: ''
})

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
        image: '/images/products/iphone.jpg'
      },
      {
        id: 2,
        name: 'AirPods Pro',
        quantity: 1,
        price: 1000000,
        image: '/images/products/airpods.jpg'
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
        image: '/images/products/macbook.jpg'
      }
    ]
  }
])

// Computed
const filteredOrders = ref([])

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

const saveUserData = () => {
  console.log(userData.value)
}
</script>
