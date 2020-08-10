import { loginService, logoutService } from '@/services/auth.js';

export default {
  namespaced: true,
  state: {
    user_uuid: null
  },
  mutations: {
    SET_USER_UUID(store, uuid) {
      store.user_uuid = uuid;
    },
    DELETE_USER_UUID(store) {
      store.user_uuid = null;
    }
  },
  actions: {
    async loginUser({ commit }, userData) {
      const { user_uuid } = await loginService(userData);
      commit('SET_USER_UUID', user_uuid);
    },
    logout({ commit }) {
      logoutService();
      commit('DELETE_USER_UUID');
    }
  },
  getters: {
    isAuthUser(state) {
      return state.user_uuid !== null;
    }
  }
};
