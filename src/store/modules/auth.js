import {
  getCodeFromPhoneNumberService,
  checkToEqualVerificationCodeService,
  refreshTokenService,
  logoutService
} from '@/services/auth.js';
import { authUserAnalytics } from '../../mixins/analytics';

/* eslint no-unused-vars: */
const user_data = JSON.parse(localStorage.getItem('userData'));
export default {
  namespaced: true,
  state: {
    user_uuid: user_data ? user_data.client_uuid : null,
    refresh_token: user_data ? user_data.refresh_token : null
  },
  mutations: {
    SET_USER_UUID(store, uuid) {
      store.user_uuid = uuid;
    },
    DELETE_USER_UUID(store) {
      store.user_uuid = null;
    },
    SET_REFRESH_TOKEN(state, refresh_token) {
      state.refresh_token = refresh_token;
    }
  },
  actions: {
    async getCodeFromPhoneNumber({ commit }, { phone, device_id }) {
      return await getCodeFromPhoneNumberService({
        phone,
        device_id
      });
    },
    async checkToEqualVerificationCode({ commit }, { code, device_id }) {
      const data = await checkToEqualVerificationCodeService({
        code,
        device_id
      });
      authUserAnalytics({ uuid: data.client_uuid });
      localStorage.setItem('userData', await JSON.stringify(data));
      commit('SET_USER_UUID', data.client_uuid);
      commit('SET_REFRESH_TOKEN', data.refresh_token);
    },
    async refreshToken({ commit, state }) {
      const data = await refreshTokenService({ refresh: state.refresh_token });
      localStorage.setItem('userData', await JSON.stringify(data));
      commit('SET_REFRESH_TOKEN', data.refresh_token);
      return data;
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
