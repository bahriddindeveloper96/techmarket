<template>
  <div class="bg-white rounded-xl p-4">
    <h3 class="font-medium text-base mb-4 text-gray-900">Filterlar</h3>
    
    <!-- Price Range -->
    <div class="mb-6 border-b pb-4">
      <h4 class="font-medium text-sm mb-3 text-gray-900">Narx</h4>
      <div class="flex gap-2 items-center">
        <input type="number" v-model="priceRange.min" placeholder="dan" 
          class="w-1/2 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500">
        <span class="text-gray-400">-</span>
        <input type="number" v-model="priceRange.max" placeholder="gacha"
          class="w-1/2 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-blue-500">
      </div>
    </div>

    <!-- Brand Filter -->
    <div class="mb-6 border-b pb-4">
      <h4 class="font-medium text-sm mb-3 text-gray-900">Brendlar</h4>
      <div class="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar">
        <div v-for="brand in brands" :key="brand.id" class="flex items-center">
          <label class="flex items-center cursor-pointer group">
            <input type="checkbox" 
              :id="brand.id" 
              :value="brand.id"
              v-model="selectedBrands"
              class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-0 focus:ring-offset-0">
            <span class="ml-2 text-sm text-gray-700 group-hover:text-blue-600">{{ brand.name }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Colors Filter -->
    <div class="mb-6 border-b pb-4">
      <h4 class="font-medium text-sm mb-3 text-gray-900">Ranglar</h4>
      <div class="grid grid-cols-6 gap-2">
        <div v-for="color in colors" :key="color.id" class="relative">
          <input type="checkbox" 
            :id="'color-' + color.id"
            :value="color.id"
            v-model="selectedColors"
            class="peer hidden">
          <label 
            :for="'color-' + color.id"
            class="block w-8 h-8 rounded-full cursor-pointer border-2 border-transparent peer-checked:border-blue-600"
            :class="[color.class]"
            :title="color.name"
          ></label>
        </div>
      </div>
    </div>

    <!-- Sizes Filter -->
    <div class="mb-6 border-b pb-4">
      <h4 class="font-medium text-sm mb-3 text-gray-900">O'lchamlar</h4>
      <div class="grid grid-cols-4 gap-2">
        <div v-for="size in sizes" :key="size" class="relative">
          <input type="checkbox" 
            :id="'size-' + size"
            :value="size"
            v-model="selectedSizes"
            class="peer hidden">
          <label 
            :for="'size-' + size"
            class="block text-center py-1.5 border rounded cursor-pointer text-sm text-gray-700 peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-600 hover:border-gray-400"
          >{{ size }}</label>
        </div>
      </div>
    </div>

    <button @click="applyFilters" 
      class="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors">
      Filterlash
    </button>
  </div>
</template>

<script>
export default {
  name: 'FilterSidebar',
  data() {
    return {
      priceRange: {
        min: '',
        max: ''
      },
      selectedBrands: [],
      selectedColors: [],
      selectedSizes: [],
      brands: [
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Samsung' },
        { id: 3, name: 'Xiaomi' },
        { id: 4, name: 'Huawei' }
      ],
      colors: [
        { id: 1, name: 'Qizil', class: 'bg-red-500' },
        { id: 2, name: 'Kulrang', class: 'bg-gray-500' },
        { id: 3, name: 'Yashil', class: 'bg-green-500' },
        { id: 4, name: "Ko'k", class: 'bg-blue-500' },
        { id: 5, name: 'Sariq', class: 'bg-yellow-500' },
        { id: 6, name: 'Jigarrang', class: 'bg-purple-500' }
      ],
      sizes: ['S', 'M', 'L', 'XL', 'XXL']
    }
  },
  methods: {
    applyFilters() {
      this.$emit('apply-filters', {
        priceRange: this.priceRange,
        brands: this.selectedBrands,
        colors: this.selectedColors,
        sizes: this.selectedSizes
      })
    }
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}
</style>
