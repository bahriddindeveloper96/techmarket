<template>
  <main class="py-4">
    <!-- Breadcrumb -->
    <div class="mb-4 sm:mb-4">
      <nav class="flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3 text-sm">
          <li class="inline-flex items-center">
            <router-link to="/" class="text-gray-700 hover:text-primary-600">
              {{ $t("nav.home") }}
            </router-link>
          </li>
          <li>
            <div class="flex items-center">
              <svg
                class="w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span class="text-gray-500">{{
                $t(`${category.name.toLowerCase()}`)
              }}</span>
            </div>
          </li>
        </ol>
      </nav>
    </div>
    <!-- Main Content -->
    <div class="flex flex-col lg:flex-row gap-4">
      <!-- Filters Sidebar -->
      <div class="w-full lg:w-1/4 lg:sticky lg:top-4">
        <FilterSidebar @apply-filters="handleFilters" />
      </div>

      <!-- Products Section -->
      <div class="w-full lg:w-3/4">
        <!-- Sort Options -->
        <div class="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div
            class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <h1 class="text-lg sm:text-xl font-semibold text-gray-900">
              {{ $t(`${category.name.toLowerCase()}`) }}
            </h1>
            <div class="flex items-center gap-2 w-full sm:w-auto">
              <select
                v-model="sortBy"
                class="w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="popular">
                  {{ $t("category.sort.popular") }}
                </option>
                <option value="price_asc">
                  {{ $t("category.sort.price_low") }}
                </option>
                <option value="price_desc">
                  {{ $t("category.sort.price_high") }}
                </option>
                <option value="new">{{ $t("category.sort.newest") }}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Products Grid -->
        <div
          class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
        >
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            @add-to-cart="addToCart"
            @toggle-favorite="toggleFavorite"
          />
        </div>

        <!-- Pagination -->
        <div class="flex justify-center mt-4">
          <nav class="flex items-center gap-1 sm:gap-2">
            <button
              :disabled="currentPage === 1"
              @click="changePage(currentPage - 1)"
              class="px-3 py-1 sm:px-4 sm:py-2 rounded-lg border text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              {{ $t("category.pagination.prev") }}
            </button>
            <button
              v-for="page in totalPages"
              :key="page"
              @click="changePage(page)"
              :class="[
                'px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm font-medium',
                currentPage === page
                  ? 'bg-primary-600 text-white'
                  : 'border hover:bg-gray-50',
              ]"
            >
              {{ page }}
            </button>
            <button
              :disabled="currentPage === totalPages"
              @click="changePage(currentPage + 1)"
              class="px-3 py-1 sm:px-4 sm:py-2 rounded-lg border text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              {{ $t("category.pagination.next") }}
            </button>
          </nav>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import FilterSidebar from "../components/FilterSidebar.vue";
import ProductCard from "../components/ProductCard.vue";

const route = useRoute();
const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// Initialize with empty arrays and objects
const category = ref({
  name: "",
  id: null,
});
const products = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);
const sortBy = ref("popular");

const fetchProducts = async () => {
  try {
    loading.value = true;
    const token = "7|MKTulSoz5KuBSjF4v1CmSsVdD6LYHsDZo2PJxGDV2162af25";

    const response = await axios.get(
      `${baseUrl}/api/categories/${route.params.id}/products`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    if (response.data?.data) {
      products.value = response.data.data.map((product) => {
        const firstVariant = product.variants?.[0] || {};
        const firstImage =
          firstVariant.images?.[0] || product.images?.[0]?.image || "";

        return {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: parseFloat(firstVariant.price || 0),
          oldPrice: parseFloat(firstVariant.price || 0) * 1.2,
          image: firstImage,
          rating: product.average_rating || 0,
          reviews: 0,
          isFavorite: false,
          installment: true,
          images: [firstImage],
          favorite_count: product.favorite_count || 0,
        };
      });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    products.value = []; // Set empty array on error
  } finally {
    loading.value = false;
  }
};

const getCategoryName = (id) => {
  const categories = {
    1: "Smartfonlar",
    2: "Noutbuklar",
    3: "Smart Soatlar",
    4: "Planshetlar",
    5: "Aksessuarlar",
  };
  return categories[id] || "Category";
};

const fetchCategory = async () => {
  try {
    const categoryId = route.params.id;
    category.value = {
      id: categoryId,
      name: getCategoryName(categoryId),
    };
  } catch (error) {
    console.error("Error setting category:", error);
    // Set default values on error
    category.value = {
      id: route.params.id,
      name: "Category",
    };
  }
};

const addToCart = (product) => {
  console.log("Adding to cart:", product);
};

const toggleFavorite = (product) => {
  console.log("Toggle favorite:", product);
};

const handleFilters = (filters) => {
  console.log("Applying filters:", filters);
  fetchProducts();
};

const changePage = (page) => {
  currentPage.value = page;
  fetchProducts();
};

// Initialize data
onMounted(() => {
  fetchCategory();
  fetchProducts();
});

// Watch for route changes
watch(
  () => route.params.id,
  (newId) => {
    if (newId) {
      fetchCategory();
      fetchProducts();
    }
  },
  { immediate: true }
);

// Watch for sort changes
watch(sortBy, () => {
  fetchProducts();
});
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

.container {
  max-width: 1280px;
  margin: 0 auto;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #ddd;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #ccc;
}
</style>

<style>
@media screen and (max-width: 480px) {
  .text-lg {
    font-size: 14px !important;
  }

  .text-sm {
    font-size: 12px !important;
  }

  .text-xs {
    font-size: 10px !important;
  }
}
</style>
