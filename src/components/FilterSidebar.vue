<template>
  <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4">
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('category.filter.title') }}</h2>
      <button 
        @click="clearAllFilters"
        class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-500"
      >
        {{ $t('category.filter.clear') }}
      </button>
    </div>

    <!-- Categories -->
    <div class="mb-6">
      <h3 class="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">{{ $t('category.categories.smartphones') }}</h3>
      <div class="space-y-2">
        <label 
          v-for="category in categories" 
          :key="category.id"
          class="flex items-center"
        >
          <input
            type="checkbox"
            :value="category.id"
            v-model="selectedCategories"
            class="rounded border-gray-300 dark:border-gray-600 text-primary-600 dark:text-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400"
          >
          <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">{{ $t(`category.categories.${category.id}`) }}</span>
        </label>
      </div>
    </div>

    <!-- Price Range -->
    <div class="mb-6">
      <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-3">{{ $t('category.filter.price_range') }}</h3>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-xs text-gray-500 dark:text-gray-400">{{ $t('category.filter.min_price') }}</label>
          <input
            type="number"
            v-model="priceRange.min"
            class="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-900 dark:text-white focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400"
          >
        </div>
        <div>
          <label class="text-xs text-gray-500 dark:text-gray-400">{{ $t('category.filter.max_price') }}</label>
          <input
            type="number"
            v-model="priceRange.max"
            class="w-full mt-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-900 dark:text-white focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400"
          >
        </div>
      </div>
    </div>

    <!-- Brands -->
    <div class="mb-6">
      <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-3">{{ $t('category.filter.brand') }}</h3>
      <input
        type="text"
        v-model="brandSearch"
        :placeholder="$t('category.filter.brand_search')"
        class="w-full mb-3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-900 dark:text-white focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400"
      >
      <div class="space-y-2 max-h-48 overflow-y-auto">
        <label 
          v-for="brand in filteredBrands" 
          :key="brand"
          class="flex items-center"
        >
          <input
            type="checkbox"
            :value="brand"
            v-model="selectedBrands"
            class="rounded border-gray-300 dark:border-gray-600 text-primary-600 dark:text-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400"
          >
          <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">{{ brand }}</span>
        </label>
      </div>
    </div>

    <!-- Colors -->
    <div class="mb-6">
      <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-3">{{ $t('category.filter.color') }}</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="color in colors"
          :key="color.value"
          @click="toggleColor(color.value)"
          class="w-8 h-8 rounded-full border-2 transition-all duration-300"
          :class="selectedColors.includes(color.value) ? 'ring-2 ring-primary-500 dark:ring-primary-400 ring-offset-2' : ''"
          :style="{ backgroundColor: color.value }"
          :title="$t(`filters.colors.${color.name}`)"
        ></button>
      </div>
    </div>

    <!-- Rating -->
    <div class="mb-6">
      <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-3">{{ $t('category.filter.rating') }}</h3>
      <div class="space-y-2">
        <label 
          v-for="rating in [5, 4, 3, 2, 1]" 
          :key="rating"
          class="flex items-center"
        >
          <input
            type="checkbox"
            :value="rating"
            v-model="selectedRatings"
            class="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary-600 dark:text-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400"
          >
          <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">
            {{ rating }} {{ $t('category.filter.rating_and_up') }}
          </span>
        </label>
      </div>
    </div>

    <!-- Availability -->
    <div class="mb-6">
      <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-3">{{ $t('category.filter.availability') }}</h3>
      <div class="space-y-2">
        <label class="flex items-center">
          <input
            type="checkbox"
            v-model="inStockOnly"
            class="h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-primary-600 dark:text-primary-500 focus:ring-primary-500 dark:focus:ring-primary-400"
          >
          <span class="ml-2 text-sm text-gray-600 dark:text-gray-300">{{ $t('category.filter.in_stock') }}</span>
        </label>
      </div>
    </div>

    <!-- Apply Button -->
    <button
      @click="applyFilters"
      class="w-full bg-primary-500 dark:bg-primary-600 hover:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-xl transition-colors duration-300"
    >
      {{ $t('category.filter.apply') }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  },
  brands: {
    type: Array,
    default: () => []
  },
  initialFilters: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:filters'])

// Filter states
const selectedCategories = ref(props.initialFilters.categories || [])
const priceRange = ref({
  min: props.initialFilters.minPrice || '',
  max: props.initialFilters.maxPrice || ''
})
const selectedBrands = ref(props.initialFilters.brands || [])
const selectedColors = ref(props.initialFilters.colors || [])
const selectedRatings = ref(props.initialFilters.rating || null)
const inStockOnly = ref(props.initialFilters.inStock || false)
const brandSearch = ref('')

// Available colors
const colors = [
  { name: 'black', value: '#000000' },
  { name: 'white', value: '#FFFFFF' },
  { name: 'gray', value: '#808080' },
  { name: 'silver', value: '#C0C0C0' },
  { name: 'gold', value: '#FFD700' },
  { name: 'red', value: '#FF0000' },
  { name: 'blue', value: '#0000FF' },
  { name: 'green', value: '#008000' }
]

// Computed
const filteredBrands = computed(() => {
  if (!brandSearch.value) return props.brands
  return props.brands.filter(brand => 
    brand.toLowerCase().includes(brandSearch.value.toLowerCase())
  )
})

// Methods
const toggleColor = (color) => {
  const index = selectedColors.value.indexOf(color)
  if (index === -1) {
    selectedColors.value.push(color)
  } else {
    selectedColors.value.splice(index, 1)
  }
}

const clearAllFilters = () => {
  selectedCategories.value = []
  priceRange.value = { min: '', max: '' }
  selectedBrands.value = []
  selectedColors.value = []
  selectedRatings.value = null
  inStockOnly.value = false
  brandSearch.value = ''
  applyFilters()
}

const applyFilters = () => {
  emit('update:filters', {
    categories: selectedCategories.value,
    minPrice: priceRange.value.min,
    maxPrice: priceRange.value.max,
    brands: selectedBrands.value,
    colors: selectedColors.value,
    rating: selectedRatings.value,
    inStock: inStockOnly.value
  })
}
</script>
