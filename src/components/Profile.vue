<template>
  <div class="py-4">
      <!-- Header -->
      <div class="bg-white dark:bg-gray-800 shadow">
        <div class="container mx-auto px-4 py-4">
          <h1 class="text-xl font-semibold text-gray-900 dark:text-white">{{ $t('profile.title') }}</h1>
        </div>
      </div>
        <!-- Desktop Version -->
        <div class="hidden md:grid grid-cols-12 gap-8 py-4">
          <!-- Desktop Sidebar -->
          <div class="col-span-3">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
              <div class="flex flex-col items-center space-y-4">
                <div class="w-24 h-24 rounded-full overflow-hidden">
                  <img src="https://ui-avatars.com/api/?name=John+Doe&background=6466f1&color=fff" alt="Profile" class="w-full h-full object-cover">
                </div>
                <div class="text-center">
                  <button @click="handleTabChange('personal')" class="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">{{ $t('profile.personal_info') }}</button>
                  <p class="text-sm text-gray-500 dark:text-gray-400">+998 90 123 45 67</p>
                </div>
                <div class="w-full pt-4 border-t dark:border-gray-700">
                  <nav class="space-y-2">
                    <button @click="handleTabChange('personal')" 
                      :class="[
                        'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors',
                        activeTab === 'personal' ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400' : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      ]">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span class="font-medium">{{ $t('profile.personal_info') }}</span>
                    </button>

                    <button @click="handleTabChange('orders')"
                      :class="[
                        'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors',
                        activeTab === 'orders' ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400' : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      ]">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span class="font-medium">{{ $t('profile.orders') }}</span>
                    </button>

                    <a href="#" class="flex items-center space-x-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{{ $t('profile.favorites') }}</span>
                    </a>

                    <button @click="handleTabChange('settings')" 
                      :class="[
                        'w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl transition-colors',
                        activeTab === 'settings' ? 'bg-primary-50 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400' : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      ]">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span class="font-medium">{{ $t('profile.settings') }}</span>
                    </button>

                    <!-- <a href="#" class="flex items-center space-x-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{{ $t('profile.settings') }}</span>
                    </a> -->
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <!-- Desktop Main Content -->
          <div class="col-span-9">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div v-if="activeTab === 'orders'">
                <OrdersView />
              </div>
              <div v-else-if="activeTab === 'settings'">
                <Settings />
              </div>
              <div v-else-if="activeTab === 'personal'">
                <!-- <PersonalInfo :active-tab="activeTab" @update:active-tab="activeTab = $event" /> -->
                <PersonalInfo />
              </div>
              <div v-else>
                
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile Version -->
        <div class="md:hidden">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-4">
            <div class="flex items-center space-x-4">
              <div class="w-16 h-16 rounded-full overflow-hidden">
                <img src="https://ui-avatars.com/api/?name=John+Doe&background=6466f1&color=fff" alt="Profile" class="w-full h-full object-cover">
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('profile.personal_info') }}</h3>
                  <button @click="handleTabChange('personal')" class="p-2 text-gray-400 hover:text-primary-500 transition-colors">
                    <i class="fas fa-edit text-xl"></i>
                  </button>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400">+998 90 123 45 67</p>
              </div>
            </div>
          </div>

          <!-- Show PersonalInfo component when activeTab is 'personal' -->
          <div v-if="activeTab === 'personal'" class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
            <PersonalInfo :active-tab="activeTab" @update:active-tab="activeTab = $event" />
            
          </div>

          <!-- Menu Items -->
          <div v-else class="space-y-4">
            <!-- Orders -->
            <router-link to="/orders" class="block bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <div class="p-4 flex items-center">
                <div class="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  <i class="ri-file-list-3-line text-xl"></i>
                </div>
                <span class="ml-4 text-gray-900 dark:text-white font-medium">{{ $t('profile.orders') }}</span>
                <i class="ri-arrow-right-s-line text-xl text-gray-400 dark:text-gray-500 ml-auto"></i>
              </div>
            </router-link>

            <!-- Favorites
            <a href="#" class="block bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <div class="p-4 flex items-center">
                <div class="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  <i class="ri-heart-3-line text-xl"></i>
                </div>
                <span class="ml-4 text-gray-900 dark:text-white font-medium">{{ $t('profile.favorites') }}</span>
                <i class="ri-arrow-right-s-line text-xl text-gray-400 dark:text-gray-500 ml-auto"></i>
              </div>
            </a> -->

            <!-- Settings -->
            <router-link to="/settings" class="block bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <div class="p-4 flex items-center">
                <div class="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  <i class="ri-settings-3-line text-xl"></i>
                </div>
                <span class="ml-4 text-gray-900 dark:text-white font-medium">{{ $t('profile.settings') }}</span>
                <i class="ri-arrow-right-s-line text-xl text-gray-400 dark:text-gray-500 ml-auto"></i>
              </div>
            </router-link>

            <!-- Help Center -->
            <a href="#" class="block bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <div class="p-4 flex items-center">
                <div class="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  <i class="ri-question-line text-xl"></i>
                </div>
                <span class="ml-4 text-gray-900 dark:text-white font-medium">{{ $t('profile.help') }}</span>
                <i class="ri-arrow-right-s-line text-xl text-gray-400 dark:text-gray-500 ml-auto"></i>
              </div>
            </a>

            <!-- Logout -->
            <button class="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
              <div class="p-4 flex items-center">
                <div class="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/50 flex items-center justify-center text-red-600 dark:text-red-400">
                  <i class="ri-logout-box-r-line text-xl"></i>
                </div>
                <span class="ml-4 text-red-600 dark:text-red-400 font-medium">{{ $t('profile.logout') }}</span>
              </div>
            </button>
          </div>
        </div>
  </div>
   
</template>

<script setup>
import { ref } from 'vue';
import Settings from './Settings.vue';
import PersonalInfo from './PersonalInfo.vue';
import OrdersView from '../views/OrdersView.vue';
import Banner from '../components/Banner.vue';

// State
const activeTab = ref('home');
const searchQuery = ref('');
const statusFilter = ref('');
const dateFilter = ref('all');

// Methods
const handleTabChange = (tab) => {
  activeTab.value = tab;
};
</script>
