<template>
  <div class="relative inline-block text-left">
    <button 
      @click="toggleDropdown" 
      class="inline-flex items-center justify-center px-2 py-1 text-sm text-gray-600 hover:text-primary-600"
      :aria-expanded="isOpen"
    >
      {{ currentLanguageLabel }}
      <i class="fas fa-chevron-down ml-1 text-xs"></i>
    </button>

    <div 
      v-show="isOpen" 
      class="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
    >
      <div class="py-1">
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          {{ lang.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const isOpen = ref(false)

const languages = [
  { code: 'uz', label: "O'zbek" },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' }
]

const currentLanguageLabel = computed(() => {
  const lang = languages.find(l => l.code === locale.value)
  return lang ? lang.label : "O'zbek"
})

const changeLanguage = (langCode) => {
  locale.value = langCode
  localStorage.setItem('language', langCode)
  isOpen.value = false
  document.documentElement.lang = langCode
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  // Saqlangan tilni yuklash
  const savedLanguage = localStorage.getItem('language')
  if (savedLanguage) {
    locale.value = savedLanguage
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
