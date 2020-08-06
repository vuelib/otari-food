import api from './axios-api';

export function getStoresByFilterService({ page, limit = 10 }) {
  return api.client
    .post('/stores', {
      page,
      limit
    })
    .then(({ data }) => data);
}

export function getStoresByUUIDService({ uuid }) {
  return api.client(`/stores/${uuid}`).then(({ data }) => data);
}

export function getProductsService({ uuid, page = 1, limit = 100 }) {
  return api.client
    .post('/products', {
      limit,
      page,
      uuid
    })
    .then(({ data }) => data);
}
