import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// package
import VueScrollactive from 'vue-scrollactive';
// components
import ScrollLink from './components/ScrollLink';
import AppPopup from './components/AppPopup';

Vue.use(VueScrollactive);
Vue.component('scroll-link', ScrollLink);
Vue.component('app-popup', AppPopup);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
