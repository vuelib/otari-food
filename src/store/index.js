import Vue from 'vue';
import Vuex from 'vuex';

// Import Modules
import stores from './modules/stores.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    stores
  },
  strict: process.env.NODE_ENV !== 'production'
});
