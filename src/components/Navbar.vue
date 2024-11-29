<template>
  <div>
    <!-- Top bar - Desktop only -->
    <div class="hidden md:block bg-gray-100 rounded-b-xl">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-10 text-sm">
          <div class="flex items-center space-x-4">
            <a href="#" class="text-gray-600 hover:text-primary-600">{{ $t('nav.company_info') }}</a>
            <a href="#" class="text-gray-600 hover:text-primary-600">{{ $t('nav.contacts') }}</a>
          </div>
          <div class="flex items-center space-x-4">
            <a href="#" class="text-gray-600 hover:text-primary-600">{{ $t('nav.stores') }}</a>
            <a href="#" class="text-gray-600 hover:text-primary-600">{{ $t('nav.delivery') }}</a>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>

    <!-- Main navbar -->
    <div class="bg-white shadow-sm">
      <div class="container mx-auto px-4 bg-white rounded-2xl shadow-sm my-4">
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
                :placeholder="$t('header.search')"
                class="w-full pl-12 pr-10 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              />
              <span class="absolute left-4 top-1/2 -translate-y-1/2">
                <i class="ri-search-2-line text-lg text-gray-400"></i>
              </span>
            </div>
          </div>

          <!-- Right menu -->
          <div class="flex items-center space-x-8">
            <router-link to="/favorites" class="flex flex-col items-center text-gray-700 hover:text-primary-600 transition-colors">
              <i class="ri-heart-3-line text-2xl"></i>
              <span class="text-xs mt-1">{{ $t('nav.favorites') }}</span>
            </router-link>
            <router-link to="/profile" class="flex flex-col items-center text-gray-700 hover:text-primary-600 transition-colors">
              <i class="ri-user-3-line text-2xl"></i>
              <span class="text-xs mt-1">{{ $t('nav.profile') }}</span>
            </router-link>
            <router-link to="/cart" class="flex flex-col items-center text-gray-700 hover:text-primary-600 transition-colors">
              <div class="relative">
                <i class="ri-shopping-cart-2-line text-2xl"></i>
                <span class="absolute -top-1 -right-2 bg-primary-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">2</span>
              </div>
              <span class="text-xs mt-1">{{ $t('nav.cart') }}</span>
            </router-link>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="md:hidden">
          <!-- Top Section -->
          <div class="flex items-center justify-between p-4">
            <!-- Logo -->
            <a href="/" class="flex items-center space-x-2">
              <span class="text-xl font-bold text-primary-600">Tech</span>
              <span class="text-xl font-bold text-accent-600">Market</span>
            </a>
            
            <!-- Search Button -->
            <button 
              @click="isSearchOpen = !isSearchOpen"
              class="w-10 h-10 flex items-center justify-center text-gray-700 hover:text-primary-600"
            >
              <i class="ri-search-2-line text-2xl"></i>
            </button>
          </div>

          <!-- Search Bar (Collapsible) -->
          <div 
            v-show="isSearchOpen"
            class="px-4 pb-4"
          >
            <div class="relative">
              <input
                type="text"
                :placeholder="$t('header.search')"
                class="w-full h-12 pl-12 pr-4 text-base border border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100"
              />
              <span class="absolute left-4 top-1/2 -translate-y-1/2">
                <i class="ri-search-2-line text-xl text-gray-400"></i>
              </span>
            </div>
          </div>
        </div>

        <!-- Desktop Bottom menu -->
        <div class="hidden md:flex items-center justify-center w-full py-4 bg-white">
          <nav class="flex items-center space-x-8">
            <a href="#" class="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200">
              <i class="ri-flashlight-line"></i>
              <span>{{ $t('nav.new') }}</span>
            </a>
            <a href="#" class="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200">
              <i class="ri-price-tag-3-line"></i>
              <span>{{ $t('nav.sales') }}</span>
            </a>
            <a href="#" class="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200">
              <i class="ri-fire-line"></i>
              <span>{{ $t('nav.hot_deals') }}</span>
            </a>
            <a href="#" class="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200">
              <i class="ri-gift-2-line"></i>
              <span>{{ $t('nav.promotions') }}</span>
            </a>
          </nav>
        </div>
      </div>
    </div>

    <!-- Mobile Bottom Navigation Bar -->
    <div class="fixed bottom-0 left-0 right-0 md:hidden z-50">
      <div class="bg-white shadow-t-lg border-t border-gray-200 rounded-t-xl">
        <div class="grid grid-cols-5 h-16">
          <router-link to="/" class="group relative flex flex-col items-center justify-center py-2">
            <div class="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-md transform transition-all duration-300 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100">
              <i class="ri-store-2-line text-white text-lg"></i>
            </div>
            <i class="ri-store-2-line text-2xl mb-1 text-gray-600 group-hover:text-primary-600 transition-colors duration-300"></i>
            <span class="text-xs font-medium text-gray-600 group-hover:text-primary-600 transition-colors duration-300">{{ $t('nav.home') }}</span>
          </router-link>
          <a href="#" class="group relative flex flex-col items-center justify-center py-2">
            <div class="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-md transform transition-all duration-300 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100">
              <i class="ri-apps-2-line text-white text-lg"></i>
            </div>
            <i class="ri-apps-2-line text-2xl mb-1 text-gray-600 group-hover:text-primary-600 transition-colors duration-300"></i>
            <span class="text-xs font-medium text-gray-600 group-hover:text-primary-600 transition-colors duration-300">{{ $t('nav.catalog') }}</span>
          </a>
          <router-link to="/favorites" class="group relative flex flex-col items-center justify-center py-2">
            <div class="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-md transform transition-all duration-300 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100">
              <i class="ri-heart-3-line text-white text-lg"></i>
            </div>
            <i class="ri-heart-3-line text-2xl mb-1 text-gray-600 group-hover:text-primary-600 transition-colors duration-300"></i>
            <span class="text-xs font-medium text-gray-600 group-hover:text-primary-600 transition-colors duration-300">{{ $t('nav.favorites') }}</span>
          </router-link>
          <router-link to="/cart" class="group relative flex flex-col items-center justify-center py-2">
            <div class="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-md transform transition-all duration-300 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100">
              <i class="ri-shopping-cart-2-line text-white text-lg"></i>
            </div>
            <div class="relative">
              <i class="ri-shopping-cart-2-line text-2xl mb-1 text-gray-600 group-hover:text-primary-600 transition-colors duration-300"></i>
              <span class="absolute -top-1 -right-2 bg-primary-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </div>
            <span class="text-xs font-medium text-gray-600 group-hover:text-primary-600 transition-colors duration-300">{{ $t('nav.cart') }}</span>
          </router-link>
          <router-link 
            to="/profile" 
            class="group relative flex flex-col items-center justify-center py-2"
          >
            <div class="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-md transform transition-all duration-300 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100">
              <i class="ri-user-3-line text-white text-lg"></i>
            </div>
            <i class="ri-user-3-line text-2xl mb-1 text-gray-600 group-hover:text-primary-600 transition-colors duration-300"></i>
            <span class="text-xs font-medium text-gray-600 group-hover:text-primary-600 transition-colors duration-300">{{ $t('nav.profile') }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CatalogMenu from './CatalogMenu.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()
const isSearchOpen = ref(false)
</script>

<style scoped>
.shadow-t-lg {
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06);
}

/* Add padding to the main content to prevent overlap with fixed bottom nav on mobile */
@media (max-width: 768px) {
  :root {
    padding-bottom: 4rem;
  }
}
</style>