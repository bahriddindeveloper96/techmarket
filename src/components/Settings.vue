<template>
  <div class="settings-container">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Sozlamalar</h2>

    <!-- Settings Sections -->
    <div class="space-y-6">
      <!-- Account Settings -->
      <div class="bg-white rounded-2xl p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Akkaunt</h3>
        <div class="space-y-4">
          <!-- Language -->
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-medium text-gray-800">Til</h4>
              <p class="text-sm text-gray-500">Interfeys tili</p>
            </div>
            <select class="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
              <option value="uz">O'zbek</option>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </div>

          <!-- Theme -->
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-medium text-gray-800">Mavzu</h4>
              <p class="text-sm text-gray-500">Interfeys ko'rinishi</p>
            </div>
            <div class="flex items-center space-x-2">
              <button class="w-10 h-10 rounded-xl bg-white border-2 border-primary-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </button>
              <button class="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Currency -->
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-medium text-gray-800">Valyuta</h4>
              <p class="text-sm text-gray-500">Narxlarni ko'rsatish</p>
            </div>
            <select class="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
              <option value="uzs">UZS</option>
              <option value="usd">USD</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div class="bg-white rounded-2xl p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Bildirishnomalar</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-medium text-gray-800">Email xabarnomalar</h4>
              <p class="text-sm text-gray-500">Yangiliklar va aksiyalar haqida</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer" checked>
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-medium text-gray-800">SMS xabarnomalar</h4>
              <p class="text-sm text-gray-500">Buyurtma holati haqida</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer" checked>
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Privacy & Security -->
      <div class="bg-white rounded-2xl p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Maxfiylik va xavfsizlik</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-medium text-gray-800">Ikki bosqichli autentifikatsiya</h4>
              <p class="text-sm text-gray-500">Qo'shimcha xavfsizlik uchun</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <button class="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-xl transition-colors">
            Akkauntni o'chirish
          </button>
        </div>
      </div>

      <!-- Save Changes -->
      <div class="flex justify-end">
        <button class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          O'zgarishlarni saqlash
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const settings = ref({
  language: 'uz',
  theme: 'light',
  currency: 'uzs',
  notifications: {
    email: true,
    sms: true,
  },
  security: {
    twoFactor: false
  }
})
</script>
