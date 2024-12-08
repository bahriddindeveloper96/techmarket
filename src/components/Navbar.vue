<template>
  <div>
    <!-- Top bar - Desktop only -->
    <div class="hidden md:block bg-gray-100 rounded-b-xl dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-10 text-sm">
          <div class="flex items-center space-x-4">
            <a href="#" class="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">{{ $t('nav.company_info') }}</a>
            <a href="#" class="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">{{ $t('nav.contacts') }}</a>
          </div>
          <div class="flex items-center space-x-4">
            <a href="#" class="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">{{ $t('nav.stores') }}</a>
            <a href="#" class="text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">{{ $t('nav.delivery') }}</a>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>

    <!-- Main navbar -->
    <div class="bg-white dark:bg-gray-900 shadow-sm">
      <div class="container mx-auto px-4 bg-white dark:bg-gray-900 rounded-2xl shadow-sm my-4">
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center justify-between h-20">
          <div class="flex items-center space-x-4">
            <!-- Logo -->
            <router-link to="/" class="flex items-center space-x-2">
              <span class="text-2xl font-bold text-primary-600 dark:text-primary-400">Tech</span>
              <span class="text-2xl font-bold text-accent-600 dark:text-accent-400">Market</span>
            </router-link>
            <!-- Catalog Menu -->
            <CatalogMenu />
          </div>

          <!-- Search -->
          <div class="flex-1 max-w-2xl mx-8">
            <div class="relative">
              <input
                type="text"
                :placeholder="$t('header.search')"
                class="w-full pl-12 pr-10 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-400"
              />
              <span class="absolute left-4 top-1/2 -translate-y-1/2">
                <i class="ri-search-2-line text-lg text-gray-400 dark:text-gray-600"></i>
              </span>
            </div>
          </div>

          <!-- Right menu -->
          <div class="flex items-center space-x-6">
            <router-link to="/favorites" class="flex flex-col items-center text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
              <i class="ri-heart-3-line text-2xl"></i>
              <span class="text-xs mt-1">{{ $t('nav.favorites') }}</span>
            </router-link>
            <!-- Profile button -->
            <router-link 
              to="/profile" 
              class="flex flex-col items-center text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            >
              <i class="ri-user-3-line text-2xl"></i>
              <span class="text-xs mt-1">{{ auth.currentUser?.phone || $t('nav.profile') }}</span>
            </router-link>
            <div class="relative">
              <router-link to="/cart" class="relative flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">
                <i id="cartIcon" 
                   class="ri-shopping-cart-2-line text-2xl transition-transform duration-300"
                   :class="{'scale-125': cartStore.showNotification}">
                </i>
                <transition name="notification" mode="out-in">
                  <span v-if="cartStore.cartItems.length > 0" 
                    :class="{'animate-pop-up': cartStore.showNotification}"
                    class="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {{ cartStore.cartItems.length }}
                  </span>
                </transition>
              </router-link>
            </div>
            <ThemeToggle />
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="md:hidden">
          <!-- Top Section -->
          <div class="flex items-center justify-between p-4">
            <!-- Logo -->
            <router-link to="/" class="flex items-center space-x-2">
              <span class="text-xl font-bold text-primary-600 dark:text-primary-400">Tech</span>
              <span class="text-xl font-bold text-accent-600 dark:text-accent-400">Market</span>
            </router-link>
            
            <!-- Search Button -->
            <button 
              @click="isSearchOpen = !isSearchOpen"
              class="w-10 h-10 flex items-center justify-center text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
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
                class="w-full h-12 pl-12 pr-4 text-base border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-primary-500 dark:focus:border-primary-400"
              />
              <span class="absolute left-4 top-1/2 -translate-y-1/2">
                <i class="ri-search-2-line text-lg text-gray-400 dark:text-gray-600"></i>
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Categories Navigation -->
      <!-- <div class="hidden md:flex items-center justify-center w-full py-4 bg-white dark:bg-gray-900">
        <nav class="flex items-center space-x-8">
          <a href="#" class="flex items-center space-x-2 text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
            <i class="ri-flashlight-line"></i>
            <span>{{ $t('nav.new') }}</span>
          </a>
          <a href="#" class="flex items-center space-x-2 text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
            <i class="ri-flashlight-line"></i>
            <span>{{ $t('nav.new') }}</span>
          </a>
          <a href="#" class="flex items-center space-x-2 text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
            <i class="ri-flashlight-line"></i>
            <span>{{ $t('nav.new') }}</span>
          </a>
          <a href="#" class="flex items-center space-x-2 text-gray-700 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200">
            <i class="ri-flashlight-line"></i>
            <span>{{ $t('nav.new') }}</span>
          </a>
        </nav>
      </div> -->
    </div>

    <!-- Mobile Bottom Navigation Bar -->
    <div class="fixed bottom-0 left-0 right-0 md:hidden z-50">
      <div class="bg-white dark:bg-gray-900 shadow-t-lg border-t border-gray-200 dark:border-gray-700 rounded-t-xl">
        <div class="grid grid-cols-5 h-16">
          <router-link to="/" class="group relative flex flex-col items-center justify-center py-2">
            <div class="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 dark:from-primary-400 dark:to-accent-400 rounded-xl flex items-center justify-center shadow-md transform transition-all duration-300 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100">
              <i class="ri-store-2-line text-white text-lg"></i>
            </div>
            <i class="ri-store-2-line text-2xl mb-1 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300"></i>
            <span class="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">{{ $t('nav.home') }}</span>
          </router-link>

          <button 
            class="group relative flex flex-col items-center justify-center py-2"
            @click.prevent="toggleMobileMenu"
          >
            <div class="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 dark:from-primary-400 dark:to-accent-400 rounded-xl flex items-center justify-center shadow-md transform transition-all duration-300 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100">
              <i class="ri-apps-2-line text-white text-lg"></i>
            </div>
            <i class="ri-apps-2-line text-2xl mb-1 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300"></i>
            <span class="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">{{ $t('nav.catalog') }}</span>
          </button>

          <router-link to="/favorites" class="group relative flex flex-col items-center justify-center py-2">
            <div class="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 dark:from-primary-400 dark:to-accent-400 rounded-xl flex items-center justify-center shadow-md transform transition-all duration-300 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100">
              <i class="ri-heart-3-line text-white text-lg"></i>
            </div>
            <i class="ri-heart-3-line text-2xl mb-1 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300"></i>
            <span class="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">{{ $t('nav.favorites') }}</span>
          </router-link>

          <router-link to="/cart" class="group relative flex flex-col items-center justify-center py-2">
            <div class="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 dark:from-primary-400 dark:to-accent-400 rounded-xl flex items-center justify-center shadow-md transform transition-all duration-300 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100">
              <i class="ri-shopping-cart-2-line text-white text-lg"></i>
            </div>
            <div id="mobileCartWrapper" class="relative">
              <i class="ri-shopping-cart-2-line text-2xl mb-1 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300"></i>
              <transition name="notification" mode="out-in">
                <span v-if="cartStore.cartItems.length > 0" 
                  :class="{'animate-pop-up': cartStore.showNotification}"
                  class="absolute -top-1 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {{ cartStore.cartItems.length }}
                </span>
              </transition>
            </div>
            <span class="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">{{ $t('nav.cart') }}</span>
          </router-link>

          <router-link to="/profile" class="group relative flex flex-col items-center justify-center py-2">
            <div class="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 dark:from-primary-400 dark:to-accent-400 rounded-xl flex items-center justify-center shadow-md transform transition-all duration-300 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100">
              <i class="ri-user-3-line text-white text-lg"></i>
            </div>
            <i class="ri-user-3-line text-2xl mb-1 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300"></i>
            <span class="text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">{{ auth.currentUser?.phone || $t('nav.profile') }}</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Mobile Catalog Menu -->
    <MobileCatalogMenu 
      v-if="isMobileMenuOpen" 
      @close="toggleMobileMenu"
    />

    <!-- Auth Modal -->
    <PhoneAuth 
      v-model:isOpen="showAuthModal"
      @onLogin="handleLogin"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { auth } from '../firebase/config'
import { useCartStore } from '../stores/cartStore'
import LanguageSwitcher from './LanguageSwitcher.vue'
import ThemeToggle from './ThemeToggle.vue'
import CatalogMenu from './CatalogMenu.vue'
import MobileCatalogMenu from './MobileCatalogMenu.vue'
import PhoneAuth from './PhoneAuth.vue'

const { t } = useI18n()
const router = useRouter()
const cartStore = useCartStore()

const isSearchOpen = ref(false)
const isMobileMenuOpen = ref(false)
const showAuthModal = ref(false)

const isLoggedIn = computed(() => !!auth.currentUser)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleLogin = (user) => {
  showAuthModal.value = false;
  router.push('/profile');
}
</script>

<style scoped>
.shadow-t-lg {
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06);
}

@keyframes pop-up {
  0% {
    transform: scale(0.5) translateY(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) translateY(-5px);
  }
  70% {
    transform: scale(0.9) translateY(2px);
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.animate-pop-up {
  animation: pop-up 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}
.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: scale(0.5) translateY(10px);
}

/* Cart notification animations */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

@keyframes popUp {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.animate-pop-up {
  animation: popUp 0.3s ease-out;
}
</style>