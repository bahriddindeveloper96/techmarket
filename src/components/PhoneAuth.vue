<template>
  <Transition name="modal">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Modal backdrop -->
      <div class="absolute inset-0 bg-black bg-opacity-50" @click="closeModal"></div>
      
      <!-- Modal content -->
      <div class="relative bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-96 max-w-[90%]">
        <button 
          @click="closeModal" 
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <i class="ri-close-line text-xl"></i>
        </button>

        <h2 class="text-2xl font-bold mb-6 text-center dark:text-white">Telefon orqali kirish</h2>
        
        <!-- Telefon raqamni kiritish -->
        <div v-if="!codeSent">
          <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Telefon raqam
            </label>
            <input 
              type="tel" 
              v-model="phoneNumber"
              placeholder="+998901234567"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
          </div>
          <button 
            @click="sendCode"
            :disabled="loading"
            class="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!loading">Kodni yuborish</span>
            <span v-else class="flex items-center justify-center">
              <i class="ri-loader-4-line animate-spin mr-2"></i>
              Yuborilmoqda...
            </span>
          </button>
        </div>

        <!-- Tasdiqlash kodi -->
        <div v-else>
          <div class="mb-4">
            <label class="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Tasdiqlash kodi
            </label>
            <input 
              type="text" 
              v-model="verificationCode"
              placeholder="Kodni kiriting"
              class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
          </div>
          <button 
            @click="verifyCode"
            :disabled="loading"
            class="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!loading">Tasdiqlash</span>
            <span v-else class="flex items-center justify-center">
              <i class="ri-loader-4-line animate-spin mr-2"></i>
              Tekshirilmoqda...
            </span>
          </button>
          <button 
            @click="resetForm"
            class="w-full mt-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm"
          >
            Qayta urinish
          </button>
        </div>

        <!-- Xatolik xabari -->
        <div v-if="error" class="mt-4 text-red-500 text-sm text-center">
          {{ error }}
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase/config'

const router = useRouter()

// Props
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
    default: true
  }
})

// Emits
const emit = defineEmits(['update:isOpen', 'onLogin'])

// State
const phoneNumber = ref('')
const verificationCode = ref('')
const codeSent = ref(false)
const error = ref('')
const loading = ref(false)

// Methods
const closeModal = () => {
  emit('update:isOpen', false)
  resetForm()
  // Login sahifasidan home ga yo'naltirish
  if (window.location.pathname === '/login') {
    router.push('/')
  }
}

const resetForm = () => {
  phoneNumber.value = ''
  verificationCode.value = ''
  codeSent.value = false
  error.value = ''
  loading.value = false
}

const sendCode = async () => {
  try {
    loading.value = true
    error.value = ''

    // Telefon raqamni tekshirish
    if (!phoneNumber.value.match(/^\+998\d{9}$/)) {
      throw new Error('Noto\'g\'ri telefon raqam formati. Masalan: +998901234567')
    }

    // Test uchun kodni yuborish
    await new Promise(resolve => setTimeout(resolve, 1000))
    codeSent.value = true
    
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const verifyCode = async () => {
  try {
    loading.value = true
    error.value = ''

    // Kodni tekshirish
    if (!verificationCode.value) {
      throw new Error('Iltimos, kodni kiriting')
    }

    // Test uchun kodni tekshirish (123456)
    if (verificationCode.value !== '123456') {
      throw new Error('Noto\'g\'ri kod')
    }

    // Test uchun kutish
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Mock user object
    const user = {
      phone: phoneNumber.value,
      id: 'test-user-id'
    }

    // Auth state update
    auth.currentUser = user

    // Success callback
    emit('onLogin', user)
    closeModal()
    
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>