<template>
  <div class="settings-container p-4 sm:p-6 max-w-4xl mx-auto">
    <!-- Mobile Header -->
    <div class="sm:hidden flex items-center justify-between mb-4">
      <div class="flex items-center">
        <router-link to="/profile" class="p-2 -ml-2 text-gray-500 hover:text-gray-700">
          <i class="ri-arrow-left-s-line text-2xl"></i>
        </router-link>
        <h1 class="text-xl font-semibold text-gray-900">{{ $t('settings.title') }}</h1>
      </div>
      <LanguageSwitcher class="mobile-language-switcher" />
    </div>

    <!-- Desktop Header -->
    <div class="hidden sm:flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800">{{ $t('settings.title') }}</h2>
      <LanguageSwitcher />
    </div>

    <!-- Settings Sections -->
    <div class="space-y-4 sm:space-y-6">
      <!-- Account Settings -->
      <div class="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ $t('settings.account.title') }}</h3>
        <div class="space-y-4">
          <!-- Language -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <div>
              <h4 class="font-medium text-gray-800">{{ $t('settings.account.language.title') }}</h4>
              <p class="text-sm text-gray-500">{{ $t('settings.account.language.description') }}</p>
            </div>
            <select v-model="settings.language" class="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
              <option value="uz">O'zbek</option>
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </div>

          <!-- Theme -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <div>
              <h4 class="font-medium text-gray-800">{{ $t('settings.account.theme.title') }}</h4>
              <p class="text-sm text-gray-500">{{ $t('settings.account.theme.description') }}</p>
            </div>
            <div class="flex items-center space-x-2">
              <button 
                :class="[
                  'w-10 h-10 rounded-xl flex items-center justify-center',
                  settings.theme === 'light' ? 'bg-white border-2 border-primary-500' : 'bg-white border-2 border-gray-200'
                ]"
                @click="settings.theme = 'light'"
              >
                <i :class="['ri-sun-line text-xl', settings.theme === 'light' ? 'text-primary-500' : 'text-gray-400']"></i>
              </button>
              <button 
                :class="[
                  'w-10 h-10 rounded-xl flex items-center justify-center',
                  settings.theme === 'dark' ? 'bg-gray-900 border-2 border-primary-500' : 'bg-gray-900 border-2 border-gray-200'
                ]"
                @click="settings.theme = 'dark'"
              >
                <i :class="['ri-moon-line text-xl', settings.theme === 'dark' ? 'text-primary-500' : 'text-gray-400']"></i>
              </button>
            </div>
          </div>

          <!-- Currency -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <div>
              <h4 class="font-medium text-gray-800">{{ $t('settings.account.currency.title') }}</h4>
              <p class="text-sm text-gray-500">{{ $t('settings.account.currency.description') }}</p>
            </div>
            <select v-model="settings.currency" class="px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all">
              <option value="uzs">UZS</option>
              <option value="usd">USD</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div class="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ $t('settings.notifications.title') }}</h3>
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <div>
              <h4 class="font-medium text-gray-800">{{ $t('settings.notifications.email.title') }}</h4>
              <p class="text-sm text-gray-500">{{ $t('settings.notifications.email.description') }}</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.notifications.email" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <div>
              <h4 class="font-medium text-gray-800">{{ $t('settings.notifications.sms.title') }}</h4>
              <p class="text-sm text-gray-500">{{ $t('settings.notifications.sms.description') }}</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.notifications.sms" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </div>

      <!-- Privacy & Security -->
      <div class="bg-white rounded-2xl p-4 sm:p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">{{ $t('settings.privacy.title') }}</h3>
        <div class="space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <div>
              <h4 class="font-medium text-gray-800">{{ $t('settings.privacy.two_factor.title') }}</h4>
              <p class="text-sm text-gray-500">{{ $t('settings.privacy.two_factor.description') }}</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="settings.security.twoFactor" class="sr-only peer">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <button class="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 rounded-xl transition-colors">
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
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './LanguageSwitcher.vue'

const router = useRouter()
const { t } = useI18n()

const settings = ref({
  language: localStorage.getItem('language') || 'uz',
  theme: localStorage.getItem('theme') || 'light',
  currency: localStorage.getItem('currency') || 'uzs',
  notifications: {
    email: true,
    sms: true,
  },
  security: {
    twoFactor: false
  }
})

// Theme o'zgarganda localStorage'ga saqlash
watch(() => settings.value.theme, (newTheme) => {
  localStorage.setItem('theme', newTheme)
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
