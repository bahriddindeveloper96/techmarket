<template>
  <div class="fixed inset-0 z-50 bg-white dark:bg-gray-900">
    <!-- Header -->
    <div class="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">{{ $t('nav.catalog') }}</h2>
      <button
        class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
        @click="$emit('close')"
      >
        <i class="ri-close-line text-xl"></i>
      </button>
    </div>

    <!-- Content -->
    <div class="h-[calc(100vh-56px)] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 dark:scrollbar-thumb-purple-400 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
      <!-- Back Button (when subcategory is active) -->
      <div v-if="activeCategory" class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <button
          class="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
          @click="activeCategory = null"
        >
          <i class="ri-arrow-left-s-line text-xl"></i>
          <span>{{ $t('nav.back') }}</span>
        </button>
      </div>

      <!-- Categories List -->
      <div v-if="!activeCategory" class="divide-y divide-gray-100 dark:divide-gray-800">
        <div
          v-for="category in categories"
          :key="category.id"
          class="px-4 py-3"
        >
          <div
            class="flex items-center justify-between"
            @click="handleCategoryClick(category)"
          >
            <div class="flex items-center space-x-3">
              <div class="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                <i :class="[category.icon, 'text-lg dark:text-gray-300']"></i>
              </div>
              <span class="font-medium text-gray-700 dark:text-gray-200">{{ category.name }}</span>
            </div>
            <i class="ri-arrow-right-s-line text-gray-400 dark:text-gray-500"></i>
          </div>
        </div>
      </div>

      <!-- Subcategories View -->
      <div v-else class="pb-8">
        <!-- Category Header -->
        <div class="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ activeCategory.name }}</h3>
        </div>

        <!-- Subcategories -->
        <div class="px-4 py-6 space-y-8">
          <div v-for="subcategory in activeCategory.subcategories" :key="subcategory.id">
            <!-- Subcategory Header -->
            <router-link
              :to="subcategory.link"
              class="block mb-4 text-lg font-medium text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
              @click="handleSubcategoryClick"
            >
              {{ subcategory.name }}
            </router-link>
            
            <!-- Subcategory Items -->
            <ul v-if="subcategory.items" class="space-y-3">
              <li v-for="item in subcategory.items" :key="item.id">
                <router-link
                  :to="item.link"
                  class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  @click="handleSubcategoryClick"
                >
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- Featured Products -->
        <div v-if="activeCategory.featured" class="mt-8 px-4">
          <div class="pt-6 border-t border-gray-100 dark:border-gray-800">
            <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-6">{{ $t('nav.featured') }}</h4>
            <div class="grid grid-cols-2 gap-4">
              <router-link
                v-for="product in activeCategory.featured"
                :key="product.id"
                :to="product.link"
                class="group block"
              >
                <div class="aspect-square rounded-xl bg-gray-100 dark:bg-gray-800 mb-2 overflow-hidden">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p class="text-sm text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">{{ product.name }}</p>
                <p class="text-sm font-medium text-purple-600 dark:text-purple-400 mt-1">{{ product.price }}</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const activeCategory = ref(null)

const emit = defineEmits(['close'])

const handleCategoryClick = (category) => {
  if (category.subcategories && category.subcategories.length > 0) {
    activeCategory.value = category
  } else {
    emit('close')
    router.push(category.link)
  }
}

const handleSubcategoryClick = () => {
  emit('close')
}
// Categories data
const categories = [
  {
    id: 1,
    name: t('mobileCatalog.categories.smartphones'),
    icon: 'ri-smartphone-line',
    link: '/category/1',
    subcategories: [
      {
        id: 1,
        name: t('mobileCatalog.brands'),
        link: '/category/1',
        items: [
          { id: 1, name: 'Apple', link: '/category/1' },
          { id: 2, name: 'Samsung', link: '/category/1' },
          { id: 3, name: 'Xiaomi', link: '/category/1' },
          { id: 4, name: 'Huawei', link: '/category/1' }
        ]
      },
      {
        id: 2,
        name: t('mobileCatalog.byPrice'),
        link: '/category/1',
        items: [
          { 
            id: 1, 
            name: t('mobileCatalog.price.under_1m'), 
            link: '/category/1' 
          },
          { 
            id: 2, 
            name: t('mobileCatalog.price.from_1m_to_3m'), 
            link: '/category/1' 
          },
          { 
            id: 3, 
            name: t('mobileCatalog.price.from_3m_to_5m'), 
            link: '/category/1' 
          },
          { 
            id: 4, 
            name: t('mobileCatalog.price.over_5m'), 
            link: '/category/1' 
          }
        ]
      },
      {
        id: 3,
        name: t('mobileCatalog.ram'),
        link: '/category/1',
        items: [
          { 
            id: 1, 
            name: t('mobileCatalog.ram_options.gb_4'), 
            link: '/category/1' 
          },
          { 
            id: 2, 
            name: t('mobileCatalog.ram_options.gb_6'), 
            link: '/category/1' 
          },
          { 
            id: 3, 
            name: t('mobileCatalog.ram_options.gb_8'), 
            link: '/category/1' 
          },
          { 
            id: 4, 
            name: t('mobileCatalog.ram_options.gb_12_plus'), 
            link: '/category/1' 
          }
        ]
      }
    ],
    featured: [
      {
        id: 1,
        name: 'iPhone 14 Pro Max 256GB Space Black',
        price: '15 999 000 so\'m',
        image: '/images/products/iphone-14-pro-max.jpg',
        link: '/category/1'
      },
      {
        id: 2,
        name: 'Samsung Galaxy S23 Ultra 512GB Green',
        price: '13 999 000 so\'m',
        image: '/images/products/samsung-s23-ultra.jpg',
        link: '/category/1'
      }
    ]
  },
  {
    id: 2,
    name: t('mobileCatalog.categories.tablets'),
    icon: 'ri-tablet-line',
    link: '/category/1',
    subcategories: [
      {
        id: 1,
        name: t('mobileCatalog.brands'),
        link: '/category/1',
        items: [
          { id: 1, name: 'Apple iPad', link: '/category/1' },
          { id: 2, name: 'Samsung Galaxy Tab', link: '/category/1' },
          { id: 3, name: 'Xiaomi Pad', link: '/category/1' },
          { id: 4, name: 'Huawei MatePad', link: '/category/1' }
        ]
      },
      {
        id: 2,
        name: t('mobileCatalog.screenSize'),
        link: '/category/1',
        items: [
          { 
            id: 1, 
            name: t('mobileCatalog.screen_size.under_8'), 
            link: '/category/1' 
          },
          { 
            id: 2, 
            name: t('mobileCatalog.screen_size.from_8_to_10'), 
            link: '/category/1' 
          },
          { 
            id: 3, 
            name: t('mobileCatalog.screen_size.over_10'), 
            link: '/category/1' 
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: t('mobileCatalog.categories.tablet_accessories'),
    icon: 'ri-keyboard-box-line',
    link: '/category/1'
  }
]
</script>

<style scoped>
/* Custom scrollbar styles */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  @apply bg-purple-500 dark:bg-purple-400 rounded-full transition-colors duration-200;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  @apply bg-purple-600 dark:bg-purple-500;
}

/* Hide scrollbar for Firefox */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: theme('colors.purple.500') theme('colors.gray.100');
}

:global(.dark) .scrollbar-thin {
  scrollbar-color: theme('colors.purple.400') theme('colors.gray.800');
}

/* Hide scrollbar for IE and Edge */
.scrollbar-thin {
  -ms-overflow-style: none;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
