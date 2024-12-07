<template>
  
    <!-- Mobile Header -->
    <div class="flex items-center justify-between p-4 md:hidden border-b border-gray-200 dark:border-gray-800">
      <div class="flex items-center space-x-4">
        <router-link to="/profile" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <i class="ri-arrow-left-s-line text-2xl"></i>
        </router-link>
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">{{ $t('settings.title') }}</h1>
      </div>
      
    </div>

    <!-- Desktop Header -->
    <div class="hidden sm:flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white">{{ $t('settings.title') }}</h2>
      <LanguageSwitcher class="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" />
    </div>

    <!-- Settings Sections -->
    <div class="space-y-4 sm:space-y-6">
      <!-- Account Settings -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">{{ $t('settings.account.title') }}</h3>
        <div class="space-y-4">
          <!-- Language -->
          <div class="flex items-center justify-between p-4 space-x-4 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h4 class="font-medium text-gray-800 dark:text-white">{{ $t('settings.account.language.title') }}</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('settings.account.language.description') }}</p>
            </div>           
            <LanguageSwitcher class="block md:hidden mobile-language-switcher px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" />
            
          </div>

          <!-- Theme -->
          <div class="flex justify-between items-center py-4 border-b dark:border-gray-700">
            <div>
              <h4 class="font-medium text-gray-800 dark:text-white">{{ $t('settings.account.theme.title') }}</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('settings.account.theme.description') }}</p>
            </div>
            <ThemeToggle />
          </div>

          <!-- Currency -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <div>
              <h4 class="font-medium text-gray-800 dark:text-white">{{ $t('settings.account.currency.title') }}</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('settings.account.currency.description') }}</p>
            </div>
            <select v-model="settings.currency" class="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
              <option value="uzs">UZS</option>
              <option value="usd">USD</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">{{ $t('settings.notifications.title') }}</h3>
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <div>
              <h4 class="font-medium text-gray-800 dark:text-white">{{ $t('settings.notifications.email.title') }}</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('settings.notifications.email.description') }}</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.notifications.email" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <div>
              <h4 class="font-medium text-gray-800 dark:text-white">{{ $t('settings.notifications.sms.title') }}</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('settings.notifications.sms.description') }}</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.notifications.sms" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Privacy & Security -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">{{ $t('settings.privacy.title') }}</h3>
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <div>
              <h4 class="font-medium text-gray-800 dark:text-white">{{ $t('settings.privacy.two_factor.title') }}</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ $t('settings.privacy.two_factor.description') }}</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.security.twoFactor" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <button class="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-xl transition-colors">
            {{ $t('settings.privacy.delete_account') }}
          </button>
        </div>
      </div>

      <!-- Save Changes -->
      <div class="flex justify-end">
        <button class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          {{ $t('settings.save_changes') }}
        </button>
      </div>
    </div>
 
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './LanguageSwitcher.vue'
import ThemeToggle from './ThemeToggle.vue'

const router = useRouter()
const { t } = useI18n()

const settings = ref({
  language: localStorage.getItem('language') || 'uz',
  currency: localStorage.getItem('currency') || 'uzs',
  notifications: {
    email: true,
    sms: true,
  },
  security: {
    twoFactor: false
  }
})

// Currency o'zgarganda localStorage'ga saqlash
watch(() => settings.value.currency, (newCurrency) => {
  localStorage.setItem('currency', newCurrency)
})

// Language o'zgarganda localStorage'ga saqlash
watch(() => settings.value.language, (newLanguage) => {
  localStorage.setItem('language', newLanguage)
})
</script>

<style scoped>
.mobile-language-switcher :deep(.origin-top-right) {
  right: -8px;
}
</style>
