<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <!-- Background overlay -->
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="$emit('close')"></div>

    <!-- Modal panel -->
    <div class="flex min-h-full items-end sm:items-center justify-center p-4 text-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md w-full">
        <!-- Modal header -->
        <div class="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            {{ $t('auth.register') }}
          </h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <span class="sr-only">Close</span>
            <i class="ri-close-line text-xl"></i>
          </button>
        </div>

        <!-- Modal content -->
        <div class="px-4 py-5 sm:p-6">
          <form class="space-y-4" @submit.prevent="handleRegister">
            <!-- First Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <input
                v-model="formData.firstname"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 dark:bg-gray-700 dark:text-white sm:text-sm"
                :class="{ 'border-red-500': errors.firstname }"
              />
              <span v-if="errors.firstname" class="text-red-500 text-xs mt-1">{{ errors.firstname }}</span>
            </div>

            <!-- Last Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <input
                v-model="formData.lastname"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 dark:bg-gray-700 dark:text-white sm:text-sm"
                :class="{ 'border-red-500': errors.lastname }"
              />
              <span v-if="errors.lastname" class="text-red-500 text-xs mt-1">{{ errors.lastname }}</span>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                v-model="formData.email"
                type="email"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 dark:bg-gray-700 dark:text-white sm:text-sm"
                :class="{ 'border-red-500': errors.email }"
              />
              <span v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</span>
            </div>

            <!-- Phone -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone
              </label>
              <input
                v-model="formData.phone"
                type="tel"
                required
                placeholder="+998901234567"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 dark:bg-gray-700 dark:text-white sm:text-sm"
                :class="{ 'border-red-500': errors.phone }"
              />
              <span v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</span>
            </div>

            <!-- Bio -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Bio
              </label>
              <textarea
                v-model="formData.bio"
                rows="3"
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 dark:bg-gray-700 dark:text-white sm:text-sm"
                :class="{ 'border-red-500': errors.bio }"
              ></textarea>
              <span v-if="errors.bio" class="text-red-500 text-xs mt-1">{{ errors.bio }}</span>
            </div>

            <!-- Address -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Address
              </label>
              <input
                v-model="formData.address"
                type="text"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 dark:bg-gray-700 dark:text-white sm:text-sm"
                :class="{ 'border-red-500': errors.address }"
              />
              <span v-if="errors.address" class="text-red-500 text-xs mt-1">{{ errors.address }}</span>
            </div>

            <!-- Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                v-model="formData.password"
                type="password"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 dark:bg-gray-700 dark:text-white sm:text-sm"
                :class="{ 'border-red-500': errors.password }"
              />
              <span v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</span>
            </div>

            <!-- Confirm Password -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                v-model="formData.password_confirmation"
                type="password"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 dark:bg-gray-700 dark:text-white sm:text-sm"
                :class="{ 'border-red-500': errors.password_confirmation }"
              />
              <span v-if="errors.password_confirmation" class="text-red-500 text-xs mt-1">{{ errors.password_confirmation }}</span>
            </div>

            <!-- Error message -->
            <div v-if="error" class="text-red-500 text-sm text-center">
              {{ error }}
            </div>

            <!-- Submit button -->
            <div>
              <button
                type="submit"
                :disabled="loading"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i v-if="loading" class="ri-loader-4-line animate-spin mr-2"></i>
                {{ loading ? 'Registering...' : 'Register' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import axios from 'axios'

const { t } = useI18n()
const emit = defineEmits(['close', 'registered'])
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const formData = ref({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  bio: '',
  address: '',
  password: '',
  password_confirmation: '',
  status: 'active'
})

const loading = ref(false)
const error = ref('')
const errors = ref({})

const validateForm = () => {
  errors.value = {}
  let isValid = true

  // First name validation
  if (!formData.value.firstname.trim()) {
    errors.value.firstname = 'First name is required'
    isValid = false
  }

  // Last name validation
  if (!formData.value.lastname.trim()) {
    errors.value.lastname = 'Last name is required'
    isValid = false
  }

  // Email validation
  if (!formData.value.email) {
    errors.value.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = 'Please enter a valid email'
    isValid = false
  }

  // Phone validation
  if (!formData.value.phone) {
    errors.value.phone = 'Phone number is required'
    isValid = false
  } else if (!/^\+998\d{9}$/.test(formData.value.phone)) {
    errors.value.phone = 'Please enter a valid phone number (+998xxxxxxxxx)'
    isValid = false
  }

  // Bio validation
  if (!formData.value.bio.trim()) {
    errors.value.bio = 'Bio is required'
    isValid = false
  }

  // Address validation
  if (!formData.value.address.trim()) {
    errors.value.address = 'Address is required'
    isValid = false
  }

  // Password validation
  if (!formData.value.password) {
    errors.value.password = 'Password is required'
    isValid = false
  } else if (formData.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
    isValid = false
  }

  // Password confirmation validation
  if (!formData.value.password_confirmation) {
    errors.value.password_confirmation = 'Please confirm your password'
    isValid = false
  } else if (formData.value.password !== formData.value.password_confirmation) {
    errors.value.password_confirmation = 'Passwords do not match'
    isValid = false
  }

  return isValid
}

const handleRegister = async () => {
  if (!validateForm()) {
    error.value = 'Please fill in all required fields correctly'
    return
  }

  try {
    loading.value = true
    error.value = ''

    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, formData.value)
    
    emit('registered', {
      email: formData.value.email,
      password: formData.value.password
    })
    emit('close')
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@media (max-width: 640px) {
  .items-end {
    align-items: flex-end;
  }

  .rounded-lg {
    border-radius: 0;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  .sm\:my-8 {
    margin-top: 0;
    margin-bottom: 0;
  }
}
</style>
