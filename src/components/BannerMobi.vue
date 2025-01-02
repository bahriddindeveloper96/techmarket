<!-- BannerMobi.vue -->
<template>
  <div class="relative overflow-hidden">
    <!-- Swiper container -->
    <swiper
      :modules="[
        SwiperAutoplay,
        SwiperEffectFade,
        SwiperPagination,
      ]"
      :slides-per-view="1"
      :loop="true"
      :effect="'fade'"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
        dynamicBullets: true,
      }"
      class="h-[200px] rounded-[24px] relative"
    >
      <swiper-slide v-for="banner in banners" :key="banner.id" class="group">
        <div class="relative h-full w-full overflow-hidden">
          <!-- Gradient overlay -->
          <div class="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/60 to-transparent z-10"></div>
          
          <!-- Background patterns -->
          <div class="absolute inset-0 z-0 opacity-30">
            <div class="absolute top-0 left-0 w-32 h-32 bg-primary-500/20 rounded-full filter blur-2xl transform -translate-x-1/2 -translate-y-1/2"></div>
            <div class="absolute bottom-0 right-0 w-40 h-40 bg-accent-500/20 rounded-full filter blur-2xl transform translate-x-1/4 translate-y-1/4"></div>
          </div>

          <!-- Main image -->
          <img
            :src="banner.image"
            :alt="banner.title"
            class="h-full w-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700"
            :style="{
              aspectRatio: '16/9',
              objectPosition: 'center 40%'
            }"
            loading="lazy"
          />

          <!-- Content -->
          <div class="absolute inset-0 z-20 flex items-center">
            <div class="w-full px-5">
              <div class="max-w-[250px]">
                <!-- Badge -->
                <div class="inline-block px-3 py-1 mb-2 bg-white/10 backdrop-blur-sm rounded-full">
                  <span class="text-xs font-medium text-white">New Arrival</span>
                </div>
                
                <!-- Title -->
                <h3 class="text-xl font-bold text-white mb-2 transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300 line-clamp-2">
                  {{ banner.title }}
                </h3>
                
                <!-- Description -->
                <p class="text-sm text-white/90 line-clamp-2 mb-3 transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300 delay-75">
                  {{ banner.description }}
                </p>
                
                <!-- CTA Button -->
                <button class="inline-flex items-center px-4 py-1.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-sm text-white font-medium transition-all duration-300 group-hover:shadow-lg">
                  <span>Learn More</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
  EffectFade as SwiperEffectFade,
  Pagination as SwiperPagination,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
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
}

:deep(.swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.3);
  opacity: 1;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: #fff;
  transform: scale(1.3);
}

:deep(.swiper-pagination) {
  bottom: 12px !important;
}

:deep(.swiper-pagination-bullet-active-main) {
  background: #fff;
}

:deep(.swiper-pagination-bullet-active-prev),
:deep(.swiper-pagination-bullet-active-next) {
  transform: scale(0.9);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

/* Glass effect for buttons and badges */
.backdrop-blur-sm {
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
</style>
