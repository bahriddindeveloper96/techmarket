<template>
  <div class="relative bg-white/30 dark:bg-gray-900/30 backdrop-blur-2xl rounded-lg shadow-2xl p-6 border border-white/20 dark:border-gray-800/50 overflow-hidden text-xs">
    <!-- Animated Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-purple-500/5 animate-gradient"></div>
    <div class="absolute -top-32 -right-32 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

    <!-- Content Container -->
    <div class="relative z-10">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-base font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            {{ $t('category.filter.title') }}
          </h2>
          <p class="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{{ $t('category.filter.subtitle') }}</p>
        </div>
        <button 
          @click="clearAllFilters"
          class="px-3 py-1.5 text-[10px] text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all duration-300"
        >
          <i class="ri-refresh-line mr-0.5"></i>
          {{ $t('category.filter.clear') }}
        </button>
      </div>

      <!-- Categories -->
      <div class="space-y-6">
        <!-- Categories Section -->
        <div class="filter-section">
          <h3 class="filter-title">
            <i class="ri-layout-grid-line text-primary-500"></i>
            {{ $t('category.categories.smartphones') }}
          </h3>
          <div class="grid grid-cols-2 gap-2">
            <label 
              v-for="category in categories" 
              :key="category.id"
              class="relative group"
            >
              <input
                type="checkbox"
                :value="category.id"
                v-model="selectedCategories"
                class="peer hidden"
              >
              <div class="p-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-300
                         hover:border-primary-500 dark:hover:border-primary-500
                         peer-checked:border-primary-500 peer-checked:bg-primary-500/10
                         group-hover:transform group-hover:scale-[1.02]">
                <span class="text-[11px] text-gray-700 dark:text-gray-300 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {{ $t(`category.categories.${category.id}`) }}
                </span>
                <i class="ri-check-line absolute right-2 top-1/2 -translate-y-1/2 text-primary-500 opacity-0 peer-checked:opacity-100 transition-all duration-300 text-xs"></i>
              </div>
            </label>
          </div>
        </div>

        <!-- Price Range -->
        <div class="filter range-filter">
          <div class="title-wrapper title-wrapper--range">
            <span data-test-id="text__filter-name" class="slightly transparent hug title-text">
              {{ $t('category.filter.price_range') }}
            </span>
          </div>
          <div class="range-filter-wrapper">
            <div class="range-controls">
              <div class="range-field">
                <!-- Min price input -->
                <div input-form-group="">
                  <div class="range-filter-prefix">от</div>
                  <div express="" data-test-id="text__input-validation-error" class="">
                    <input 
                      :id="'min-price-input'"
                      type="tel"
                      :max="maxPrice"
                      :placeholder="minPrice"
                      data-test-id="input__min-price"
                      class="js-virtual-keyboard-min-value"
                      :value="priceRange.min"
                      @input="e => handleInputChange('min', e)"
                      style="text-indent: 30px;"
                    >
                  </div>
                </div>
                <!-- Max price input -->
                <div input-form-group="">
                  <div class="range-filter-prefix">до</div>
                  <div express="" data-test-id="text__input-validation-error" class="">
                    <input 
                      :id="'max-price-input'"
                      type="tel"
                      :max="maxPrice"
                      :placeholder="maxPrice"
                      data-test-id="input__max-price"
                      class="js-virtual-keyboard-max-value"
                      :value="priceRange.max"
                      @input="e => handleInputChange('max', e)"
                      style="text-indent: 30px;"
                    >
                  </div>
                </div>
              </div>
              <!-- Range slider -->
              <div class="range-line">
                <div class="range-spector">
                  <div 
                    class="range-spector__selected"
                    :style="{
                      left: ((priceRange.min - minPrice) / (maxPrice - minPrice) * 100) + '%',
                      right: (100 - (priceRange.max - minPrice) / (maxPrice - minPrice) * 100) + '%'
                    }"
                  >
                    <div 
                      class="draggable-button draggable-button--left"
                      @mousedown="startDragging('min')"
                    ></div>
                    <div 
                      class="draggable-button draggable-button--right"
                      @mousedown="startDragging('max')"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Brands -->
        <div class="filter-section">
          <h3 class="filter-title">
            <i class="ri-store-2-line text-blue-500"></i>
            {{ $t('category.filter.brand') }}
          </h3>
          <div class="relative group mb-3">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-primary-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative">
              <i class="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
              <input
                type="text"
                v-model="brandSearch"
                :placeholder="$t('category.filter.brand_search')"
                class="w-full pl-8 pr-3 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-xl text-[11px]
                       focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
              >
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto custom-scrollbar">
            <label 
              v-for="brand in filteredBrands" 
              :key="brand"
              class="relative group"
            >
              <input
                type="checkbox"
                :value="brand"
                v-model="selectedBrands"
                class="peer hidden"
              >
              <div class="p-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-300
                         hover:border-primary-500 dark:hover:border-primary-500
                         peer-checked:border-primary-500 peer-checked:bg-primary-500/10
                         group-hover:transform group-hover:scale-[1.02]">
                <span class="text-[11px] text-gray-700 dark:text-gray-300 group-hover:text-primary-500 dark:group-hover:text-primary-400">
                  {{ brand }}
                </span>
                <i class="ri-check-line absolute right-2 top-1/2 -translate-y-1/2 text-primary-500 opacity-0 peer-checked:opacity-100 transition-all duration-300 text-xs"></i>
              </div>
            </label>
          </div>
        </div>

        <!-- Colors -->
        <div class="filter-section">
          <h3 class="filter-title">
            <i class="ri-palette-line text-yellow-500"></i>
            {{ $t('category.filter.color') }}
          </h3>
          <div class="flex flex-wrap gap-3">
            <button
              v-for="color in colors"
              :key="color.value"
              @click="toggleColor(color.value)"
              class="group relative"
            >
              <div class="w-8 h-8 rounded-xl transition-all duration-300 transform hover:scale-110 relative
                          border-2 shadow-lg hover:shadow-xl"
                :class="selectedColors.includes(color.value) ? 'ring-2 ring-primary-500 ring-offset-2' : ''"
                :style="{ backgroundColor: color.value }"
              >
                <div v-if="selectedColors.includes(color.value)" 
                  class="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg backdrop-blur-sm">
                  <i class="ri-check-line text-white text-xs"></i>
                </div>
              </div>
              <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 w-max px-2 py-0.5 bg-gray-900/80 dark:bg-gray-700/80 
                          text-white text-[10px] rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300
                          backdrop-blur-sm">
                {{ $t(`filters.colors.${color.name}`) }}
              </div>
            </button>
          </div>
        </div>

        <!-- Rating -->
        <div class="filter-section">
          <h3 class="filter-title">
            <i class="ri-star-line text-amber-500"></i>
            {{ $t('category.filter.rating') }}
          </h3>
          <div class="space-y-2">
            <label 
              v-for="rating in [5, 4, 3, 2, 1]" 
              :key="rating"
              class="relative group block"
            >
              <input
                type="checkbox"
                :value="rating"
                v-model="selectedRatings"
                class="peer hidden"
              >
              <div class="p-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-300
                         hover:border-primary-500 dark:hover:border-primary-500
                         peer-checked:border-primary-500 peer-checked:bg-primary-500/10
                         group-hover:transform group-hover:scale-[1.02]">
                <div class="flex items-center justify-between">
                  <div class="flex gap-0.5">
                    <i v-for="i in rating" :key="i" 
                      class="ri-star-fill text-amber-400 transition-transform duration-300 group-hover:scale-110 text-[11px]"></i>
                    <i v-for="i in 5-rating" :key="i+rating" 
                      class="ri-star-line text-gray-300 dark:text-gray-600 text-[11px]"></i>
                  </div>
                  <span class="text-[10px] text-gray-600 dark:text-gray-400">
                    {{ $t('category.filter.rating_and_up') }}
                  </span>
                </div>
              </div>
            </label>
          </div>
        </div>

        <!-- Availability -->
        <div class="filter-section">
          <h3 class="filter-title">
            <i class="ri-checkbox-circle-line text-emerald-500"></i>
            {{ $t('category.filter.availability') }}
          </h3>
          <label class="relative group block">
            <input
              type="checkbox"
              v-model="inStockOnly"
              class="peer hidden"
            >
            <div class="p-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-300
                       hover:border-primary-500 dark:hover:border-primary-500
                       peer-checked:border-primary-500 peer-checked:bg-primary-500/10
                       group-hover:transform group-hover:scale-[1.02]">
              <div class="flex items-center justify-between">
                <span class="text-[11px] text-gray-700 dark:text-gray-300">
                  {{ $t('category.filter.in_stock') }}
                </span>
                <i class="ri-check-line text-primary-500 opacity-0 peer-checked:opacity-100 transition-all duration-300 text-xs"></i>
              </div>
            </div>
          </label>
        </div>
      </div>

      <!-- Apply Button -->
      <div class="mt-6 relative group">
        <div class="absolute inset-0 bg-gradient-to-r from-primary-500 to-purple-500 rounded-xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
        <button
          @click="applyFilters"
          class="relative w-full py-2.5 bg-gradient-to-r from-primary-500 to-purple-500 hover:from-primary-600 hover:to-purple-600
                 text-white rounded-xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98]
                 font-medium text-xs shadow-lg shadow-primary-500/20 group-hover:shadow-xl
                 flex items-center justify-center gap-1.5"
        >
          <i class="ri-filter-3-line text-sm group-hover:rotate-180 transition-transform duration-500"></i>
          {{ $t('category.filter.apply') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  initialFilters: {
    type: Object,
    default: () => ({})
  },
  brands: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:filters'])

// Constants
const minPrice = ref(0)
const maxPrice = ref(10000)
const step = ref(100)

// Filter states
const selectedCategories = ref(props.initialFilters.categories || [])
const priceRange = ref({
  min: props.initialFilters.minPrice || minPrice.value,
  max: props.initialFilters.maxPrice || maxPrice.value
})
const selectedBrands = ref(props.initialFilters.brands || [])
const selectedColors = ref(props.initialFilters.colors || [])
const selectedRatings = ref(props.initialFilters.rating || null)
const inStockOnly = ref(props.initialFilters.inStock || false)
const brandSearch = ref('')

// Available colors
const colors = [
  { name: 'black', value: '#000000' },
  { name: 'white', value: '#ffffff' },
  { name: 'red', value: '#ff0000' },
  { name: 'blue', value: '#0000ff' },
  { name: 'green', value: '#008000' }
]

// Mobile filter state
const showMobileFilter = ref(false)

// Apply filters and close modal
const applyMobileFilters = () => {
  applyFilters()
  showMobileFilter.value = false
}

// Watch mobile filter state
watch(showMobileFilter, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Close on escape key
const handleEscape = (e) => {
  if (e.key === 'Escape' && showMobileFilter.value) {
    showMobileFilter.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})

// Methods
let filterTimeout = null

const isDragging = ref(false)
const currentHandle = ref(null)

const startDragging = (handle) => {
  isDragging.value = true
  currentHandle.value = handle
  document.addEventListener('mousemove', handleDragging)
  document.addEventListener('mouseup', stopDragging)
}

const handleDragging = (e) => {
  if (!isDragging.value) return
  
  const rangeRect = document.querySelector('.range-spector').getBoundingClientRect()
  const percentage = Math.max(0, Math.min(100, ((e.clientX - rangeRect.left) / rangeRect.width) * 100))
  const value = Math.round((percentage / 100) * (maxPrice.value - minPrice.value) + minPrice.value)
  
  if (currentHandle.value === 'min') {
    if (value < priceRange.value.max) {
      priceRange.value.min = Math.max(minPrice.value, value)
    }
  } else {
    if (value > priceRange.value.min) {
      priceRange.value.max = Math.min(maxPrice.value, value)
    }
  }
  
  handleRangeInput(currentHandle.value)
}

const stopDragging = () => {
  isDragging.value = false
  currentHandle.value = null
  document.removeEventListener('mousemove', handleDragging)
  document.removeEventListener('mouseup', stopDragging)
}

const handleRangeInput = (type) => {
  validateRange(type)
  if (filterTimeout) clearTimeout(filterTimeout)
  filterTimeout = setTimeout(() => {
    applyFilters()
  }, 300)
}

const handleInputChange = (type, event) => {
  const value = parseInt(event.target.value) || 0
  
  if (type === 'min') {
    priceRange.value.min = Math.max(minPrice.value, Math.min(priceRange.value.max, value))
  } else {
    priceRange.value.max = Math.min(maxPrice.value, Math.max(priceRange.value.min, value))
  }
  
  if (filterTimeout) clearTimeout(filterTimeout)
  filterTimeout = setTimeout(() => {
    applyFilters()
  }, 300)
}

const validateRange = (type) => {
  if (type === 'min') {
    if (priceRange.value.min > priceRange.value.max) {
      priceRange.value.min = priceRange.value.max
    }
    if (priceRange.value.min < minPrice.value) {
      priceRange.value.min = minPrice.value
    }
  } else {
    if (priceRange.value.max < priceRange.value.min) {
      priceRange.value.max = priceRange.value.min
    }
    if (priceRange.value.max > maxPrice.value) {
      priceRange.value.max = maxPrice.value
    }
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US').format(price)
}

// Computed
const filteredBrands = computed(() => {
  if (!brandSearch.value) return props.brands
  return props.brands.filter(brand => 
    brand.toLowerCase().includes(brandSearch.value.toLowerCase())
  )
})

const clearAllFilters = () => {
  selectedCategories.value = []
  priceRange.value = { min: minPrice.value, max: maxPrice.value }
  selectedBrands.value = []
  selectedColors.value = []
  selectedRatings.value = null
  inStockOnly.value = false
  brandSearch.value = ''
  applyFilters()
}

const toggleColor = (color) => {
  const index = selectedColors.value.indexOf(color)
  if (index === -1) {
    selectedColors.value.push(color)
  } else {
    selectedColors.value.splice(index, 1)
  }
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

<style scoped>
.filter {
  @apply mb-6;
}

.range-filter {
  @apply relative;
}

.title-wrapper {
  @apply mb-4;
}

.title-wrapper--range {
  @apply flex items-center justify-between;
}

.title-text {
  @apply text-sm font-medium text-gray-700 dark:text-gray-300;
}

.range-filter-wrapper {
  @apply relative;
}

.range-controls {
  @apply space-y-4;
}

.range-field {
  @apply flex gap-4;
}

[input-form-group] {
  @apply relative flex-1;
}

.range-filter-prefix {
  @apply absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500;
}

input[type="tel"] {
  @apply w-full border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200;
}

.range-line {
  @apply relative mt-2;
}

.range-spector {
  @apply relative h-1 bg-gray-200 dark:bg-gray-700;
}

.range-spector__selected {
  @apply absolute h-full bg-blue-500;
}

.draggable-button {
  @apply absolute top-1/2 h-3 w-3 -translate-y-1/2 cursor-pointer rounded-full border border-blue-500 bg-white transition-transform hover:scale-110 dark:bg-gray-800;
}

.draggable-button--left {
  @apply -left-1.5;
}

.draggable-button--right {
  @apply -right-1.5;
}

/* Input validation styles */
.text__input-validation-error {
  @apply relative;
}

.filter-section {
  @apply relative;
}

.filter-title {
  @apply flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4;
}

.custom-scrollbar {
  scrollbar-width: thin;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded-sm;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}

.range-input[type="range"] {
  -webkit-appearance: none;
  height: 4px;
  background: transparent;
  cursor: pointer;
  pointer-events: auto;
}

.range-input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 1rem;
  height: 1rem;
  background: white;
  border: 2px solid #0ea5e9;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  z-index: 20;
}

.range-input[type="range"]::-moz-range-thumb {
  width: 1rem;
  height: 1rem;
  background: white;
  border: 2px solid #0ea5e9;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  z-index: 20;
}

.range-input[type="range"]::-webkit-slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 0 10px rgba(14, 165, 233, 0.3);
}

.range-input[type="range"]::-moz-range-thumb:hover {
  transform: scale(1.2);
  box-shadow: 0 0 10px rgba(14, 165, 233, 0.3);
}

.dark .range-input[type="range"]::-webkit-slider-thumb {
  background: #1f2937;
}

.dark .range-input[type="range"]::-moz-range-thumb {
  background: #1f2937;
}

/* Ensure the second range input's thumb has a different color */
.range-input[type="range"]:nth-of-type(2)::-webkit-slider-thumb {
  border-color: #22c55e;
}

.range-input[type="range"]:nth-of-type(2)::-moz-range-thumb {
  border-color: #22c55e;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 400% 400%;
  animation: gradient 8s ease infinite;
}
</style>
