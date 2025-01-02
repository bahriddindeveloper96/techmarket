<!-- AppDownload.vue -->
<template>
  <div class="relative md:hidden border-b border-gray-100">
    <div v-if="isVisible" class="relative">
      <!-- Close button -->
      <button 
        @click="closeAppDownload"
        class="absolute -top-1 right-2 z-10 w-6 h-6 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Main content -->
      <div class="px-4 py-2.5 flex items-center justify-between">
        <!-- Left side -->
        <div class="flex items-center space-x-3">
          <!-- App icon -->
          <div class="relative w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 bg-primary-100 animate-pulse-slow"></div>
            <img 
              src="/logo.svg" 
              alt="TechMarket Logo" 
              class="w-6 h-6 relative z-10"
            />
          </div>

          <!-- Text content -->
          <div class="flex flex-col">
            <div class="flex items-center space-x-2">
              <h3 class="text-gray-800 font-medium text-[13px]">TechMarket ilovasi</h3>
              <span class="px-1.5 py-0.5 bg-primary-50 rounded text-[10px] font-medium text-primary-600">Yangi</span>
            </div>
            <div class="flex items-center space-x-1.5">
              <div class="flex">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </div>
              <span class="text-gray-400 text-[11px]">100K+ yuklab olishlar</span>
            </div>
          </div>
        </div>

        <!-- Download button -->
        <button 
          @click="handleDownload"
          class="relative group"
        >
          <div class="px-3.5 py-1.5 rounded-lg text-[13px] font-medium text-white bg-primary-500 active:scale-95 transition-all duration-150">
            Yuklab olish
            <div class="absolute inset-0 bg-primary-600/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isVisible = ref(true);

const closeAppDownload = () => {
  isVisible.value = false;
  localStorage.setItem('appDownloadClosed', 'true');
};

const handleDownload = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  
  if (isIOS) {
    window.location.href = 'https://apps.apple.com/your-app';
  } else {
    window.location.href = 'https://play.google.com/store/your-app';
  }
};

onMounted(() => {
  const isClosed = localStorage.getItem('appDownloadClosed');
  if (isClosed === 'true') {
    isVisible.value = false;
  }
});
</script>

<style scoped>
.animate-pulse-slow {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.1;
  }
}
</style>
