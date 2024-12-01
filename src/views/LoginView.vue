<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <PhoneAuth 
        :isOpen="true"
        @onLogin="handleLogin"
        @update:isOpen="handleClose"
      />
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import PhoneAuth from '../components/PhoneAuth.vue'

const router = useRouter()
const route = useRoute()

const handleLogin = (user) => {
  // Redirect to the original destination or home
  const redirectPath = route.query.redirect || '/'
  router.push(redirectPath)
}

const handleClose = (isOpen) => {
  if (!isOpen) {
    router.push('/')
  }
}
</script>
