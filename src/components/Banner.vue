<!-- Banner.vue -->
<template>
  <div class="banner-wrapper">
    <Swiper
      :modules="[SwiperAutoplay, SwiperPagination, SwiperNavigation]"
      :slides-per-view="1"
      :space-between="0"
      :loop="true"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      :pagination="{
        clickable: true,
        el: '.swiper-pagination',
      }"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      class="banner-swiper rounded-xl overflow-hidden relative group"
    >
      <SwiperSlide v-for="banner in banners" :key="banner.id" class="banner-slide">
        <!-- Banner Image Container -->
        <div class="banner-image-container">
          <img
            :src="banner.image"
            :alt="banner.title"
            class="banner-image"
            loading="lazy"
          />
        </div>
      </SwiperSlide>

      <!-- Custom Navigation Buttons -->
      <div class="swiper-button-prev !w-10 !h-10 !bg-white/80 !backdrop-blur-sm rounded-full shadow-lg !text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 after:!text-lg">
      </div>
      <div class="swiper-button-next !w-10 !h-10 !bg-white/80 !backdrop-blur-sm rounded-full shadow-lg !text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 after:!text-lg">
      </div>

      <!-- Custom Pagination -->
      <div class="swiper-pagination !bottom-3 !z-20"></div>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SwiperAutoplay = Autoplay;
const SwiperPagination = Pagination;
const SwiperNavigation = Navigation;

defineProps({
  banners: {
    type: Array,
    required: true,
    default: () => []
  }
});
</script>

<style scoped>
.banner-wrapper {
  width: 100%;
}

.banner-swiper {
  width: 100%;
  height: 280px;
}

@media (min-width: 768px) {
  .banner-swiper {
    height: 420px;
  }
}

.banner-slide {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.banner-image-container {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  transform: scale(1.02);
}

/* Pagination styles */
.banner-wrapper :deep(.swiper-pagination-bullet) {
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.7);
  opacity: 0.7;
  margin: 0 4px !important;
  transition: all 0.3s ease;
}

.banner-wrapper :deep(.swiper-pagination-bullet-active) {
  width: 20px;
  border-radius: 4px;
  background: white;
  opacity: 1;
}

/* Navigation button styles */
.banner-wrapper :deep(.swiper-button-prev),
.banner-wrapper :deep(.swiper-button-next) {
  width: 40px;
  height: 40px;
  margin-top: -20px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  border-radius: 50%;
  color: #1f2937;
}

.banner-wrapper :deep(.swiper-button-prev:after),
.banner-wrapper :deep(.swiper-button-next:after) {
  font-size: 16px;
  font-weight: bold;
}

.banner-wrapper :deep(.swiper-button-prev:hover),
.banner-wrapper :deep(.swiper-button-next:hover) {
  background: rgba(255, 255, 255, 0.9);
}

.banner-wrapper :deep(.swiper-button-disabled) {
  opacity: 0 !important;
  cursor: default;
}
</style>
