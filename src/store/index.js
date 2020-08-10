import Vue from 'vue';
import Vuex from 'vuex';

// Import Modules
import stores from './modules/stores.js';
import auth from './modules/auth.js';
import cart from './modules/cart.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    stores,
    auth,
    cart
  },
  strict: process.env.NODE_ENV !== 'production'
});
