<script setup>
import { ref } from 'vue'
import ProductList from '@/components/ProductList.vue';
import ProductService from './services/ProductService.js';

const products = ref([]);
const errorMessage = ref(null);
const isLoading = ref(false);

// async function loadProducts() {
//   try {
//     const response = await ProductService.getProducts();
//     products.value = await response.json();
//   } catch (error) {
//     console.error('There was an error getting products from server: ', error);
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

<style scoped>
.loader {
  margin: 100px auto;
  font-size: 25px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load5 1.1s infinite ease;
  animation: load5 1.1s infinite ease;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
@-webkit-keyframes load5 {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #4dba87, 1.8em -1.8em 0 0em rgba(77,186,135, 0.2), 2.5em 0em 0 0em rgba(77,186,135, 0.2), 1.75em 1.75em 0 0em rgba(77,186,135, 0.2), 0em 2.5em 0 0em rgba(77,186,135, 0.2), -1.8em 1.8em 0 0em rgba(77,186,135, 0.2), -2.6em 0em 0 0em rgba(77,186,135, 0.5), -1.8em -1.8em 0 0em rgba(77,186,135, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(77,186,135, 0.7), 1.8em -1.8em 0 0em #4dba87, 2.5em 0em 0 0em rgba(77,186,135, 0.2), 1.75em 1.75em 0 0em rgba(77,186,135, 0.2), 0em 2.5em 0 0em rgba(77,186,135, 0.2), -1.8em 1.8em 0 0em rgba(77,186,135, 0.2), -2.6em 0em 0 0em rgba(77,186,135, 0.2), -1.8em -1.8em 0 0em rgba(77,186,135, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(77,186,135, 0.5), 1.8em -1.8em 0 0em rgba(77,186,135, 0.7), 2.5em 0em 0 0em #4dba87, 1.75em 1.75em 0 0em rgba(77,186,135, 0.2), 0em 2.5em 0 0em rgba(77,186,135, 0.2), -1.8em 1.8em 0 0em rgba(77,186,135, 0.2), -2.6em 0em 0 0em rgba(77,186,135, 0.2), -1.8em -1.8em 0 0em rgba(77,186,135, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(77,186,135, 0.2), 1.8em -1.8em 0 0em rgba(77,186,135, 0.5), 2.5em 0em 0 0em rgba(77,186,135, 0.7), 1.75em 1.75em 0 0em #4dba87, 0em 2.5em 0 0em rgba(77,186,135, 0.2), -1.8em 1.8em 0 0em rgba(77,186,135, 0.2), -2.6em 0em 0 0em rgba(77,186,135, 0.2), -1.8em -1.8em 0 0em rgba(77,186,135, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(77,186,135, 0.2), 1.8em -1.8em 0 0em rgba(77,186,135, 0.2), 2.5em 0em 0 0em rgba(77,186,135, 0.5), 1.75em 1.75em 0 0em rgba(77,186,135, 0.7), 0em 2.5em 0 0em #4dba87, -1.8em 1.8em 0 0em rgba(77,186,135, 0.2), -2.6em 0em 0 0em rgba(77,186,135, 0.2), -1.8em -1.8em 0 0em rgba(77,186,135, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(77,186,135, 0.2), 1.8em -1.8em 0 0em rgba(77,186,135, 0.2), 2.5em 0em 0 0em rgba(77,186,135, 0.2), 1.75em 1.75em 0 0em rgba(77,186,135, 0.5), 0em 2.5em 0 0em rgba(77,186,135, 0.7), -1.8em 1.8em 0 0em #4dba87, -2.6em 0em 0 0em rgba(77,186,135, 0.2), -1.8em -1.8em 0 0em rgba(77,186,135, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(77,186,135, 0.2), 1.8em -1.8em 0 0em rgba(77,186,135, 0.2), 2.5em 0em 0 0em rgba(77,186,135, 0.2), 1.75em 1.75em 0 0em rgba(77,186,135, 0.2), 0em 2.5em 0 0em rgba(77,186,135, 0.5), -1.8em 1.8em 0 0em rgba(77,186,135, 0.7), -2.6em 0em 0 0em #4dba87, -1.8em -1.8em 0 0em rgba(77,186,135, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(77,186,135, 0.2), 1.8em -1.8em 0 0em rgba(77,186,135, 0.2), 2.5em 0em 0 0em rgba(77,186,135, 0.2), 1.75em 1.75em 0 0em rgba(77,186,135, 0.2), 0em 2.5em 0 0em rgba(77,186,135, 0.2), -1.8em 1.8em 0 0em rgba(77,186,135, 0.5), -2.6em 0em 0 0em rgba(77,186,135, 0.7), -1.8em -1.8em 0 0em #4dba87;
  }
}
@keyframes load5 {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #4dba87, 1.8em -1.8em 0 0em rgba(77,186,135, 0.2), 2.5em 0em 0 0em rgba(77,186,135, 0.2), 1.75em 1.75em 0 0em rgba(77,186,135, 0.2), 0em 2.5em 0 0em rgba(77,186,135, 0.2), -1.8em 1.8em 0 0em rgba(77,186,135, 0.2), -2.6em 0em 0 0em rgba(77,186,135, 0.5), -1.8em -1.8em 0 0em rgba(77,186,135, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(77,186,135, 0.7), 1.8em -1.8em 0 0em #4dba87, 2.5em 0em 0 0em rgba(77,186,135, 0.2), 1.75em 1.75em 0 0em rgba(77,186,135, 0.2), 0em 2.5em 0 0em rgba(77,186,135, 0.2), -1.8em 1.8em 0 0em rgba(77,186,135, 0.2), -2.6em 0em 0 0em rgba(77,186,135, 0.2), -1.8em -1.8em 0 0em rgba(77,186,135, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(77,186,135, 0.5), 1.8em -1.8em 0 0em rgba(77,186,135, 0.7), 2.5em 0em 0 0em #4dba87, 1.75em 1.75em 0 0em rgba(77,186,135, 0.2), 0em 2.5em 0 0em rgba(77,186,135, 0.2), -1.8em 1.8em 0 0em rgba(77,186,135, 0.2), -2.6em 0em 0 0em rgba(77,186,135, 0.2), -1.8em -1.8em 0 0em rgba(77,186,135, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(77,186,135, 0.2), 1.8em -1.8em 0 0em rgba(77,186,135, 0.5), 2.5em 0em 0 0em rgba(77,186,135, 0.7), 1.75em 1.75em 0 0em #4dba87, 0em 2.5em 0 0em rgba(77,186,135, 0.2), -1.8em 1.8em 0 0em rgba(77,186,135, 0.2), -2.6em 0em 0 0em rgba(77,186,135, 0.2), -1.8em -1.8em 0 0em rgba(77,186,135, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(77,186,135, 0.2), 1.8em -1.8em 0 0em rgba(77,186,135, 0.2), 2.5em 0em 0 0em rgba(77,186,135, 0.5), 1.75em 1.75em 0 0em rgba(77,186,135, 0.7), 0em 2.5em 0 0em #4dba87, -1.8em 1.8em 0 0em rgba(77,186,135, 0.2), -2.6em 0em 0 0em rgba(77,186,135, 0.2), -1.8em -1.8em 0 0em rgba(77,186,135, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(77,186,135, 0.2), 1.8em -1.8em 0 0em rgba(77,186,135, 0.2), 2.5em 0em 0 0em rgba(77,186,135, 0.2), 1.75em 1.75em 0 0em rgba(77,186,135, 0.5), 0em 2.5em 0 0em rgba(77,186,135, 0.7), -1.8em 1.8em 0 0em #4dba87, -2.6em 0em 0 0em rgba(77,186,135, 0.2), -1.8em -1.8em 0 0em rgba(77,186,135, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(77,186,135, 0.2), 1.8em -1.8em 0 0em rgba(77,186,135, 0.2), 2.5em 0em 0 0em rgba(77,186,135, 0.2), 1.75em 1.75em 0 0em rgba(77,186,135, 0.2), 0em 2.5em 0 0em rgba(77,186,135, 0.5), -1.8em 1.8em 0 0em rgba(77,186,135, 0.7), -2.6em 0em 0 0em #4dba87, -1.8em -1.8em 0 0em rgba(77,186,135, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(77,186,135, 0.2), 1.8em -1.8em 0 0em rgba(77,186,135, 0.2), 2.5em 0em 0 0em rgba(77,186,135, 0.2), 1.75em 1.75em 0 0em rgba(77,186,135, 0.2), 0em 2.5em 0 0em rgba(77,186,135, 0.2), -1.8em 1.8em 0 0em rgba(77,186,135, 0.5), -2.6em 0em 0 0em rgba(77,186,135, 0.7), -1.8em -1.8em 0 0em #4dba87;
  }
}
</style>
