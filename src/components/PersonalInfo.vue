<template>
  <div class="settings-container p-4 sm:p-6 max-w-4xl mx-auto">
    <!-- Mobile Header -->
    <div class="flex items-center justify-between p-4 md:hidden border-b border-gray-200 dark:border-gray-800">
      <div class="flex items-center space-x-4">
        <button @click="$emit('update:active-tab', 'home')" class="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
          <i class="fas fa-arrow-left text-xl"></i>
        </button>
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">{{ $t('profile.personal_info') }}</h1>
      </div>
    </div>

    <!-- Desktop Header -->
    <div class="hidden md:flex items-center justify-between mb-8">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white">{{ $t('profile.personal_info') }}</h2>
    </div>

    <!-- Personal Info Form -->
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
      <div class="p-6">
        <!-- Form Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- First Name -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('profile.first_name') }}</label>
            <input 
              v-model="userData.firstName"
              type="text" 
              class="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" 
              :placeholder="$t('profile.placeholders.first_name')" 
            />
          </div>

          <!-- Last Name -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('profile.last_name') }}</label>
            <input 
              v-model="userData.lastName"
              type="text" 
              class="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" 
              :placeholder="$t('profile.placeholders.last_name')" 
            />
          </div>

          <!-- Email -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('profile.email') }}</label>
            <input 
              v-model="userData.email"
              type="email" 
              class="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" 
              :placeholder="$t('profile.placeholders.email')" 
            />
          </div>

          <!-- Phone -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('profile.phone') }}</label>
            <input 
              v-model="userData.phone"
              type="tel" 
              class="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" 
              :placeholder="$t('profile.placeholders.phone')" 
            />
          </div>

          <!-- Birthday -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('profile.birthday') }}</label>
            <input 
              v-model="userData.birthday"
              type="date" 
              class="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" 
            />
          </div>

          <!-- Gender -->
          <div class="space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('profile.gender') }}</label>
            <select 
              v-model="userData.gender"
              class="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            >
              <option value="">{{ $t('profile.select') }}</option>
              <option value="male">{{ $t('profile.male') }}</option>
              <option value="female">{{ $t('profile.female') }}</option>
            </select>
          </div>

          <!-- Address -->
          <div class="col-span-1 md:col-span-2 space-y-2">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">{{ $t('profile.address') }}</label>
            <textarea 
              v-model="userData.address"
              class="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" 
              rows="3" 
              :placeholder="$t('profile.placeholders.address')"
            ></textarea>
          </div>

          <!-- Save Button -->
          <div class="col-span-1 md:col-span-2 flex justify-end space-x-4">
           
            <button 
              @click="handleSave"
              class="px-6 py-2 bg-primary-600 dark:bg-primary-900 text-white rounded-xl hover:bg-primary-700 dark:hover:bg-primary-800 transition-colors"
            >
              {{ $t('profile.save') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useI18n } from 'vue-i18n'

const authStore = useAuthStore()
const { t, locale } = useI18n()
const currentLocale = computed(() => locale.value)

const loading = ref(true)
const updating = ref(false)
const error = ref(null)
const successMessage = ref('')

const userData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  bio: '',
  address: ''
})

const fetchProfile = async () => {
  try {
    loading.value = true
    error.value = null

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user`, {
      headers: {
        'Authorization': `Bearer ${authStore.getToken}`,
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch profile')
    }

    const data = await response.json()
  
    // Set basic data
    userData.value.firstName = data.firstname || ''
    userData.value.lastName = data.lastname || ''
    userData.value.email = data.email || ''
    userData.value.phone = data.phone || ''
    userData.value.address = data.address || ''
    userData.value.bio = data.bio || ''
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const updateProfile = async () => {
  try {
    updating.value = true
    error.value = null
    successMessage.value = ''

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authStore.getToken}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
      firstname: userData.value.firstName,
      lastname: userData.value.lastName,
      email: userData.value.email,
      phone: userData.value.phone,
      address: userData.value.address,
      bio: userData.value.bio
    })
    })

    if (!response.ok) {
      throw new Error(t('profile.error'))
    }

    successMessage.value = t('profile.success')
  } catch (err) {
    error.value = err.message || t('profile.error')
  } finally {
    updating.value = false
  }
}

onMounted(() => {
  fetchProfile()
})
</script>

