&lt;template>
  &lt;transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    &lt;div v-if="show" class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
      &lt;div class="p-4">
        &lt;div class="flex items-start">
          &lt;div class="flex-shrink-0">
            &lt;!-- Success icon -->
            &lt;div v-if="type === 'success'" class="h-6 w-6 text-green-400">
              &lt;svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                &lt;path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              &lt;/svg>
            &lt;/div>
            &lt;!-- Error icon -->
            &lt;div v-if="type === 'error'" class="h-6 w-6 text-red-400">
              &lt;svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                &lt;path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              &lt;/svg>
            &lt;/div>
          &lt;/div>
          &lt;div class="ml-3 w-0 flex-1 pt-0.5">
            &lt;p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ title }}&lt;/p>
            &lt;p class="mt-1 text-sm text-gray-500 dark:text-gray-400">{{ message }}&lt;/p>
          &lt;/div>
          &lt;div class="ml-4 flex flex-shrink-0">
            &lt;button
              @click="$emit('close')"
              class="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              &lt;svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                &lt;path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              &lt;/svg>
            &lt;/button>
          &lt;/div>
        &lt;/div>
      &lt;/div>
    &lt;/div>
  &lt;/transition>
&lt;/template>

&lt;script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error'].includes(value)
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})

defineEmits(['close'])
&lt;/script>
