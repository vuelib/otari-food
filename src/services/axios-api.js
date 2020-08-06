import axios from 'axios';
const BASE_URL = 'https://crm.apis.stage.faem.pro/api/v2/';

class Api {
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
}
export default new Api();
