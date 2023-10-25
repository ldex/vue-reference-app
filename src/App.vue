<script setup>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

userStore.checkPreviousLogin();
</script>

<template>
<div id="app">
    <h1>Vue Store</h1>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/products">Products</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/admin">Admin</router-link>
      <router-link v-if="!userStore.isLoggedIn" to="/login">Login</router-link>
      <a v-else @click="userStore.logout()">Logout</a>
    </nav>
    <!-- <router-view v-slot="{ Component }" :key="$route.fullPath">
      <template v-if="Component">
        <transition name="page" mode="out-in">
            <suspense>
              <template #default>
                <component :is="Component"></component>
              </template>
              <template #fallback>
                <div style="margin-top:20px">
                  <h2 class="loading">Loading</h2>
                </div>
              </template>
            </suspense>
        </transition>
      </template>
    </router-view> -->
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <hr />
    <footer>Copyright Vue Academy 2023</footer>
  </div>
</template>

<style scoped>
/* transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@keyframes acrossIn {
  0% { transform: translate3d(-100%, 0, 0); }
  100% { transform: translate3d(0, 0, 0); }
}

@keyframes acrossOut {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(100%, 0, 0); }
}

.page-enter-active {
  animation: bounceIn .45s ease-out both;
}

.page-leave-active {
  animation: flipOutX .65s ease-in both;
}
</style>
