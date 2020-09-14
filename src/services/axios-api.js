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
    this.refresh_token = options.refresh_token;

    // Interceptor Request
    this.client.interceptors.request.use(
      config => {
        if (!this.token) return config;

        const newConfig = {
          headers: {},
          ...config
        };

        newConfig.headers.Authorization = `Bearer ${this.token}`;
        return newConfig;
      },
      e => Promise.reject(e)
    );

    // Interceptor Response
    this.client.interceptors.response.use(
      r => r,
      async error => {
        if (
          !this.refresh_token ||
          error.response.status !== 401 ||
          error.config.retry
        ) {
          throw error;
        }

        if (!this.refreshRequest) {
          this.refreshRequest = this.client.post(
            'https://client.apis.stage.faem.pro/api/v2/auth/refresh',
            {
              refresh: this.refresh_token
            }
          );
        }
        const { data } = await this.refreshRequest;
        this.token = data.token;
        this.refresh_token = data.refresh_token;
        localStorage.setItem('userData', JSON.stringify(data));
        const newRequest = {
          ...error.config,
          retry: true
        };
        return this.client(newRequest);
      }
    );
  }
}
export default new Api(JSON.parse(localStorage.getItem('userData')) || {});
