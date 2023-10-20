<template>
<div>
    <section v-if="errorMessage">
      {{errorMessage}}
    </section>
    <section v-else>
      <div v-if="isLoading">
        <div class="loader">Loading products...</div>
      </div>
      <div v-else>
        <h2>{{product.name}}</h2>
        <img :src="product.imageUrl ? product.imageUrl : 'https://picsum.photos/250/150'" width="200" style="float:right" />
        <h3>{{product.description}}</h3>
        <p>Price: {{product.price}}</p>
        <p>Fixed price? {{product.fixedPrice}}</p>
        <p>Discontinued? {{product.discontinued}}</p>
        <p>Modified date: {{product.modifiedDate }}</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProductService from '@/services/ProductService.js'

const props = defineProps(
    {
        id: {
            type: Number,
            required: true
        }
    }
)

const product = ref(null);
const errorMessage = ref(null);
const isLoading = ref(false);

isLoading.value = true;

ProductService.getProduct(props.id)
    .then(data => {
        product.value = data
    })
    .catch(error => {
        errorMessage.value = 'There was an error getting the product from server, ' + error;
    })
    .finally(() => isLoading.value = false)
</script>

<style lang="scss" scoped></style>