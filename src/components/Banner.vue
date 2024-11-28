<!-- Banner.vue -->
<template>
  <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-accent-600">
    <!-- Swiper container -->
    <swiper
      :modules="[SwiperAutoplay, SwiperEffectFade, SwiperPagination, SwiperNavigation]"
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
      class="h-[300px] md:h-[400px]"
    >
      <!-- Slide 1 -->
      <swiper-slide>
        <div class="relative h-full w-full">
          <div class="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-transparent"></div>
          <img
            src="/images/banner1.jpg"
            alt="Banner 1"
            class="h-full w-full object-cover"
          />
          <div class="absolute inset-0 flex items-center">
            <div class="container mx-auto px-4">
              <div class="max-w-lg">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-4 animate-float">
                  iPhone 15 Pro Max
                </h2>
                <p class="text-lg text-white/90 mb-8">
                  Eng so'nggi texnologiyalar bilan jihozlangan smartfon endi TechMarketda
                </p>
                <div class="flex space-x-4">
                  <button class="px-8 py-3 bg-white text-primary-600 rounded-full font-semibold hover:bg-primary-50 transition-colors">
                    Sotib olish
                  </button>
                  <button class="px-8 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm">
                    Batafsil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>

      <!-- Slide 2 -->
      <swiper-slide>
        <div class="relative h-full w-full">
          <div class="absolute inset-0 bg-gradient-to-r from-accent-900/80 to-transparent"></div>
          <img
            src="/images/banner2.jpg"
            alt="Banner 2"
            class="h-full w-full object-cover"
          />
          <div class="absolute inset-0 flex items-center">
            <div class="container mx-auto px-4">
              <div class="max-w-lg">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-4 animate-float">
                  MacBook Pro M3
                </h2>
                <p class="text-lg text-white/90 mb-8">
                  Professional darajadagi noutbuk endi yanada kuchliroq
                </p>
                <div class="flex space-x-4">
                  <button class="px-8 py-3 bg-white text-accent-600 rounded-full font-semibold hover:bg-accent-50 transition-colors">
                    Sotib olish
                  </button>
                  <button class="px-8 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm">
                    Batafsil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>

      <!-- Slide 3 -->
      <swiper-slide>
        <div class="relative h-full w-full">
          <div class="absolute inset-0 bg-gradient-to-r from-secondary-900/80 to-transparent"></div>
          <img
            src="/images/banner3.jpg"
            alt="Banner 3"
            class="h-full w-full object-cover"
          />
          <div class="absolute inset-0 flex items-center">
            <div class="container mx-auto px-4">
              <div class="max-w-lg">
                <h2 class="text-4xl md:text-5xl font-bold text-white mb-4 animate-float">
                  Samsung Neo QLED 8K
                </h2>
                <p class="text-lg text-white/90 mb-8">
                  Yangi avlod televizorlari bilan dunyoni yangicha kashf eting
                </p>
                <div class="flex space-x-4">
                  <button class="px-8 py-3 bg-white text-secondary-600 rounded-full font-semibold hover:bg-secondary-50 transition-colors">
                    Sotib olish
                  </button>
                  <button class="px-8 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm">
                    Batafsil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <!-- Decorative elements -->
    <div class="absolute top-0 right-0 w-1/3 h-full bg-white/5 backdrop-blur-3xl transform skew-x-12 translate-x-1/2"></div>
    <div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const SwiperAutoplay = Autoplay
const SwiperEffectFade = EffectFade
const SwiperPagination = Pagination
const SwiperNavigation = Navigation
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
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
