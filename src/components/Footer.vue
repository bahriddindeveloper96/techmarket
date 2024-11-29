<!-- Footer.vue -->
<template>
  <footer class="border-t border-gray-100">
    <div class="container mx-auto px-4 py-12">
      <!-- Main Footer -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
        <!-- Company Info -->
        <div>
          <h3 class="text-gray-900 font-semibold mb-4">{{ $t('footer.company.title') }}</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-600 hover:text-primary-600 transition-colors">{{ $t('footer.company.about') }}</a></li>
            <li><a href="#" class="text-gray-600 hover:text-primary-600 transition-colors">{{ $t('footer.company.careers') }}</a></li>
            <li><a href="#" class="text-gray-600 hover:text-primary-600 transition-colors">{{ $t('footer.company.news') }}</a></li>
            <li><a href="#" class="text-gray-600 hover:text-primary-600 transition-colors">{{ $t('footer.company.partners') }}</a></li>
          </ul>
        </div>

        <!-- Help -->
        <div>
          <h3 class="text-gray-900 font-semibold mb-4">{{ $t('footer.help.title') }}</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-600 hover:text-primary-600 transition-colors">{{ $t('footer.help.shipping') }}</a></li>
            <li><a href="#" class="text-gray-600 hover:text-primary-600 transition-colors">{{ $t('footer.help.returns') }}</a></li>
            <li><a href="#" class="text-gray-600 hover:text-primary-600 transition-colors">{{ $t('footer.help.faq') }}</a></li>
            <li><a href="#" class="text-gray-600 hover:text-primary-600 transition-colors">{{ $t('footer.help.contact') }}</a></li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="text-gray-900 font-semibold mb-4">{{ $t('footer.legal.title') }}</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-600 hover:text-primary-600 transition-colors">{{ $t('footer.legal.privacy') }}</a></li>
            <li><a href="#" class="text-gray-600 hover:text-primary-600 transition-colors">{{ $t('footer.legal.terms') }}</a></li>
            <li><a href="#" class="text-gray-600 hover:text-primary-600 transition-colors">{{ $t('footer.legal.security') }}</a></li>
            <li><a href="#" class="text-gray-600 hover:text-primary-600 transition-colors">{{ $t('footer.legal.sitemap') }}</a></li>
          </ul>
        </div>

        <!-- Social -->
        <div>
          <h3 class="text-gray-900 font-semibold mb-4">{{ $t('footer.social.title') }}</h3>
          <ul class="space-y-2">
            <li>
              <a href="#" class="flex items-center text-gray-600 hover:text-primary-600 transition-colors">
                <i class="ri-facebook-fill mr-2"></i>
                {{ $t('footer.social.facebook') }}
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center text-gray-600 hover:text-primary-600 transition-colors">
                <i class="ri-instagram-line mr-2"></i>
                {{ $t('footer.social.instagram') }}
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center text-gray-600 hover:text-primary-600 transition-colors">
                <i class="ri-twitter-fill mr-2"></i>
                {{ $t('footer.social.twitter') }}
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center text-gray-600 hover:text-primary-600 transition-colors">
                <i class="ri-telegram-fill mr-2"></i>
                {{ $t('footer.social.telegram') }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Mobile App -->
        <div>
          <h3 class="text-gray-900 font-semibold mb-4">{{ $t('footer.mobileApp.title') }}</h3>
          <p class="text-gray-600 mb-4">{{ $t('footer.mobileApp.description') }}</p>
          <div class="space-y-3">
            <a 
              href="#" 
              class="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:border-primary-500 transition-colors"
            >
              <i class="ri-google-play-fill text-2xl text-gray-900"></i>
              <div>
                <div class="text-xs text-gray-600">{{ $t('footer.mobileApp.googlePlay') }}</div>
                <div class="text-sm font-medium text-gray-900">Google Play</div>
              </div>
            </a>
            <a 
              href="#" 
              class="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl hover:border-primary-500 transition-colors"
            >
              <i class="ri-apple-fill text-2xl text-gray-900"></i>
              <div>
                <div class="text-xs text-gray-600">{{ $t('footer.mobileApp.appStore') }}</div>
                <div class="text-sm font-medium text-gray-900">App Store</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="pt-8 border-t">
        <p class="text-center text-gray-600">{{ $t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>
