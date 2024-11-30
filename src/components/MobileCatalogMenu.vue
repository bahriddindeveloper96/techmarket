<template>
  <div class="fixed inset-0 z-50 bg-white">
    <!-- Header -->
    <div class="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
      <h2 class="text-lg font-semibold text-gray-900">{{ $t('nav.catalog') }}</h2>
      <button
        class="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        @click="$emit('close')"
      >
        <i class="ri-close-line text-xl"></i>
      </button>
    </div>

    <!-- Content -->
    <div class="h-[calc(100vh-56px)] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-100">
      <!-- Back Button (when subcategory is active) -->
      <div v-if="activeCategory" class="px-4 py-3 border-b border-gray-100">
        <button
          class="flex items-center space-x-2 text-gray-600"
          @click="activeCategory = null"
        >
          <i class="ri-arrow-left-s-line text-xl"></i>
          <span>{{ $t('nav.back') }}</span>
        </button>
      </div>

      <!-- Categories List -->
      <div v-if="!activeCategory" class="divide-y divide-gray-100">
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
              <div class="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-100">
                <i :class="[category.icon, 'text-lg']"></i>
              </div>
              <span class="font-medium text-gray-700">{{ category.name }}</span>
            </div>
            <i class="ri-arrow-right-s-line text-gray-400"></i>
          </div>
        </div>
      </div>

      <!-- Subcategories View -->
      <div v-else class="pb-8">
        <!-- Category Header -->
        <div class="px-4 py-3 border-b border-gray-100">
          <h3 class="text-xl font-semibold text-gray-900">{{ activeCategory.name }}</h3>
        </div>

        <!-- Subcategories -->
        <div class="px-4 py-6 space-y-8">
          <div v-for="subcategory in activeCategory.subcategories" :key="subcategory.id">
            <!-- Subcategory Header -->
            <router-link
              :to="subcategory.link"
              class="block mb-4 text-lg font-medium text-gray-900 hover:text-purple-600"
            >
              {{ subcategory.name }}
            </router-link>
            
            <!-- Subcategory Items -->
            <ul v-if="subcategory.items" class="space-y-3">
              <li v-for="item in subcategory.items" :key="item.id">
                <router-link
                  :to="item.link"
                  class="text-gray-600 hover:text-purple-600 transition-colors"
                >
                  {{ item.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>

        <!-- Featured Products -->
        <div v-if="activeCategory.featured" class="mt-8 px-4">
          <div class="pt-6 border-t border-gray-100">
            <h4 class="text-lg font-medium text-gray-900 mb-6">{{ $t('nav.featured') }}</h4>
            <div class="grid grid-cols-2 gap-4">
              <router-link
                v-for="product in activeCategory.featured"
                :key="product.id"
                :to="product.link"
                class="group block"
              >
                <div class="aspect-square rounded-xl bg-gray-100 mb-2 overflow-hidden">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p class="text-sm text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">{{ product.name }}</p>
                <p class="text-sm font-medium text-purple-600 mt-1">{{ product.price }}</p>
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

const { t } = useI18n()
const activeCategory = ref(null)

defineEmits(['close'])

const handleCategoryClick = (category) => {
  activeCategory.value = category
}

// Categories data
const categories = [
  {
    id: 1,
    name: 'Smartfonlar',
    icon: 'ri-smartphone-line',
    link: '/smartphones',
    subcategories: [
      {
        id: 1,
        name: 'Brendlar',
        link: '/smartphones/brands',
        items: [
          { id: 1, name: 'Apple', link: '/smartphones/brands/apple' },
          { id: 2, name: 'Samsung', link: '/smartphones/brands/samsung' },
          { id: 3, name: 'Xiaomi', link: '/smartphones/brands/xiaomi' },
          { id: 4, name: 'Huawei', link: '/smartphones/brands/huawei' }
        ]
      },
      {
        id: 2,
        name: 'Narx bo\'yicha',
        link: '/smartphones/price',
        items: [
          { id: 1, name: '1 000 000 so\'mgacha', link: '/smartphones/price/under-1m' },
          { id: 2, name: '1-3 million so\'m', link: '/smartphones/price/1m-3m' },
          { id: 3, name: '3-5 million so\'m', link: '/smartphones/price/3m-5m' },
          { id: 4, name: '5 million so\'mdan yuqori', link: '/smartphones/price/over-5m' }
        ]
      },
      {
        id: 3,
        name: 'Operativ xotira',
        link: '/smartphones/ram',
        items: [
          { id: 1, name: '4 GB', link: '/smartphones/ram/4gb' },
          { id: 2, name: '6 GB', link: '/smartphones/ram/6gb' },
          { id: 3, name: '8 GB', link: '/smartphones/ram/8gb' },
          { id: 4, name: '12 GB va undan yuqori', link: '/smartphones/ram/over-12gb' }
        ]
      }
    ],
    featured: [
      {
        id: 1,
        name: 'iPhone 14 Pro Max 256GB Space Black',
        price: '15 999 000 so\'m',
        image: '/images/products/iphone-14-pro-max.jpg',
        link: '/product/iphone-14-pro-max'
      },
      {
        id: 2,
        name: 'Samsung Galaxy S23 Ultra 512GB Green',
        price: '13 999 000 so\'m',
        image: '/images/products/samsung-s23-ultra.jpg',
        link: '/product/samsung-s23-ultra'
      }
    ]
  },
  {
    id: 2,
    name: 'Planshetlar',
    icon: 'ri-tablet-line',
    link: '/tablets',
    subcategories: [
      {
        id: 1,
        name: 'Brendlar',
        link: '/tablets/brands',
        items: [
          { id: 1, name: 'Apple iPad', link: '/tablets/brands/apple' },
          { id: 2, name: 'Samsung Galaxy Tab', link: '/tablets/brands/samsung' },
          { id: 3, name: 'Xiaomi Pad', link: '/tablets/brands/xiaomi' },
          { id: 4, name: 'Huawei MatePad', link: '/tablets/brands/huawei' }
        ]
      },
      {
        id: 2,
        name: 'Ekran o\'lchami',
        link: '/tablets/screen-size',
        items: [
          { id: 1, name: '7-8 dyum', link: '/tablets/screen-size/7-8' },
          { id: 2, name: '9-10 dyum', link: '/tablets/screen-size/9-10' },
          { id: 3, name: '11-12 dyum', link: '/tablets/screen-size/11-12' },
          { id: 4, name: '12 dyumdan katta', link: '/tablets/screen-size/over-12' }
        ]
      },
      {
        id: 3,
        name: 'Xotira hajmi',
        link: '/tablets/storage',
        items: [
          { id: 1, name: '32 GB', link: '/tablets/storage/32gb' },
          { id: 2, name: '64 GB', link: '/tablets/storage/64gb' },
          { id: 3, name: '128 GB', link: '/tablets/storage/128gb' },
          { id: 4, name: '256 GB va undan yuqori', link: '/tablets/storage/over-256gb' }
        ]
      }
    ],
    featured: [
      {
        id: 1,
        name: 'iPad Pro 12.9" 256GB Space Gray',
        price: '12 999 000 so\'m',
        image: '/images/products/ipad-pro.jpg',
        link: '/product/ipad-pro'
      },
      {
        id: 2,
        name: 'Samsung Galaxy Tab S9 Ultra 512GB',
        price: '11 999 000 so\'m',
        image: '/images/products/galaxy-tab-s9.jpg',
        link: '/product/galaxy-tab-s9'
      }
    ]
  },
  {
    id: 3,
    name: 'Planshet aksessuarlari',
    icon: 'ri-keyboard-box-line',
    link: '/tablet-accessories',
    subcategories: [
      {
        id: 1,
        name: 'Klaviaturalar',
        link: '/tablet-accessories/keyboards',
        items: [
          { id: 1, name: 'Apple Magic Keyboard', link: '/tablet-accessories/keyboards/magic-keyboard' },
          { id: 2, name: 'Samsung Book Cover Keyboard', link: '/tablet-accessories/keyboards/book-cover' },
          { id: 3, name: 'Logitech Klaviaturalar', link: '/tablet-accessories/keyboards/logitech' }
        ]
      },
      {
        id: 2,
        name: 'Ruchkalar',
        link: '/tablet-accessories/pens',
        items: [
          { id: 1, name: 'Apple Pencil', link: '/tablet-accessories/pens/apple-pencil' },
          { id: 2, name: 'S Pen', link: '/tablet-accessories/pens/s-pen' },
          { id: 3, name: 'Boshqa ruchkalar', link: '/tablet-accessories/pens/other' }
        ]
      },
      {
        id: 3,
        name: 'G\'iloflar',
        link: '/tablet-accessories/cases',
        items: [
          { id: 1, name: 'Smart Case', link: '/tablet-accessories/cases/smart-case' },
          { id: 2, name: 'Book Cover', link: '/tablet-accessories/cases/book-cover' },
          { id: 3, name: 'Himoya g\'iloflari', link: '/tablet-accessories/cases/protective' }
        ]
      }
    ],
    featured: [
      {
        id: 1,
        name: 'Apple Magic Keyboard iPad Pro 12.9"',
        price: '3 999 000 so\'m',
        image: '/images/products/magic-keyboard.jpg',
        link: '/product/magic-keyboard'
      },
      {
        id: 2,
        name: 'Apple Pencil 2',
        price: '1 999 000 so\'m',
        image: '/images/products/apple-pencil.jpg',
        link: '/product/apple-pencil'
      }
    ]
  }
]
</script>

<style scoped>
/* Custom scrollbar styles */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  @apply bg-gray-100;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  @apply bg-purple-500 rounded-full transition-colors duration-200;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  @apply bg-purple-600;
}

/* Hide scrollbar for Firefox */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: #8B5CF6 #F3F4F6;
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
