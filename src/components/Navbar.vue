<template>
  <nav class="bg-white shadow-lg">
    <!-- Top bar - Desktop only -->
    <div class="hidden md:block bg-gray-100">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-10 text-sm">
          <div class="flex items-center space-x-4">
            <a href="#" class="text-gray-600 hover:text-primary-600">Kompaniya haqida</a>
            <a href="#" class="text-gray-600 hover:text-primary-600">Kontaktlar</a>
          </div>
          <div class="flex items-center space-x-4">
            <a href="#" class="text-gray-600 hover:text-primary-600">Do'konlar</a>
            <a href="#" class="text-gray-600 hover:text-primary-600">Yetkazib berish</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main navbar -->
    <div class="container mx-auto px-4">
      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center justify-between h-20">
        <div class="flex items-center space-x-4">
          <!-- Logo -->
          <a href="/" class="flex items-center space-x-2">
            <span class="text-2xl font-bold text-primary-600">Tech</span>
            <span class="text-2xl font-bold text-accent-600">Market</span>
          </a>
          <!-- Catalog Menu -->
          <CatalogMenu />
        </div>

        <!-- Search -->
        <div class="flex-1 max-w-2xl mx-8">
          <div class="relative">
            <input
              type="text"
              placeholder="Mahsulotlarni qidirish..."
              class="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
            />
            <button class="absolute right-3 top-1/2 -translate-y-1/2">
              <i class="fas fa-search text-gray-400"></i>
            </button>
          </div>
        </div>

        <!-- Right menu -->
        <div class="flex items-center space-x-6">
          <a href="#" class="flex items-center space-x-1 text-gray-700 hover:text-primary-600">
            <i class="fas fa-heart text-xl"></i>
            <span>Sevimlilar</span>
          </a>
          <a href="#" class="flex items-center space-x-1 text-gray-700 hover:text-primary-600">
            <i class="fas fa-user text-xl"></i>
            <span>Profil</span>
          </a>
          <a href="#" class="flex items-center space-x-1 text-gray-700 hover:text-primary-600">
            <i class="fas fa-shopping-cart text-xl"></i>
            <span>Savatcha</span>
          </a>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div class="md:hidden">
        <!-- Top Section -->
        <div class="flex items-center justify-between py-4">
          <!-- Logo -->
          <a href="/" class="flex items-center space-x-1">
            <span class="text-xl font-bold text-primary-600">Tech</span>
            <span class="text-xl font-bold text-accent-600">Market</span>
          </a>
          
          <!-- Search Button -->
          <button 
            @click="isSearchOpen = !isSearchOpen"
            class="p-2 text-gray-700 hover:text-primary-600"
          >
            <i class="fas fa-search text-xl"></i>
          </button>
        </div>

        <!-- Search Bar (Collapsible) -->
        <div 
          v-show="isSearchOpen"
          class="pb-4"
        >
          <div class="relative">
            <input
              type="text"
              placeholder="Mahsulotlarni qidirish..."
              class="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
            />
            <button class="absolute right-3 top-1/2 -translate-y-1/2">
              <i class="fas fa-search text-gray-400"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Desktop Bottom menu -->
      <div class="hidden md:flex items-center space-x-8 py-4">
        <nav class="flex items-center space-x-6">
          <a href="#" class="text-gray-700 hover:text-primary-600">Yangi</a>
          <a href="#" class="text-gray-700 hover:text-primary-600">Chegirmalar</a>
          <a href="#" class="text-gray-700 hover:text-primary-600">Xit savdo</a>
          <a href="#" class="text-gray-700 hover:text-primary-600">Aksiyalar</a>
        </nav>
      </div>
    </div>

    <!-- Mobile Bottom Navigation Bar -->
    <div class="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg md:hidden h-[72px] z-50">
      <div class="grid grid-cols-5 gap-0.5 h-full">
        <a href="#" class="group relative flex flex-col items-center justify-center">
          <div class="absolute -top-5 left-1/2 -translate-x-1/2 w-11 h-11 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-md transform transition-all duration-300 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100">
            <i class="fas fa-store text-white text-lg"></i>
          </div>
          <i class="fas fa-store text-xl mb-1 text-gray-600 group-hover:text-primary-600 transition-colors duration-300"></i>
          <span class="text-[10px] font-medium text-gray-600 group-hover:text-primary-600 transition-colors duration-300">Bosh sahifa</span>
        </a>
        <a href="#" class="group relative flex flex-col items-center justify-center">
          <div class="absolute -top-5 left-1/2 -translate-x-1/2 w-11 h-11 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-md transform transition-all duration-300 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100">
            <i class="fas fa-compass text-white text-lg"></i>
          </div>
          <i class="fas fa-compass text-xl mb-1 text-gray-600 group-hover:text-primary-600 transition-colors duration-300"></i>
          <span class="text-[10px] font-medium text-gray-600 group-hover:text-primary-600 transition-colors duration-300">Katalog</span>
        </a>
        <a href="#" class="group relative flex flex-col items-center justify-center">
          <div class="absolute -top-5 left-1/2 -translate-x-1/2 w-11 h-11 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-md transform transition-all duration-300 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100">
            <i class="fas fa-sparkles text-white text-lg"></i>
          </div>
          <i class="fas fa-sparkles text-xl mb-1 text-gray-600 group-hover:text-primary-600 transition-colors duration-300"></i>
          <span class="text-[10px] font-medium text-gray-600 group-hover:text-primary-600 transition-colors duration-300">Sevimlilar</span>
        </a>
        <a href="#" class="group relative flex flex-col items-center justify-center">
          <div class="absolute -top-5 left-1/2 -translate-x-1/2 w-11 h-11 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-md transform transition-all duration-300 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100">
            <i class="fas fa-bag-shopping text-white text-lg"></i>
          </div>
          <i class="fas fa-bag-shopping text-xl mb-1 text-gray-600 group-hover:text-primary-600 transition-colors duration-300"></i>
          <span class="text-[10px] font-medium text-gray-600 group-hover:text-primary-600 transition-colors duration-300">Savatcha</span>
        </a>
        <a href="#" class="group relative flex flex-col items-center justify-center">
          <div class="absolute -top-5 left-1/2 -translate-x-1/2 w-11 h-11 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-md transform transition-all duration-300 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100">
            <i class="fas fa-circle-user text-white text-lg"></i>
          </div>
          <i class="fas fa-circle-user text-xl mb-1 text-gray-600 group-hover:text-primary-600 transition-colors duration-300"></i>
          <span class="text-[10px] font-medium text-gray-600 group-hover:text-primary-600 transition-colors duration-300">Profil</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import CatalogMenu from './CatalogMenu.vue'

const isSearchOpen = ref(false)
</script>

<style scoped>
/* Add padding to the main content to prevent overlap with fixed bottom nav on mobile */
@media (max-width: 768px) {
  :root {
    padding-bottom: 4rem;
  }
}
</style>