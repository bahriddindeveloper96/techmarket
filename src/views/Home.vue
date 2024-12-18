<template>
  <main class="py-4">
    <!-- Banner Section -->
    <div class="mb-4">
      <Banner :banners="banners" />
    </div>

    <!-- Featured Products -->
    <div class="mb-4">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">{{ $t("home.featured_products") }}</h2>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <ProductCard
          v-for="product in newProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import Banner from "./../components/Banner.vue";
import ProductCard from "./../components/ProductCard.vue";
import axios from "axios";

const { t } = useI18n();
const baseUrl = import.meta.env.VITE_API_BASE_URL || "https://eragon.uz";
const token = import.meta.env.VITE_API_BASE_token || "3|y0r5ZdazYN92gQ9VG10pYim8f6YWqTErZUH52NAo660ed509";

const categories = ref([]);
const popularProducts = ref([]);
const newProducts = ref([]);
const featuredProducts = ref([]);
const banners = ref([]);

const fetchHomeData = async () => {
  try {
    console.log('Fetching home data from:', `${baseUrl}/api/homepage`);
    const response = await axios.get(`${baseUrl}/api/homepage`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    console.log('API Response:', response.data);
    
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
    } else {
      console.error('API returned success: false', response.data);
    }
  } catch (error) {
    console.error("Error fetching home data:", error.response?.data || error.message);
    popularProducts.value = [];
    newProducts.value = [];
    featuredProducts.value = [];
    banners.value = [];
  }
};

onMounted(() => {
  fetchHomeData();
});

// Methods
const addToCart = (product) => {
  console.log("Adding to cart:", product);
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
