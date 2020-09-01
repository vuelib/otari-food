import api from './axios-api';

export function getTariffsService({ routeFrom, routeTo, serviceUUID }) {
  console.log([routeFrom, routeTo], serviceUUID);
  return api.client
    .post('/orders/tariffs', {
      routes: [routeFrom, routeTo],
      service_uuid: serviceUUID
    })
    .then(({ data }) => data);
}
