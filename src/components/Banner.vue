<!-- Banner.vue -->
<template>
  <div
    class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-accent-600"
  >
    <!-- Swiper container -->
    <swiper
      :modules="[
        SwiperAutoplay,
        SwiperEffectFade,
        SwiperPagination,
        SwiperNavigation,
      ]"
      :slides-per-view="1"
      :loop="true"
      :effect="'fade'"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
      }"
      :navigation="true"
      class="h-[200px] sm:h-[300px] md:h-[400px]"
    >
      <swiper-slide v-for="banner in banners" :key="banner.id">
        <div class="relative h-full w-full">
          <div
            class="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-transparent"
          ></div>
          <img
            :src="banner.image"
            :alt="banner.title"
            class="h-full w-full object-cover object-center md:object-[center_30%]"
            :style="{
              aspectRatio: '16/9',
              objectPosition: windowWidth < 768 ? 'center 40%' : 'center 30%'
            }"
          />
          <div class="absolute inset-0 flex items-center">
            <div class="container mx-auto px-4">
              <div class="max-w-lg">
                <!-- <h2
                  class="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4 animate-float"
                >
                  {{ $t(`${banner.title}`) }}
                </h2>
                <p class="text-sm sm:text-base md:text-lg text-white/90 mb-4 md:mb-8 line-clamp-2 md:line-clamp-none">
                  {{ $t(`${banner.title}`) }}
                </p> -->
                <div class="flex space-x-4">
                  <!-- <button
                    class="px-4 sm:px-6 md:px-8 py-2 md:py-3 bg-white text-primary-600 rounded-full text-sm sm:text-base font-semibold hover:bg-primary-50 transition-colors"
                  >
                    {{ $t(`${banner.title}`) }}
                  </button> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <!-- Decorative elements -->
    <div
      class="absolute top-0 right-0 w-1/3 h-full bg-white/5 backdrop-blur-3xl transform skew-x-12 translate-x-1/2"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { Swiper, SwiperSlide } from "swiper/vue";
import {
  Autoplay as SwiperAutoplay,
  EffectFade as SwiperEffectFade,
  Pagination as SwiperPagination,
  Navigation as SwiperNavigation,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

const { t } = useI18n();
const windowWidth = ref(window.innerWidth);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

defineProps({
  banners: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 500px;
}

:deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background: white;
  opacity: 0.5;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: white;
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  color: white;
  background: rgba(255, 255, 255, 0.1);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  backdrop-filter: blur(4px);
}

:deep(.swiper-button-prev:hover),
:deep(.swiper-button-next:hover) {
  background: rgba(255, 255, 255, 0.2);
}

:deep(.swiper-button-prev:after),
:deep(.swiper-button-next:after) {
  font-size: 20px;
}
</style>
