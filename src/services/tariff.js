import api from './axios-api';

export function getTariffService({
  clientUUID,
  routeFrom,
  routeTo,
  serviceUUID = '6b73e9e3-927b-453c-81c4-dfae818291f4'
}) {
  return api.client
    .post('/orders/tariff', {
      client: {
        UUID: clientUUID
      },
      routes: [routeFrom, routeTo],
      service_uuid: serviceUUID
    })
    .then(({ data }) => data);
}
