<template>
  <div>
    <section v-if="errorMessage" class="errorMessage">
      {{ errorMessage }}
    </section>
    <section v-else>
      <div v-if="isLoading">
        <div class="loader">Loading products...</div>
      </div>
      <div v-else>
        <h2>{{ product.name }}</h2>
        <img :src="product.imageUrl ? product.imageUrl : 'https://picsum.photos/250/150'" width="200"
          style="float:right" />
        <h3>{{ product.description }}</h3>
        <p>Price: {{ product.price }}</p>
        <p>Fixed price? {{ product.fixedPrice }}</p>
        <p>Discontinued? {{ product.discontinued }}</p>
        <p>Modified date: {{ product.modifiedDate }}</p>
        <p>
          <button @click="deleteWithConfirm(product)" v-if="loggedIn">
            Delete
          </button>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product';
import { useUserStore } from '@/stores/user';


const router = useRouter()
const productStore = useProductStore();
const userStore = useUserStore();

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
const loggedIn = computed(() => userStore.isLoggedIn);

function deleteWithConfirm(product) {
  if (window.confirm('Are you sure ??')) {
    productStore.deleteProduct(product)
      .then(
        () => router.push({ name: 'products' })
      )
      .catch(
        () => router.push({ name: 'error' })
      )
  }
}

productStore.fetchProduct(props.id)
</script>

<style lang="scss" scoped></style>