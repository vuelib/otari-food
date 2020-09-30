import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'CatalogPage',
    component: () => {
      if (window.appDevice === 'desktop')
        return import('../views/Desktop/CatalogPage.vue');
      else return import('../views/Mobile/MobileCatalogPage.vue');
    }
  },
  {
    path: '/restaurant/:id?',
    name: 'RestaurantPage',
    component: () => {
      if (window.appDevice === 'desktop')
        return import('../views/Desktop/RestaurantPage.vue');
      else return import('../views/Mobile/MobileRestaurantPage.vue');
    }
  },
  {
    path: '/cart',
    name: 'CartPage',
    component: () => import('../views/Mobile/MobileCartPage.vue')
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
