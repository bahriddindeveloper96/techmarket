<!-- CategoryCard.vue -->
<template>
  <router-link :to="{ name: 'category', params: { id: category.id }}" class="block">
    <div class="group relative h-48 rounded-2xl overflow-hidden cursor-pointer bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <!-- Background image -->
      <img 
        :src="category.image" 
        :alt="category.name" 
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      >
      
      <!-- Overlay gradient -->
      <div class="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-purple-900/30 to-transparent transition-opacity duration-300">
        <div class="absolute bottom-0 left-0 right-0 p-4">
          <h3 class="text-white text-lg font-semibold mb-1">{{ category.name }}</h3>
          <p class="text-white/80 text-sm">
            {{ category.itemCount || '1000+'}} mahsulot
          </p>
        </div>
      </div>

      <!-- Hover effect -->
      <div class="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue'

defineProps({
  category: {
    type: Object,
    required: true
  }
})
</script>
