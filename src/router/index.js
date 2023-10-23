import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProductsView from '@/views/ProductsView.vue'
import ErrorView from '@/views/ErrorView.vue'
import ProductDetailsView from '@/views/ProductDetailsView.vue';
import ProductInsertView from '@/views/ProductInsertView.vue';
import LoginView from '@/views/LoginView.vue';
import AdminView from '@/views/AdminView.vue';
import { useUserStore } from '@/stores/user';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
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
    path: '/product/insert',
    name: 'productInsert',
    component: ProductInsertView
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

router.beforeEach((to) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.isLoggedIn) return '/login'
})

export default router
