<template>
  <div class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <!-- Background overlay -->
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="handleClose"></div>

    <!-- Modal panel -->
    <div class="flex min-h-full items-end sm:items-center justify-center p-4 text-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md w-full">
        <!-- Modal header -->
        <div class="flex items-center justify-between px-4 py-3 border-b dark:border-gray-700">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            Login
          </h3>
          <button
            @click="handleClose"
            class="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <span class="sr-only">Close</span>
            <i class="ri-close-line text-xl"></i>
          </button>
        </div>

        <!-- Modal content -->
        <div class="px-4 py-5 sm:p-6">
          <form class="space-y-6" @submit.prevent="handleLogin">
            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <div class="mt-1">
                <input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <!-- Password -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div class="mt-1">
                <input
                  id="password"
                  v-model="password"
                  type="password"
                  required
                  class="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400 dark:focus:border-primary-400 dark:bg-gray-700 dark:text-white sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
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
                {{ loading ? 'Logging in...' : 'Login' }}
              </button>
            </div>

            <!-- Register link -->
            <div class="text-sm text-center">
              <span class="text-gray-600 dark:text-gray-400">
                Don't have an account?
              </span>
              <router-link
                to="/register"
                class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
              >
                Register
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  try {
    loading.value = true
    error.value = ''

    await authStore.login(email.value, password.value)
    
    // Redirect to the original destination or home
    const redirectPath = route.query.redirect || '/'
    router.push(redirectPath)

  } catch (err) {
    error.value = err.message || 'Login failed'
  } finally {
    loading.value = false
  }
}

const handleClose = () => {
  router.push('/')
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
