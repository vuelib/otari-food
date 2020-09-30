import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// package
import VueScrollactive from 'vue-scrollactive';
import DeviceDetector from 'device-detector-js';
// components
import ScrollLink from './components/ScrollLink';
import AppPopup from './components/AppPopup';
import AppDeviceComponent from './components/AppDeviceComponent';

Vue.use(VueScrollactive);
Vue.component('scroll-link', ScrollLink);
Vue.component('app-popup', AppPopup);
Vue.component('app-device-component', AppDeviceComponent);

Vue.config.productionTip = false;

const deviceParse = new DeviceDetector().parse(window.navigator.userAgent);
window.appDevice = deviceParse.device.type;

new Vue({
  router,
  store,
  render: h => h(App),
  async created() {
    if (!JSON.parse(localStorage.getItem('userData'))) return;
    try {
      await this.$store.dispatch('auth/refreshToken');
    } catch {
      this.$store.dispatch('auth/logout');
    }
  }
}).$mount('#app');
