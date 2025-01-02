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
      <SwiperSlide v-for="banner in banners" :key="banner.id" class="banner-slide relative h-full">
        <!-- Banner Image Container -->
        <div class="banner-image-container">
          <img
            :src="banner.image"
            :alt="banner.title"
            class="banner-image"
            loading="lazy"
          />
        </div>

        <!-- Content Overlay -->
        <div class="relative h-full flex items-center z-10">
          <div class="container mx-auto px-4 md:px-8">
            <div class="max-w-lg space-y-3 md:space-y-4">
              <!-- Title -->
              <h2 class="text-2xl md:text-4xl font-bold text-gray-800 leading-tight">
                <!-- {{ banner.title }} -->
              </h2>
              
              <!-- Description -->
              <p class="text-base md:text-lg text-gray-600">
                <!-- {{ banner.description }} -->
              </p>
              
              <!-- CTA Button -->
              <!-- <button class="px-4 md:px-6 py-2.5 md:py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200">
                {{ banner.buttonText || "Batafsil" }}
              </button> -->
            </div>
          </div>
        </div>
      </SwiperSlide>

      <!-- Custom Navigation Buttons -->
      <div class="swiper-button-prev !w-12 !h-12 !bg-white/80 !backdrop-blur-sm rounded-full shadow-lg !text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 after:!text-xl">
      </div>
      <div class="swiper-button-next !w-12 !h-12 !bg-white/80 !backdrop-blur-sm rounded-full shadow-lg !text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200 after:!text-xl">
      </div>

      <!-- Custom Pagination -->
      <div class="swiper-pagination !bottom-4 !z-20">
        <span class="swiper-pagination-bullet !w-2 !h-2 !bg-white/60"></span>
      </div>
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
    height: 400px;
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 25%; /* Rasmni yuqoriroqdan boshlab kesish */
}

/* Pagination styles */
.banner-wrapper :deep(.swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.6);
  opacity: 0.6;
  transition: all 0.3s ease;
}

.banner-wrapper :deep(.swiper-pagination-bullet-active) {
  width: 24px;
  border-radius: 4px;
  background: white;
  opacity: 1;
}

/* Navigation button styles */
.banner-wrapper :deep(.swiper-button-prev),
.banner-wrapper :deep(.swiper-button-next) {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  border-radius: 50%;
  color: #1f2937;
}

.banner-wrapper :deep(.swiper-button-prev:after),
.banner-wrapper :deep(.swiper-button-next:after) {
  font-size: 20px;
  font-weight: bold;
}

.banner-wrapper :deep(.swiper-button-prev:hover),
.banner-wrapper :deep(.swiper-button-next:hover) {
  background: rgba(255, 255, 255, 0.9);
}

.banner-wrapper :deep(.swiper-button-disabled) {
  opacity: 0 !important;
}
</style>
