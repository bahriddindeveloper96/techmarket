<template>
  <div class="relative group">
    <!-- Catalog Button -->
    <button
      class="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      @click="isOpen = !isOpen"
    >
      <i class="fas fa-bars text-lg"></i>
      <span class="font-medium">Katalog</span>
    </button>

    <!-- Dropdown Menu -->
    <div
      v-show="isOpen"
      class="absolute z-50 w-64 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 transition-all duration-200 transform origin-top"
      @mouseleave="isOpen = false"
    >
      <div class="p-2">
        <div
          v-for="category in categories"
          :key="category.id"
          class="group/item relative"
          @mouseenter="activeCategory = category"
        >
          <!-- Category Item -->
          <a
            :href="category.link"
            class="flex items-center justify-between px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-primary-50 hover:text-primary-600"
          >
            <div class="flex items-center space-x-3">
              <i :class="category.icon" class="text-gray-400 group-hover/item:text-primary-500"></i>
              <span>{{ category.name }}</span>
            </div>
            <i v-if="category.subcategories" class="fas fa-chevron-right text-sm"></i>
          </a>

          <!-- Subcategories -->
          <div
            v-if="category.subcategories && activeCategory === category"
            class="absolute left-full top-0 w-64 ml-0.5 bg-white rounded-lg shadow-lg border border-gray-100"
          >
            <div class="p-2">
              <a
                v-for="subcategory in category.subcategories"
                :key="subcategory.id"
                :href="subcategory.link"
                class="block px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-primary-50 hover:text-primary-600"
              >
                {{ subcategory.name }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
const activeCategory = ref(null)

const categories = [
  {
    id: 1,
    name: 'Kompyuterlar',
    icon: 'fas fa-laptop',
    link: '#',
    subcategories: [
      { id: 1, name: 'Noutbuklar', link: '#' },
      { id: 2, name: 'Monobloklar', link: '#' },
      { id: 3, name: 'Kompyuter jihozlari', link: '#' }
    ]
  },
  {
    id: 2,
    name: 'Smartfonlar',
    icon: 'fas fa-mobile-alt',
    link: '#',
    subcategories: [
      { id: 1, name: 'Apple', link: '#' },
      { id: 2, name: 'Samsung', link: '#' },
      { id: 3, name: 'Xiaomi', link: '#' }
    ]
  },
  {
    id: 3,
    name: 'Televizorlar',
    icon: 'fas fa-tv',
    link: '#',
    subcategories: [
      { id: 1, name: 'Samsung', link: '#' },
      { id: 2, name: 'LG', link: '#' },
      { id: 3, name: 'Sony', link: '#' }
    ]
  },
  {
    id: 4,
    name: 'Foto va Video',
    icon: 'fas fa-camera',
    link: '#',
    subcategories: [
      { id: 1, name: 'Fotoapparatlar', link: '#' },
      { id: 2, name: 'Videokameralar', link: '#' },
      { id: 3, name: 'Aksessuarlar', link: '#' }
    ]
  },
  {
    id: 5,
    name: 'Audio Texnika',
    icon: 'fas fa-headphones',
    link: '#',
    subcategories: [
      { id: 1, name: 'Quloqchinlar', link: '#' },
      { id: 2, name: 'Kolonkalar', link: '#' },
      { id: 3, name: 'Mikrofonlar', link: '#' }
    ]
  },
  {
    id: 6,
    name: 'Soatlar',
    icon: 'fas fa-clock',
    link: '#',
    subcategories: [
      { id: 1, name: 'Apple Watch', link: '#' },
      { id: 2, name: 'Samsung Watch', link: '#' },
      { id: 3, name: 'Fitnes Brasletlar', link: '#' }
    ]
  },
  {
    id: 7,
    name: 'Uy Texnikasi',
    icon: 'fas fa-home',
    link: '#',
    subcategories: [
      { id: 1, name: 'Muzlatkichlar', link: '#' },
      { id: 2, name: 'Kir Yuvish Mashinalari', link: '#' },
      { id: 3, name: 'Konditsionerlar', link: '#' }
    ]
  },
  {
    id: 8,
    name: 'Aksessuarlar',
    icon: 'fas fa-microchip',
    link: '#',
    subcategories: [
      { id: 1, name: 'Quvvatlagichlar', link: '#' },
      { id: 2, name: 'G\'iloflar', link: '#' },
      { id: 3, name: 'Xotira Kartalari', link: '#' }
    ]
  }
]
</script>
