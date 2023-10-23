<template>
<div>
    <section v-if="errorMessage" class="errorMessage">
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
import { computed } from 'vue'
import { useProductStore } from '@/stores/product';

const productStore = useProductStore();

const props = defineProps(
    {
        id: {
            type: Number,
            required: true
        }
    }
)

const product = computed(() => productStore.product);
const isLoading = computed(() => productStore.isLoading);
const errorMessage = computed(() => productStore.errorMessage);

productStore.fetchProduct(props.id)
</script>

<style lang="scss" scoped></style>