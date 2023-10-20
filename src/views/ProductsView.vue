<template>
    <section v-if="errorMessage">
      {{errorMessage}}
    </section>
    <section v-else>
      <div v-if="isLoading">
        <div class="loader">Loading products...</div>
      </div>
      <product-list v-else :products="products" :page-size="5"></product-list>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import ProductList from '@/components/ProductList.vue'
import ProductService from '@/services/ProductService.js'

const products = ref([]);
const errorMessage = ref(null);
const isLoading = ref(false);

// async function loadProducts() {
//   try {
//     products.value = await ProductService.getProducts();
//   } catch (error) {
//     console.error('There was an error getting products from server, ', error);
//   }
// }

// await loadProducts();

isLoading.value = true;
ProductService.getProducts()
      .then(data => products.value = data)
      .catch(error => {
        errorMessage.value = 'There was an error getting products from server, ' + error;
      })
      .finally(() => isLoading.value = false);

</script>

<style lang="scss" scoped>

</style>