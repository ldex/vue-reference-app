import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProductsView from '@/views/ProductsView.vue'
import ErrorView from '@/views/ErrorView.vue'
import ProductDetailsView from '@/views/ProductDetailsView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductDetailsView,
    props: castRouteParamsId
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error',
    component: ErrorView
  }
]

function castRouteParamsId(route) {
  return {
    id: Number(route.params.id),
  };
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
