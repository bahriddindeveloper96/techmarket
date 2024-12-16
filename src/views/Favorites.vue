<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ $t('favorites.title') }}</h1>
      <p class="text-gray-600 dark:text-gray-400">{{ $t('favorites.subtitle', { count: favoriteStore.count }) }}</p>
    </div>

    <!-- Empty State -->
    <div v-if="favoriteStore.count === 0" class="text-center py-16">
      <div class="w-24 h-24 mx-auto mb-6 text-gray-300 dark:text-gray-700">
        <i class="ri-heart-3-line text-6xl"></i>
      </div>
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">{{ $t('favorites.empty.title') }}</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-6">{{ $t('favorites.empty.description') }}</p>
      <router-link 
        to="/" 
        class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-300"
      >
        {{ $t('favorites.empty.button') }}
      </router-link>
    </div>

    <!-- Products Grid -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      <ProductCard 
        v-for="product in favoriteStore.items" 
        :key="product.id" 
        :product="product"
        class="h-full"
      />
    </div>
  </div>
</template>

<script setup>
import { useFavoriteStore } from '@/stores/favoriteStore'
import ProductCard from '@/components/ProductCard.vue'

const favoriteStore = useFavoriteStore()
</script>

<i18n>
{
  "en": {
    "favorites": {
      "title": "Favorites",
      "subtitle": "You have {count} items in your favorites",
      "empty": {
        "title": "Your favorites list is empty",
        "description": "Start adding products you like to your favorites list",
        "button": "Continue Shopping"
      }
    }
  },
  "ru": {
    "favorites": {
      "title": "Избранное",
      "subtitle": "У вас {count} товаров в избранном",
      "empty": {
        "title": "Ваш список избранного пуст",
        "description": "Начните добавлять понравившиеся товары в избранное",
        "button": "Продолжить покупки"
      }
    }
  },
  "uz": {
    "favorites": {
      "title": "Sevimlilar",
      "subtitle": "Sevimlilar ro'yxatingizda {count} ta mahsulot bor",
      "empty": {
        "title": "Sevimlilar ro'yxati bo'sh",
        "description": "Yoqtirgan mahsulotlaringizni sevimlilarga qo'shing",
        "button": "Xarid qilishni davom ettirish"
      }
    }
  }
}
</i18n>
