import api from './axios-api';

export function getStoresByFilterService({ page, limit }) {
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

export function createOrderService({
  routes,
  productsInput,
  serviceUUID,
  withoutDelivery
}) {
  return api.client
    .post(
      `${process.env.VUE_APP_API_CLIENT}/orders`,
      {
        routes,
        products_input: productsInput,
        service_uuid: serviceUUID,
        without_delivery: withoutDelivery
      },
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('userData')).token
          }`
        }
      }
    )
    .then(({ data }) => data);
}

export function cancelOrderService({ order_uuid }) {
  return api.client
    .put(
      `/orders/cancel/${order_uuid}`,
      {
        reason: 'can_not_reach'
      },
      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('userData')).token
          }`
        }
      }
    )
    .then(({ data }) => data);
}

export function getMyOrdersService() {
  return api
    .client(`${process.env.VUE_APP_API_CLIENT}/myorders`, {
      headers: {
        Source: 'ios_client_app_1',
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem('userData')).token
        }`
      }
    })
    .then(({ data }) => data);
}
