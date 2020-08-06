import Api from '@/services/axios-api.js';
const api = new Api();

export default {
  namespaced: true,
  state: {
    stores: [],
    records_count: 0
  },
  mutations: {
    ADD_STORES(state, stores) {
      state.stores.push(...stores);
    },
    SET_RECORDS_COUNT(state, records_count) {
      state.records_count = records_count;
    }
  },
  actions: {
    async getStoresByFilter({ commit }) {
      const { records, records_count } = await api.getStoresByFilter({
        page: 1,
        limit: 10
      });
      console.log(records);
      commit('ADD_STORES', records);
      commit('SET_RECORDS_COUNT', records_count);
    },
    /*eslint no-unused-vars: */
    async getStoresByUUID({ commit }, { uuid }) {
      const record = await api.getStoresByUUID({ uuid });
      console.log(record);
      return record;
      // console.log(commit);
    },
    async getProducts({ uuid, limit = 100, page = 1 }) {
      const products = await api.getProducts({ uuid, limit, page });
      return products;
    }
  },
  getters: {
    getStores(state) {
      return state.stores;
    },
    getRecordsCount(state) {
      return state.records_count;
    }
  }
};
