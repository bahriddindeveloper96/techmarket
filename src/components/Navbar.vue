<template>
  <div class="w-full">
    <!-- Mobile menu button and logo (always visible on mobile) -->
    <div class="lg:hidden flex items-center justify-between w-full px-4 py-3 bg-black text-white">
      <button 
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="text-white hover:text-[#00BD7E] transition-colors duration-300"
      >
        <i class="fas fa-bars text-xl"></i>
      </button>
      <a href="/" class="text-xl font-bold tracking-wider">
        TURBO<span class="text-[#00BD7E]">MARKET</span>
      </a>
      <a href="#" class="text-white hover:text-[#00BD7E] transition-colors duration-300">
        <i class="fas fa-shopping-cart text-xl"></i>
      </a>
    </div>

    <!-- Mobile menu (hidden by default) -->
    <div 
      v-if="isMobileMenuOpen" 
      class="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
    >
      <!-- Mobile menu content -->
      <div class="fixed inset-y-0 left-0 w-[280px] bg-white overflow-hidden shadow-2xl">
        <!-- Mobile menu header -->
        <div class="flex items-center justify-between px-4 py-3 bg-black text-white">
          <button 
            @click="isMobileMenuOpen = false"
            class="text-white hover:text-[#00BD7E] transition-colors duration-300"
          >
            <i class="fas fa-times text-xl"></i>
          </button>
          <span class="text-lg font-medium tracking-wide">Katalog</span>
          <div class="w-8"></div>
        </div>

        <!-- Mobile menu content -->
        <div class="overflow-y-auto h-[calc(100vh-56px)]">
          <!-- User actions -->
          <div class="px-4 py-3 bg-gray-50">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-[#00BD7E] flex items-center justify-center text-white">
                <i class="fas fa-user-circle text-xl"></i>
              </div>
              <div>
                <a href="#" class="text-[#00BD7E] font-semibold text-lg">Kirish</a>
                <p class="text-sm text-gray-600">Shaxsiy kabinet</p>
              </div>
            </div>
          </div>

          <!-- Main menu items -->
          <div class="py-2">
            <a 
              v-for="category in categories" 
              :key="category"
              href="#" 
              class="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors duration-300 group"
            >
              <span class="text-gray-700 group-hover:text-[#00BD7E] font-medium">{{ category }}</span>
              <i class="fas fa-chevron-right text-sm text-gray-400 group-hover:text-[#00BD7E] transition-colors duration-300"></i>
            </a>
          </div>

          <!-- Additional links -->
          <div class="border-t border-gray-100 py-2">
            <a 
              v-for="(link, index) in additionalLinks" 
              :key="index"
              href="#" 
              class="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors duration-300 group"
            >
              <i :class="[link.icon, 'w-6 text-gray-400 group-hover:text-[#00BD7E]']"></i>
              <span class="ml-3 text-gray-700 group-hover:text-[#00BD7E] font-medium">{{ link.text }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Desktop menu (hidden on mobile) -->
    <div class="hidden lg:block">
      <!-- Top info bar -->
      <div class="bg-gray-50">
        <div class="w-full px-4 py-2">
          <div class="flex items-center justify-between text-gray-600 text-sm">
            <div class="flex items-center space-x-4">
              <a href="#" class="hover:text-[#00BD7E] transition-colors duration-300">
                <i class="fas fa-map-marker-alt mr-1"></i> Shahar: Toshkent
              </a>
              <a href="#" class="hover:text-[#00BD7E] transition-colors duration-300">
                <i class="fas fa-truck mr-1"></i> Yetkazib berish
              </a>
            </div>
            <div class="flex items-center space-x-4">
              <a href="#" class="hover:text-[#00BD7E] transition-colors duration-300">Savol-javoblar</a>
              <a href="#" class="hover:text-[#00BD7E] transition-colors duration-300">Buyurtmalarim</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Main navbar -->
      <div class="w-full px-4 py-4 bg-white shadow-sm">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <a href="/" class="text-2xl font-bold tracking-wider">
            TURBO<span class="text-[#00BD7E]">MARKET</span>
          </a>

          <!-- CatalogMenu component -->
          <CatalogMenu ref="catalogMenu" />

          <!-- Search -->
          <div class="flex-1 max-w-2xl mx-8">
            <div class="relative group">
              <input 
                type="text" 
                placeholder="Mahsulotlarni qidirish..." 
                class="w-full py-2.5 pl-4 pr-10 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-200 focus:outline-none focus:border-[#00BD7E] focus:ring-2 focus:ring-[#00BD7E]/10 transition-all duration-300"
              >
              <button class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00BD7E] transition-colors duration-300">
                <i class="fas fa-search text-lg"></i>
              </button>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center space-x-8">
            <a href="#" class="relative group">
              <i class="fas fa-heart text-2xl text-gray-400 group-hover:text-[#00BD7E] transition-colors duration-300"></i>
              <span class="absolute -top-2 -right-2 w-5 h-5 bg-[#00BD7E] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg shadow-[#00BD7E]/10">3</span>
            </a>
            <a href="#" class="relative group">
              <i class="fas fa-shopping-cart text-2xl text-gray-400 group-hover:text-[#00BD7E] transition-colors duration-300"></i>
              <span class="absolute -top-2 -right-2 w-5 h-5 bg-[#00BD7E] text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg shadow-[#00BD7E]/10">2</span>
            </a>
            <a href="#" class="flex items-center space-x-2 text-gray-600 hover:text-[#00BD7E] transition-colors duration-300">
              <i class="fas fa-user text-2xl"></i>
              <span class="font-medium">Kirish</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Categories navbar -->
      <div class="border-b border-gray-100">
        <div class="w-full px-4">
          <ul class="flex items-center space-x-8 text-gray-600 overflow-x-auto whitespace-nowrap py-3 scrollbar-hide">
            <li v-for="category in categories" :key="category" class="relative group">
              <a href="#" class="font-medium hover:text-[#00BD7E] transition-colors duration-300">{{ category }}</a>
              <div class="absolute bottom-0 left-0 w-full h-0.5 bg-[#00BD7E] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CatalogMenu from './CatalogMenu.vue'

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

const isMobileMenuOpen = ref(false)

const catalogMenu = ref(null)

function openCatalog() {
  catalogMenu.value.open()
}
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
