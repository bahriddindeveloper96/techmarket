<template>
  
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
            <div class="relative">
              <select 
                v-model="currentLocale"
                @change="changeLocale"
                class="appearance-none bg-transparent border border-gray-300 dark:border-gray-600 rounded px-3 py-1 pr-8 focus:outline-none focus:border-purple-500 dark:text-white"
              >
                <option value="uz">O'zbekcha</option>
                <option value="ru">Русский</option>
                <option value="en">English</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                <i class="fas fa-chevron-down text-xs"></i>
              </div>
            </div>
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
            <router-link to="/favorites" class="relative flex flex-col items-center text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
              <div class="relative">
                <i class="ri-heart-3-line text-2xl"></i>
                <transition name="bounce">
                  <span v-if="favoriteStore.count > 0"
                    class="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
                    {{ favoriteStore.count }}
                  </span>
                </transition>
              </div>
              <span class="text-xs mt-1">{{ $t('nav.favorites') }}</span>
            </router-link>
            <!-- Profile button -->
            <router-link 
              to="/profile" 
              class="flex flex-col items-center justify-center text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
            >
              <i class="ri-user-3-line text-2xl"></i>
              <span class="text-xs mt-1">{{ auth.currentUser?.phone || $t('nav.profile') }}</span>
            </router-link>
            <div class="relative">
              <!-- <router-link to="/cart" class="relative flex flex-col items-center text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                <div class="relative">
                  <i class="ri-shopping-cart-2-line text-2xl" :class="{'scale-125 text-primary-600': cartStore.showNotification}"></i>
                  <transition name="bounce">
                    <span v-if="cartStore.itemsCount > 0"
                      class="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1"
                      :class="{'animate-bounce': cartStore.showNotification}">
                      {{ cartStore.itemsCount }}
                    </span>
                  </transition>
                </div>
                <span class="text-xs mt-1">{{ $t('nav.cart') }}</span>
              </router-link> -->
              <router-link to="/cart" class="relative flex flex-col items-center text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                <div class="relative">
                  <i class="ri-shopping-cart-2-line text-2xl" :class="{'scale-125 text-primary-600': cartStore.showNotification}"></i>
                  <transition name="bounce">
                    <span v-if="cartStore.itemsCount > 0"
                      class="absolute -top-2 -right-2 bg-accent-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1"
                      :class="{'animate-bounce': cartStore.showNotification}">
                      {{ cartStore.itemsCount }}
                    </span>
                  </transition>
                </div>
                <span class="text-xs mt-1">{{ $t('nav.cart') }}</span>
              </router-link>
            </div>
            <ThemeToggle />
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div class="md:hidden">
          <!-- Top Section -->
          <div class="flex items-center justify-between p-4 max-w-md mx-auto">
            <!-- Logo -->
            <router-link to="/" class="flex items-center space-x-2">
              <span class="text-xl font-bold text-primary-600 dark:text-primary-400">Tech</span>
              <span class="text-xl font-bold text-accent-600 dark:text-accent-400">Market</span>
            </router-link>
            
            <!-- Search Button -->
            <button 
              @click="isSearchOpen = !isSearchOpen"
              class="w-[60px] h-[60px] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <i class="ri-search-2-line text-[22px]"></i>
            </button>
          </div>

          <!-- Search Bar (Collapsible) -->
          <div 
            v-show="isSearchOpen"
            class="px-4 pb-4 max-w-md mx-auto"
          >
            <div class="relative">
              <input
                type="text"
                :placeholder="$t('header.search')"
                class="w-full h-[60px] pl-12 pr-4 text-[16px] border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:border-primary-500 dark:focus:border-primary-400"
              />
              <span class="absolute left-4 top-1/2 -translate-y-1/2">
                <i class="ri-search-2-line text-[22px] text-gray-400 dark:text-gray-600"></i>
              </span>
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
    <div class="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white dark:bg-gray-900">
      <div class="border-t border-gray-200 dark:border-gray-700">
        <div class="grid grid-cols-5 h-[60px] max-w-md mx-auto">
          <!-- Home -->
          <router-link to="/" 
            class="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
            :class="{ 'text-primary-600 dark:text-primary-400': $route.path === '/' }"
          >
            <i class="ri-home-5-line text-[22px]"></i>
            <span class="text-[10px] mt-1">{{ $t('nav.home') }}</span>
          </router-link>

          <!-- Catalog -->
          <button @click="toggleMobileMenu" 
            class="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
            :class="{ 'text-primary-600 dark:text-primary-400': showMobileMenu }"
          >
            <i class="ri-apps-line text-[22px]"></i>
            <span class="text-[10px] mt-1">{{ $t('nav.catalog') }}</span>
          </button>

          <!-- Cart -->
          <router-link to="/cart" 
            class="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 relative"
            :class="{ 'text-primary-600 dark:text-primary-400': $route.path === '/cart' }"
          >
            <div class="relative">
              <i class="ri-shopping-cart-2-line text-[22px]"></i>
              <transition name="bounce">
                <span v-if="cartStore.itemsCount > 0"
                  class="absolute -top-1.5 -right-2 bg-accent-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1">
                  {{ cartStore.itemsCount }}
                </span>
              </transition>
            </div>
            <span class="text-[10px] mt-1">{{ $t('nav.cart') }}</span>
          </router-link>

          <!-- Favorites -->
          <router-link to="/favorites" 
            class="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 relative"
            :class="{ 'text-primary-600 dark:text-primary-400': $route.path === '/favorites' }"
          >
            <div class="relative">
              <i class="ri-heart-3-line text-[22px]"></i>
              <transition name="bounce">
                <span v-if="favoriteStore.count > 0"
                  class="absolute -top-1.5 -right-2 bg-accent-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-1">
                  {{ favoriteStore.count }}
                </span>
              </transition>
            </div>
            <span class="text-[10px] mt-1">{{ $t('nav.favorites') }}</span>
          </router-link>

          <!-- Profile -->
          <router-link to="/profile" 
            class="flex flex-col items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
            :class="{ 'text-primary-600 dark:text-primary-400': $route.path === '/profile' }"
          >
            <i class="ri-user-3-line text-[22px]"></i>
            <span class="text-[10px] mt-1">{{ $t('nav.profile') }}</span>
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
import { useCartStore } from '@/stores/cartStore'
import { useFavoriteStore } from '../stores/favoriteStore'
import { useAuthStore } from '../stores/authStore'
import CatalogMenu from './CatalogMenu.vue'
import MobileCatalogMenu from './MobileCatalogMenu.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import ThemeToggle from './ThemeToggle.vue'

const { locale, t } = useI18n()
const currentLocale = ref(locale.value)

const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const auth = useAuthStore()
const router = useRouter()

const isSearchOpen = ref(false)
const isMobileMenuOpen = ref(false)
const showAuthModal = ref(false)

const changeLocale = () => {
  locale.value = currentLocale.value
  localStorage.setItem('locale', currentLocale.value)
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function handleLogin(user) {
  showAuthModal.value = false
}
</script>

<style scoped>
.shadow-t-lg {
  box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06);
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
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
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.animate-bounce {
  animation: popUp 0.3s ease-out;
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

.animate-bounce {
  animation: popUp 0.3s ease-out;
}
</style>