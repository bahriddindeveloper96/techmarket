<template>
  <div class="flex items-center space-x-2">
    <button 
      :class="[
        'w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300',
        isDark ? 'bg-white border-2 border-gray-200' : 'bg-white border-2 border-primary-500'
      ]"
      @click="toggleTheme(false)"
    >
      <i :class="['ri-sun-line text-xl', !isDark ? 'text-primary-500' : 'text-gray-400']"></i>
    </button>
    <button 
      :class="[
        'w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300',
        isDark ? 'bg-gray-900 border-2 border-primary-500' : 'bg-gray-900 border-2 border-gray-200'
      ]"
      @click="toggleTheme(true)"
    >
      <i :class="['ri-moon-line text-xl', isDark ? 'text-primary-500' : 'text-gray-400']"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const isDark = ref(localStorage.getItem('theme') === 'dark')

const toggleTheme = (dark) => {
  isDark.value = dark
}

watch(isDark, (newValue) => {
  localStorage.setItem('theme', newValue ? 'dark' : 'light')
  if (newValue) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}, { immediate: true })

onMounted(() => {
  // Check system preference on first load
  if (!localStorage.getItem('theme')) {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
})
</script>
