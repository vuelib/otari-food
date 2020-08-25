import { getAutocompleteAddressesService } from '@/services/autocomplete.js';

/* eslint no-unused-vars: */
export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getAutocompleteAddresses({ commit }, name) {
      return await getAutocompleteAddressesService({ name });
    }
  },
  getters: {}
};
