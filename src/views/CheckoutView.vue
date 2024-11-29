<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Checkout form -->
        <div class="w-full md:w-2/3 bg-white rounded-lg shadow-md p-6">
          <h2 class="text-2xl font-semibold mb-6">Buyurtma berish</h2>
          
          <!-- Personal Information -->
          <div class="mb-8">
            <h3 class="text-lg font-medium mb-4">Shaxsiy ma'lumotlar</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Ism</label>
                <input type="text" v-model="form.firstName" class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Familiya</label>
                <input type="text" v-model="form.lastName" class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                <input type="tel" v-model="form.phone" class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" v-model="form.email" class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500">
              </div>
            </div>
          </div>

          <!-- Delivery Address -->
          <div class="mb-8">
            <h3 class="text-lg font-medium mb-4">Yetkazib berish manzili</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Manzil</label>
                <input type="text" v-model="form.address" class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500">
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Shahar</label>
                  <input type="text" v-model="form.city" class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Viloyat</label>
                  <input type="text" v-model="form.region" class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Pochta indeksi</label>
                  <input type="text" v-model="form.zipCode" class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500">
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Method -->
          <div class="mb-8">
            <h3 class="text-lg font-medium mb-4">To'lov usuli</h3>
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <input type="radio" id="cash" value="cash" v-model="form.paymentMethod" class="h-4 w-4 text-blue-600">
                <label for="cash" class="text-sm font-medium text-gray-700">Naqd pul orqali</label>
              </div>
              <div class="flex items-center space-x-3">
                <input type="radio" id="card" value="card" v-model="form.paymentMethod" class="h-4 w-4 text-blue-600">
                <label for="card" class="text-sm font-medium text-gray-700">Karta orqali</label>
              </div>
            </div>
          </div>

          <button @click="submitOrder" class="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200">
            Buyurtma berish
          </button>
        </div>

        <!-- Order Summary -->
        <div class="w-full md:w-1/3">
          <div class="bg-white rounded-lg shadow-md p-6 sticky top-8">
            <h2 class="text-xl font-semibold mb-4">Buyurtma ma'lumotlari</h2>
            
            <div class="space-y-4 mb-6">
              <div v-for="item in cartItems" :key="item.id" class="flex items-center space-x-4">
                <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded-md">
                <div class="flex-1">
                  <h3 class="text-sm font-medium">{{ item.name }}</h3>
                  <p class="text-sm text-gray-500">{{ item.quantity }} x {{ item.price }}</p>
                </div>
                <span class="font-medium">{{ item.quantity * item.price }} so'm</span>
              </div>
            </div>

            <div class="border-t pt-4 space-y-2">
              <div class="flex justify-between text-sm">
                <span>Mahsulotlar narxi</span>
                <span>{{ subtotal }} so'm</span>
              </div>
              <div class="flex justify-between text-sm">
                <span>Yetkazib berish</span>
                <span>{{ shipping }} so'm</span>
              </div>
              <div class="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Jami</span>
                <span>{{ total }} so'm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutView',
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        region: '',
        zipCode: '',
        paymentMethod: 'cash'
      },
      cartItems: [], // store dan olinadi
      shipping: 25000
    }
  },
  computed: {
    subtotal() {
      return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    total() {
      return this.subtotal + this.shipping
    }
  },
  methods: {
    submitOrder() {
      // Buyurtmani yuborish logikasi
      console.log('Buyurtma yuborildi:', {
        ...this.form,
        items: this.cartItems,
        total: this.total
      })
      
      // Muvaffaqiyatli buyurtmadan so'ng cart tozalanadi va home page ga yo'naltiriladi
      this.$router.push('/')
    }
  },
  mounted() {
    // Cart ma'lumotlarini olish
    // Bu yerda store dan cart items olinadi
  }
}
</script>
