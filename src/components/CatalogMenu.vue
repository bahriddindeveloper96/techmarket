<template>
  <div class="relative">
    <!-- Trigger button -->
    <button 
      @click="toggleMenu"
      class="bg-[#00BD7E] hover:bg-[#009964] text-white px-6 py-2.5 rounded-lg transition-all duration-300 flex items-center space-x-2 font-medium shadow-lg shadow-[#00BD7E]/10"
    >
      <i class="fas fa-bars"></i>
      <span>Katalog</span>
    </button>

    <!-- Dropdown menu -->
    <div 
      v-if="isOpen"
      class="absolute top-full left-0 mt-2 w-[1248px] h-[420px] bg-white rounded-lg shadow-xl z-50 overflow-hidden container mx-auto px-6 -ml-[210px]"
      @click.stop
    >
      <div class="h-full">
        <div class="grid grid-cols-4 gap-8 h-full py-8">
          <div v-for="category in categories" :key="category.id" class="space-y-4">
            <!-- Category header -->
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100">
                <i :class="category.icon" class="text-gray-600 text-xl"></i>
              </div>
              <h3 class="font-medium text-gray-900 text-lg">{{ category.name }}</h3>
            </div>

            <!-- Subcategories -->
            <div class="space-y-2.5 ml-[3.25rem] overflow-y-auto max-h-[320px] pr-4 scrollbar-thin">
              <a 
                v-for="subCategory in category.subCategories" 
                :key="subCategory.id"
                href="#"
                class="block text-base text-gray-600 hover:text-[#00BD7E] transition-colors py-0.5"
              >
                {{ subCategory.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div 
      v-if="isOpen"
      class="fixed inset-0 bg-black/20 z-40"
      @click="close"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const categories = ref([
  {
    id: 1,
    name: 'Elektronika',
    icon: 'fas fa-mobile-alt',
    subCategories: [
      { id: 1, name: 'Smartfonlar' },
      { id: 2, name: 'Noutbuklar' },
      { id: 3, name: 'Planshetlar' },
      { id: 4, name: 'Televizorlar' },
      { id: 5, name: 'Quloqchinlar' }
    ]
  },
  {
    id: 2,
    name: 'Kiyim',
    icon: 'fas fa-tshirt',
    subCategories: [
      { id: 1, name: 'Erkaklar kiyimi' },
      { id: 2, name: 'Ayollar kiyimi' },
      { id: 3, name: 'Bolalar kiyimi' },
      { id: 4, name: 'Sport kiyimlari' },
      { id: 5, name: 'Poyabzallar' }
    ]
  },
  {
    id: 3,
    name: 'Uy-ro\'zg\'or',
    icon: 'fas fa-home',
    subCategories: [
      { id: 1, name: 'Mebel' },
      { id: 2, name: 'Oshxona jihozlari' },
      { id: 3, name: 'Maishiy texnika' },
      { id: 4, name: 'Yoritish' },
      { id: 5, name: 'Tozalash vositalari' }
    ]
  },
  {
    id: 4,
    name: 'Sport',
    icon: 'fas fa-running',
    subCategories: [
      { id: 1, name: 'Sport kiyimlari' },
      { id: 2, name: 'Sport poyabzali' },
      { id: 3, name: 'Trenajyorlar' },
      { id: 4, name: 'Sport anjomlari' },
      { id: 5, name: 'Velosipedlar' }
    ]
  }
])
</script>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #E5E7EB;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: #D1D5DB;
}
</style>
