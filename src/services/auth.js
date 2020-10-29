import api from './axios-api';

export function getCodeFromPhoneNumberService({ phone, device_id }) {
  return api.client
    .post(`${process.env.VUE_APP_API_CLIENT}/auth/new`, {
      device_id,
      phone
    })
    .then(({ data }) => {
      return data;
    });
}

export function checkToEqualVerificationCodeService({ code, device_id }) {
  return api.client
    .post(`${process.env.VUE_APP_API_CLIENT}/auth/verification`, {
      device_id,
      code
    })
    .then(({ data }) => {
      return data;
    });
}

export function refreshTokenService({ refresh }) {
  return api.client
    .post(`${process.env.VUE_APP_API_CLIENT}/auth/refresh`, {
      refresh
    })
    .then(({ data }) => {
      return data;
    });
}

export function logoutService() {
  api.token = null;
  api.refresh_token = null;
  localStorage.removeItem('userData');
}
