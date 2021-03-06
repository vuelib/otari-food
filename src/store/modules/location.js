import {
  getAutocompleteAddressesService,
  findAddressService
} from '@/services/autocomplete.js';

/* eslint no-unused-vars: */
const location = JSON.parse(localStorage.getItem('location'));
console.log('location', location);
export default {
  namespaced: true,
  state: {
    current_location: location ? location : null
  },
  mutations: {
    SET_CURRENT_LOCATION(state, location) {
      state.current_location = location;
      localStorage.setItem('location', JSON.stringify(location));
    },
    CLEAR_CURRENT_LOCATION(state) {
      state.current_location = null;
      localStorage.removeItem('location');
    }
  },
  actions: {
    setCurrentLocation({ commit }, location) {
      commit('SET_CURRENT_LOCATION', location);
    },
    clearCurrentlocation({ commit }) {
      commit('CLEAR_CURRENT_LOCATION');
    },
    async getAutocompleteAddresses({ commit }, name) {
      return await getAutocompleteAddressesService({ name });
    },
    async findAddress({ commit }, { lat, long }) {
      return await findAddressService({ lat, long });
    }
  },
  getters: {
    getCurrentLocation(state) {
      return state.current_location;
    },
    isCurrentLocationNull(state) {
      return state.current_location === null;
    }
  }
};
