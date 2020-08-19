import {
  getCodeFromPhoneNumberService,
  checkToEqualVerificationCodeService,
  logoutService
} from '@/services/auth.js';

/* eslint no-unused-vars: */
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
    async getCodeFromPhoneNumber({ commit }, { phone, device_id }) {
      console.log('Store', phone, device_id);
      return await getCodeFromPhoneNumberService({
        phone,
        device_id
      });
    },
    async checkToEqualVerificationCode({ commit }, { code, device_id }) {
      const { client_uuid } = await checkToEqualVerificationCodeService({
        code,
        device_id
      });
      commit('SET_USER_UUID', client_uuid);
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
