import {
  getStoresByFilterService,
  getStoresByUUIDService,
  getProductsService
} from '@/services/stores.js';

/* eslint no-unused-vars: */
export default {
  namespaced: true,
  state: {
    active_store_uuid: '',
    stores: [],
    store_products: [],
    stores_count: 0,
    store_products_count: 0
  },
  mutations: {
    ADD_STORES(state, stores) {
      state.stores.push(...stores);
    },
    ADD_STORE_PRODUCTS(state, products) {
      state.store_products.push(...products);
    },
    SET_STORE_PRODUCTS(state, products) {
      state.store_products = products;
    },
    SET_STORES_COUNT(state, records_count) {
      state.stores_count = records_count;
    },
    SET_STORE_PRODUCTS_COUNT(state, records_count) {
      state.store_products_count = records_count;
    },
    SET_ACTIVE_STORE(state, uuid) {
      state.active_store_uuid = uuid;
    }
  },
  actions: {
    // Stores
    async getStoresByFilter({ commit }) {
      const { records, records_count } = await getStoresByFilterService({
        page: 1,
        limit: 10
      });
      commit('ADD_STORES', records);
      commit('SET_STORES_COUNT', records_count);
    },
    async getStoresByUUID({ commit }, { uuid }) {
      const record = await getStoresByUUIDService({ uuid });
      return record;
    },
    // Products
    async getStoreProductsByFilter(
      { commit, state },
      { storeuuid, limit = 100, page = 1 }
    ) {
      const { records, records_count } = await getProductsService({
        storeuuid,
        limit,
        page
      });
      // Check equal to active store uuid
      // storeuuid === state.active_store_uuid
      //   ? commit('ADD_STORE_PRODUCTS', records)
      //   : commit('SET_STORE_PRODUCTS', records);
      // console.log(records);
      // commit('SET_ACTIVE_STORE', storeuuid);
      commit('SET_STORE_PRODUCTS', records);
      commit('SET_STORE_PRODUCTS_COUNT', records_count);
    }
  },
  getters: {
    getStores(state) {
      return state.stores;
    },
    getStoreProducts(state) {
      return state.store_products;
    },
    getStoreProductsCategory(state) {
      if (!state.store_products) return {};
      return state.store_products.reduce((acc, product) => {
        acc[product.category] = [...(acc[product.category] || []), product];
        return acc;
      }, {});
    },
    findStoreByUUID(state) {
      return findUUID => {
        return state.stores.find(({ uuid }) => uuid === findUUID);
      };
    },
    findStoreProductByUUID(state) {
      return findUUID => {
        return state.store_products.find(({ uuid }) => uuid === findUUID);
      };
    },
    getStoresCount(state) {
      return state.stores_count;
    },
    getStoreProductsCount(state) {
      return state.store_products_count;
    }
  }
};
