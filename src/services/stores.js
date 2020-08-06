import api from './axios-api';

export function getStoresByFilter({ page, limit = 10 }) {
  return api.client
    .post('/stores', {
      page,
      limit
    })
    .then(({ data }) => data);
}

export function getStoresByUUID({ uuid }) {
  return api.client(`/stores/${uuid}`).then(({ data }) => data);
}

export function getProducts({ uuid, page = 1, limit = 100 }) {
  return api.client
    .post('/products', {
      limit,
      page,
      uuid
    })
    .then(({ data }) => data);
}
