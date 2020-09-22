import axios from 'axios';

class Api {
  constructor(options = {}) {
    // Singleton Pattern
    if (Api._instance) return Api._instance;
    Api._instance = this;

    this.client =
      options.client ||
      axios.create({
        baseURL: process.env.VUE_APP_API_CRM,
        headers: {
          'Content-Type': 'application/json'
        }
      });

    this.token = options.token;
    this.refresh_token = options.refresh_token;

    // Interceptor Request
    // Interceptor Response
  }
}
export default new Api(JSON.parse(localStorage.getItem('userData')) || {});
