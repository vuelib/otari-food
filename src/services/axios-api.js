import axios from 'axios';
const BASE_URL = 'https://crm.apis.stage.faem.pro/api/v2/';

export default class Api {
  constructor(options = {}) {
    // Singleton Pattern
    if (Api._instance) return Api._instance;
    Api._instance = this;

    this.client =
      options.client ||
      axios.create({
        baseURL: BASE_URL,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    this.token = options.token;
    this.refreshToken = options.refreshToken;
  }

  getStoresByFilter({ page, limit = 10 }) {
    return this.client
      .post('/stores', {
        page,
        limit
      })
      .then(({ data }) => data);
  }

  getStoresByUUID({ uuid }) {
    return this.client(`/stores/${uuid}`).then(({ data }) => data);
  }

  getProducts({ uuid, page = 1, limit = 100 }) {
    return this.client
      .post('/products', {
        limit,
        page,
        uuid
      })
      .then(({ data }) => data);
  }
}
