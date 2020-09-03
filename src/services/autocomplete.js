import api from './axios-api';

export function getAutocompleteAddressesService({ name }) {
  return api.client
    .post('/addresses', {
      name
    })
    .then(({ data }) => data);
}
export function findAddressService({ lat, long }) {
  return api.client
    .post('/findaddress', {
      lat,
      long
    })
    .then(({ data }) => {
      console.log(data);
      return data;
    });
}
