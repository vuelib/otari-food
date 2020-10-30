import {
  getStoresByFilterService,
  getStoresByUUIDService,
  getProductsService,
  getAllCategoriesService
} from '@/services/stores.js';
// places config
import placesConfig from '../../../placesConfig.json';
/* eslint no-unused-vars: */
export default {
  namespaced: true,
  state: {
    active_store: {},
    stores: [],
    store_products: [],
    stores_count: 0,
    store_products_count: 0,
    is_special_stores: false,
    special_stores: {},
    all_categories: []
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
    SET_ACTIVE_STORE(state, store) {
      state.active_store = store;
    },
    SET_ALL_CATEGORIES(state, categories) {
      state.all_categories = categories;
    },
    SET_IS_DETECT_SPECIAL_STORES(state) {
      const specialStores = placesConfig[window.appHostname];
      if (!specialStores) {
        state.is_special_stores = false;
      } else {
        state.is_special_stores = true;
        state.special_stores = specialStores;
      }
    }
  },
  actions: {
    // Stores
    async getStoresByFilter({ commit }, { page, limit, category }) {
      const { records, records_count } = await getStoresByFilterService({
        page,
        limit,
        category
      });
      commit('ADD_STORES', records);
      commit('SET_STORES_COUNT', records_count);
    },
    async getStoresByUUID({ commit }, { uuid }) {
      const record = await getStoresByUUIDService({ uuid });
      return record;
    },
    async getSpecialStores({ commit, dispatch }, urls) {
      let promises = urls.reduce((promises, url) => {
        promises.push(dispatch('getStoresByUUID', { uuid: url }));
        return promises;
      }, []);
      Promise.all(promises).then(result => {
        commit('ADD_STORES', result);
      });
    },
    // All categories
    async getAllCategories({ commit }, { page, limit }) {
      const { records } = await getAllCategoriesService({ page, limit });
      commit('SET_ALL_CATEGORIES', records);
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
      commit('SET_STORE_PRODUCTS', records);
      commit('SET_STORE_PRODUCTS_COUNT', records_count);
    },
    setActiveStore({ commit }, store) {
      commit('SET_ACTIVE_STORE', store);
    },
    detectSpecialStores({ commit }) {
      commit('SET_IS_DETECT_SPECIAL_STORES');
    }
  },
  getters: {
    getStores(state) {
      return state.stores;
    },
    getStoreProducts(state) {
      return state.store_products;
    },
    getStoreProductsCategory(state, getters) {
      if (!state.active_store || !getters.getActiveStore.product_category)
        return {};
      // console.log(getters.getActiveStore);
      // return state.store_products.reduce((acc, product) => {
      //   acc[product.category] = [...(acc[product.category] || []), product];
      //   return acc;
      // }, {});
      return getters.getActiveStore.product_category.reduce((map, category) => {
        map[category] = [
          ...(map[category] || []),
          ...state.store_products.filter(
            product => product.category === category
          )
        ];
        return map;
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
    findCategory(state) {
      return category => {
        return state.all_categories.find(({ url }) => url === category);
      };
    },
    getStoresCount(state) {
      return state.stores_count;
    },
    getStoreProductsCount(state) {
      return state.store_products_count;
    },
    getActiveStore(state) {
      return state.active_store;
    },
    isSpecialStores(state) {
      return state.is_special_stores;
    },
    getSpecialStoresData(state) {
      return state.special_stores;
    }
  }
};
