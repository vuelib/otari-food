import Vue from 'vue';
import VueRouter from 'vue-router';
import CatalogPage from '../views/CatalogPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'CatalogPage',
    component: CatalogPage
  },
  {
    path: '/restaurant/:id',
    name: 'RestaurantPage',
    component: () => import('../views/RestaurantPage.vue')
  },
  {
    path: '/*',
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : { x: 0, y: 0 };
  }
});

export default router;
