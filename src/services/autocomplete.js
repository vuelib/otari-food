import api from './axios-api';

export function getAutocompleteAddressesService({ name }) {
  return api.client
    .post('/addresses', {
      name
    })
    .then(({ data }) => data);
}
