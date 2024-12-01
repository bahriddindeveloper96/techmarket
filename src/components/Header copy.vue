<template>
  <header class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <router-link to="/" class="text-2xl font-bold text-blue-600">
          TechMarket
        </router-link>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-6">
          <router-link 
            v-for="item in menuItems" 
            :key="item.path"
            :to="item.path"
            class="text-gray-600 hover:text-blue-600 transition duration-200"
          >
            {{ item.name }}
          </router-link>
        </nav>

        <!-- Actions -->
        <div class="flex items-center space-x-4">
          <!-- Search -->
          <button class="text-gray-600 hover:text-blue-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <!-- Cart -->
          <router-link to="/cart" class="text-gray-600 hover:text-blue-600 relative">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span v-if="cartItemCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ cartItemCount }}
            </span>
          </router-link>

          <!-- Login -->
          <button 
            v-if="!isLoggedIn"
            @click="showAuthModal = true" 
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Kirish
          </button>

          <!-- Profile -->
          <div v-else class="relative" v-click-outside="closeProfileMenu">
            <button 
              @click="isProfileMenuOpen = !isProfileMenuOpen"
              class="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
            >
              <span>{{ user?.phone }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Profile Menu -->
            <div 
              v-if="isProfileMenuOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2"
            >
              <router-link 
                v-for="item in profileMenuItems" 
                :key="item.path"
                :to="item.path"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                {{ item.name }}
              </router-link>
              <button 
                @click="logout" 
                class="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Chiqish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Auth Modal -->
    <PhoneAuth 
      v-model:isOpen="showAuthModal"
      @onLogin="handleLogin"
    />
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import PhoneAuth from './PhoneAuth.vue';

const router = useRouter();
const showAuthModal = ref(false);
const isProfileMenuOpen = ref(false);
const user = ref(null);

// Mock cart count
const cartItemCount = ref(0);

const isLoggedIn = computed(() => !!user.value);

const menuItems = [
  { name: 'Bosh sahifa', path: '/' },
  { name: 'Kategoriyalar', path: '/categories' },
  { name: 'Yangi mahsulotlar', path: '/new' },
  { name: 'Aksiyalar', path: '/sales' }
];

const profileMenuItems = [
  { name: 'Profil', path: '/profile' },
  { name: 'Buyurtmalar', path: '/orders' },
  { name: 'Sevimlilar', path: '/favorites' },
  { name: 'Sozlamalar', path: '/settings' }
];

// Login handler
const handleLogin = (userData) => {
  user.value = userData;
  showAuthModal.value = false;
};

// Logout handler
const logout = () => {
  user.value = null;
  isProfileMenuOpen.value = false;
  router.push('/');
};

// Close profile menu when clicking outside
const closeProfileMenu = () => {
  isProfileMenuOpen.value = false;
};

// Click outside directive
const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent);
  }
};
</script>
