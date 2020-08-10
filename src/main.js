import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ScrollLink from './components/ScrollLink';
import AppPopup from './components/AppPopup';

Vue.component('scroll-link', ScrollLink);
Vue.component('app-popup', AppPopup);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
