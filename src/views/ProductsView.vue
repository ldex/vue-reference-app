<template>
  <section v-if="errorMessage" class="errorMessage">
    {{ errorMessage }}
  </section>
  <section v-else>
    <div v-if="isLoading">
      <div class="loader">Loading products...</div>
    </div>
    <product-list v-else :products="products" :page-size="5">
      <template v-slot="slotProps">
        <span>{{ slotProps.product.name }}</span> <span>({{ slotProps.product.price }}$)</span>
      </template>
    </product-list>
  </section>
</template>

<script setup>
import { computed, onErrorCaptured } from 'vue'
import ProductList from '@/components/ProductList.vue'
import { useProductStore } from '@/stores/product';

const productStore = useProductStore();

const products = computed(() => productStore.products);
const isLoading = computed(() => productStore.isLoading);
const errorMessage = computed(() => productStore.errorMessage);

onErrorCaptured((error) => {
  console.error('Error in component: ', error.message);
  return true;
});

productStore.fetchProducts();
</script>

<style lang="scss" scoped></style>