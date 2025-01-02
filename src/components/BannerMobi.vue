<!-- BannerMobi.vue -->
<template>
  <div class="relative overflow-hidden px-2">
    <!-- Swiper container -->
    <swiper
      :modules="[
        SwiperAutoplay,
        SwiperPagination,
      ]"
      :slides-per-view="1.1"
      :space-between="8"
      :loop="true"
      :speed="600"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
        dynamicBullets: true,
      }"
      class="h-[160px] relative banner-swiper"
    >
      <swiper-slide v-for="banner in banners" :key="banner.id" class="group">
        <div class="relative h-full w-full overflow-hidden rounded-lg">
          <!-- Main image -->
          <img
            :src="banner.image"
            :alt="banner.title"
            class="h-full w-full object-cover"
            :style="{
              aspectRatio: '16/9',
              objectPosition: 'center center'
            }"
            loading="lazy"
          />

          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>

          <!-- Content -->
          <div class="absolute inset-0 flex items-center">
            <div class="w-full px-4">
              <div class="max-w-[200px]">
                <!-- Title -->
                <h3 class="text-base font-semibold text-white mb-1.5 line-clamp-2">
                  {{ banner.title }}
                </h3>
                
                <!-- Description -->
                <p class="text-xs text-white/90 line-clamp-2 mb-3">
                  {{ banner.description }}
                </p>
                
                <!-- Button -->
                <button class="inline-flex items-center px-3 py-1.5 bg-white/90 hover:bg-white rounded text-xs font-medium text-gray-900 transition-colors">
                  <span>Batafsil</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Autoplay as SwiperAutoplay,
  Pagination as SwiperPagination,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const props = defineProps({
  banners: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<style scoped>
:deep(.swiper) {
  width: 100%;
  height: 100%;
  padding-bottom: 24px !important;
}

:deep(.swiper-pagination) {
  bottom: 0 !important;
}

:deep(.swiper-pagination-bullet) {
  width: 6px;
  height: 6px;
  background: #e5e7eb;
  opacity: 1;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: #3b82f6;
  transform: scale(1.2);
}

/* Custom styles for banner swiper */
.banner-swiper :deep(.swiper-slide) {
  transition: transform 0.3s ease;
}

.banner-swiper :deep(.swiper-slide-active) {
  transform: scale(1);
}

.banner-swiper :deep(.swiper-slide-prev),
.banner-swiper :deep(.swiper-slide-next) {
  transform: scale(0.95);
}
</style>
