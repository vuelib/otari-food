import api from './axios-api';

export function loginService({ login, password }) {
  return api.client
    .post('/login/', {
      login,
      password
    })
    .then(({ data }) => data)
    .catch(() => {});
}

export function logoutService() {
  api.token = null;
  api.refresh_token = null;
}
