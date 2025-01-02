<template>
  <main>    
    <div class="py-4 pb-[60px] md:pb-4">
      <!-- Banner Section -->
      <div class="mb-4">
        <Banner v-if="!isMobile" :banners="banners" />
        <BannerMobi v-else :banners="banners" />
      </div>

      <!-- Featured Products -->
      <div class="mb-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">{{ $t("home.featured_products") }}</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>

      <!-- Popular Products -->
      <div class="mb-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">{{ $t("home.popular_products") }}</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          <ProductCard
            v-for="product in popularProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>

      <!-- New Products -->
      <div class="mb-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold">{{ $t("home.new_products") }}</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          <ProductCard
            v-for="product in newProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import Banner from "./../components/Banner.vue";
import BannerMobi from "./../components/BannerMobi.vue";
import ProductCard from "./../components/ProductCard.vue";
import AppDownload from "./../components/AppDownload.vue";
import axios from "axios";

const { t } = useI18n();
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const token = import.meta.env.VITE_API_BASE_token;

const categories = ref([]);
const popularProducts = ref([]);
const newProducts = ref([]);
const featuredProducts = ref([]);
const banners = ref([]);
const windowWidth = ref(window.innerWidth);

const isMobile = computed(() => windowWidth.value < 768);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  fetchHomeData();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

const fetchHomeData = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/homepage`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    
    if (response.data.success) {
      const { data } = response.data;

      // Map categories
      categories.value = data.categories.map((category) => ({
        id: category.id,
        name: category.name,
        description: category.description,
        image: category.image,
        slug: category.slug,
        featured: category.featured,
      }));

      // Map products with variant data
      const mapProduct = (product) => {
        const defaultVariant = product.variants?.[0];
        return {
          ...product,
          price: defaultVariant?.price || 0,
          oldPrice: null,
          stock: defaultVariant?.stock || 0,
          rating: product.average_rating || 0,
          reviews: 0,
          isFavorite: product.favorite_count > 0,
          installment: true,
          images: defaultVariant?.images ||
            product.images?.map((img) => img.image) || [
              product.category?.image ||
                "https://picsum.photos/400/400?random=1",
            ],
        };
      };

      popularProducts.value = data.popular_products?.map(mapProduct) || [];
      newProducts.value = data.new_products?.map(mapProduct) || [];
      featuredProducts.value = data.featured_products?.map(mapProduct) || [];
      banners.value = data.banners.map((banner) => ({
        ...banner,
        image: banner.image.startsWith("http")
          ? banner.image
          : `${baseUrl}/${banner.image}`,
      }));
    }
  } catch (error) {
    console.error("Error fetching home data:", error.response?.data || error.message);
    popularProducts.value = [];
    newProducts.value = [];
    featuredProducts.value = [];
    banners.value = [];
  }
};

// Methods
const addToCart = (product) => {
  // Add cart logic here
};

const toggleFavorite = (product) => {
  product.isFavorite = !product.isFavorite;
};
</script>

<style>
@import "@/assets/main.css";

/* Global styles */
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: rgb(249, 250, 251);
}
</style>
