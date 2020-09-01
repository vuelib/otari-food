import api from './axios-api';

export function getTariffService({ routeFrom, routeTo, serviceUUID }) {
  console.log([routeFrom, routeTo], serviceUUID);
  return api.client
    .post('/orders/tariff', {
      routes: [routeFrom, routeTo],
      service_uuid: serviceUUID
    })
    .then(({ data }) => data);
}
