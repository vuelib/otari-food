import api from './axios-api';

export function getStoresByFilterService({ page, limit = 10 }) {
  return api.client
    .post('/stores?type=restaurant', {
      page,
      limit
    })
    .then(({ data }) => data);
}

export function getStoresByUUIDService({ uuid }) {
  return api.client(`/stores/${uuid}`).then(({ data }) => data);
}

export function getProductsService({ storeuuid, page = 1, limit = 100 }) {
  return api.client
    .post(`/products?limit=${limit}&page=${page}&storeuuid=${storeuuid}`)
    .then(({ data }) => data);
}
