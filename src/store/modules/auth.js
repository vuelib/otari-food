import { loginService, logoutService } from '@/services/auth.js';

export default {
  namespaced: true,
  state: {
    user_uuid: null
  },
  mutations: {
    SET_USER_UUID(store, uuid) {
      store.user_uuid = uuid;
    }
  },
  actions: {
    async loginUser({ commit }, userData) {
      const { user_uuid } = await loginService(userData);
      commit('SET_USER_UUID', user_uuid);
    },
    logout() {
      logoutService();
    }
  },
  getters: {
    isAuthUser(state) {
      return state.user_uuid !== null;
    }
  }
};
