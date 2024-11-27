<template>
  <div class="w-full">
    <!-- Mobile menu button and logo (always visible on mobile) -->
    <div class="lg:hidden flex items-center justify-between w-full px-4 py-3 border-b">
      <button 
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="text-gray-600 hover:text-purple-600 transition-colors"
      >
        <i class="fas fa-bars text-xl"></i>
      </button>
      <a href="/" class="text-xl font-bold text-gray-900 tracking-wider">
        TURBO<span class="text-purple-600">MARKET</span>
      </a>
      <a href="#" class="text-gray-600 hover:text-purple-600 transition-colors">
        <i class="fas fa-shopping-cart text-xl"></i>
      </a>
    </div>

    <!-- Mobile menu (hidden by default) -->
    <div 
      v-if="isMobileMenuOpen" 
      class="lg:hidden fixed inset-0 z-50 bg-white"
    >
      <!-- Mobile menu header -->
      <div class="flex items-center justify-between px-4 py-3 border-b">
        <button 
          @click="isMobileMenuOpen = false"
          class="text-gray-600 hover:text-purple-600 transition-colors"
        >
          <i class="fas fa-times text-xl"></i>
        </button>
        <span class="text-lg font-medium">Katalog</span>
        <div class="w-8"></div>
      </div>

      <!-- Mobile menu content -->
      <div class="overflow-y-auto h-[calc(100vh-56px)]">
        <!-- User actions -->
        <div class="px-4 py-3 border-b">
          <div class="flex items-center space-x-3">
            <i class="fas fa-user-circle text-3xl text-gray-400"></i>
            <div>
              <a href="#" class="text-purple-600 font-medium">Kirish</a>
              <p class="text-sm text-gray-500">Shaxsiy kabinet</p>
            </div>
          </div>
        </div>

        <!-- Main menu items -->
        <div class="py-2">
          <a 
            v-for="category in categories" 
            :key="category"
            href="#" 
            class="flex items-center justify-between px-4 py-3 hover:bg-gray-50"
          >
            <span class="text-gray-700">{{ category }}</span>
            <i class="fas fa-chevron-right text-sm text-gray-400"></i>
          </a>
        </div>

        <!-- Additional links -->
        <div class="border-t py-2">
          <a 
            v-for="(link, index) in additionalLinks" 
            :key="index"
            href="#" 
            class="flex items-center px-4 py-3 hover:bg-gray-50"
          >
            <i :class="link.icon + ' w-6 text-gray-400'"></i>
            <span class="ml-3 text-gray-700">{{ link.text }}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Desktop menu (hidden on mobile) -->
    <div class="hidden lg:block">
      <!-- Top info bar -->
      <div>
        <div class="w-full px-4 py-2">
          <div class="flex items-center justify-between text-gray-600 text-sm">
            <div class="flex items-center space-x-4">
              <a href="#" class="hover:text-purple-600 transition-colors duration-200">
                <i class="fas fa-map-marker-alt mr-1"></i> Shahar: Toshkent
              </a>
              <a href="#" class="hover:text-purple-600 transition-colors duration-200">
                <i class="fas fa-truck mr-1"></i> Yetkazib berish
              </a>
            </div>
            <div class="flex items-center space-x-4">
              <a href="#" class="hover:text-purple-600 transition-colors duration-200">Savol-javoblar</a>
              <a href="#" class="hover:text-purple-600 transition-colors duration-200">Buyurtmalarim</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Main navbar -->
      <div class="w-full px-4 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <a href="/" class="text-2xl font-bold text-gray-900 tracking-wider">
            TURBO<span class="text-purple-600">MARKET</span>
          </a>

          <!-- Catalog button -->
          <button class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2">
            <i class="fas fa-bars"></i>
            <span>Katalog</span>
          </button>

          <!-- Search -->
          <div class="flex-1 max-w-2xl mx-8">
            <div class="relative">
              <input 
                type="text" 
                placeholder="Mahsulotlarni qidirish..." 
                class="w-full py-2 pl-4 pr-10 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-200 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200"
              >
              <button class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors duration-200">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center space-x-6">
            <a href="#" class="relative group">
              <i class="fas fa-heart text-2xl text-gray-400 group-hover:text-purple-600 transition-colors duration-200"></i>
              <span class="absolute -top-2 -right-2 w-5 h-5 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            </a>
            <a href="#" class="relative group">
              <i class="fas fa-shopping-cart text-2xl text-gray-400 group-hover:text-purple-600 transition-colors duration-200"></i>
              <span class="absolute -top-2 -right-2 w-5 h-5 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            </a>
            <a href="#" class="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200">
              <i class="fas fa-user text-2xl"></i>
              <span>Kirish</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Categories navbar -->
      <div>
        <div class="w-full px-4">
          <ul class="flex items-center space-x-8 text-gray-600 overflow-x-auto whitespace-nowrap py-3 scrollbar-hide">
            <li v-for="category in categories" :key="category" class="relative group">
              <a href="#" class="hover:text-purple-600 transition-colors duration-200">{{ category }}</a>
              <div class="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const categories = [
  'Elektronika',
  'Kiyim',
  'Poyabzal',
  'Aksessuarlar',
  'Sport',
  'Go\'zallik',
  'Uy-ro\'zg\'or',
  'Avtotovarlar'
]

const additionalLinks = [
  { icon: 'fas fa-truck', text: 'Buyurtmalarim' },
  { icon: 'fas fa-heart', text: 'Sevimlilar' },
  { icon: 'fas fa-map-marker-alt', text: 'Shahar: Toshkent' },
  { icon: 'fas fa-percent', text: 'Aksiyalar' },
  { icon: 'fas fa-truck', text: 'Yetkazib berish' },
  { icon: 'fas fa-question-circle', text: 'Savol-javoblar' }
]

import { ref } from 'vue'
const isMobileMenuOpen = ref(false)
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
