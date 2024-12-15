<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">{{ $t('profile.title') }}</h1>

    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
    </div>

    <div v-else-if="error" class="text-red-500 text-center py-8">
      {{ error }}
    </div>

    <div v-else class="max-w-2xl mx-auto">
      <form @submit.prevent="updateProfile" class="space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4">{{ $t('profile.personal_info') }}</h2>

        <!-- Name -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ $t('profile.name') }}
          </label>
          <input
            type="text"
            v-model="formData.name"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ $t('profile.email') }}
          </label>
          <input
            type="email"
            v-model="formData.email"
            disabled
            class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        <!-- Phone -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ $t('profile.phone') }}
          </label>
          <input
            type="tel"
            v-model="formData.phone"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
        </div>

        <!-- Bio -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ $t('profile.bio') }}
          </label>
          <textarea
            v-model="formData.bio"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
          ></textarea>
        </div>

        <!-- Address -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ $t('profile.address') }}
          </label>
          <textarea
            v-model="formData.address"
            rows="2"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500"
          ></textarea>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <button
            type="submit"
            :disabled="updating"
            class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {{ updating ? '...' : $t('profile.save') }}
          </button>
        </div>

        <!-- Success Message -->
        <div v-if="successMessage" class="text-green-600 text-center mt-4">
          {{ successMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useI18n } from 'vue-i18n'

const authStore = useAuthStore()
const { locale } = useI18n()
const currentLocale = computed(() => locale.value)

const loading = ref(true)
const updating = ref(false)
const error = ref(null)
const successMessage = ref('')

const formData = ref({
  name: '',
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
    formData.value.email = data.email
    formData.value.phone = data.phone

    // Find translation for current locale
    const translation = data.translations.find(t => t.locale === currentLocale.value)
    if (translation) {
      formData.value.name = translation.name
      formData.value.bio = translation.bio
      formData.value.address = translation.address
    }
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
        phone: formData.value.phone,
        translations: {
          [currentLocale.value]: {
            name: formData.value.name,
            bio: formData.value.bio,
            address: formData.value.address
          }
        }
      })
    })

    if (!response.ok) {
      throw new Error('Failed to update profile')
    }

    successMessage.value = $t('profile.success')
  } catch (err) {
    error.value = $t('profile.error')
  } finally {
    updating.value = false
  }
}

onMounted(() => {
  fetchProfile()
})
</script>
