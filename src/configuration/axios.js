import Vue from 'vue';
import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.common['Accept-Language'] =
  JSON.parse(localStorage.getItem('locale')) || 'en';

axios.interceptors.request.use(
  async (config) => {
    const myConfig = { ...config };
    // Do something before request is sent
    // If request is different than any of the URLS in urlsExcludedForBearerHeader
    // then send Authorization header with token from localstorage
    const urlsExcludedForBearerHeader = [
      '/login',
      '/register',
    ];
    if (urlsExcludedForBearerHeader.every((url) => !myConfig.url.includes(url))) {
      myConfig.headers.Authorization = `Bearer ${window.$cookies.get('firebaseIdToken')}`;
    }
    return myConfig;
  },
  (error) => {
    // Do something with request error
    Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    // Checks if app is being used in mobile
    if (
      response.config.url !== `${process.env.VUE_APP_API_URL}/token` &&
      response.config.url !== `${window.location.origin}/version.json`
    ) {
      // checkForUpdates();
      // utils.checkIfTokenNeedsRefresh();
    }
    return response;
  },
  (error) => {
    // Return any error which is not due to authentication back to the calling service
    if (error.response.status !== 401) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
    // Try request again with new token
    return utils
      .updateToken()
      .then(() => {
        // New request with new token
        const { config } = error;
        config.headers.Authorization = `Bearer ${window.$cookies.get('firebaseIdToken')}`;

        return new Promise((resolve, reject) => {
          axios
            .request(config)
            .then((response) => {
              resolve(response);
            })
            .catch((e) => {
              reject(e);
            });
        });
      })
      .catch((e) => {
        Promise.reject(e);
      });
  },
);

const Plugin = {
  install: (VueObject) => {
    // const myVue = { ...Vue };
    // eslint-disable-next-line no-param-reassign
    VueObject.axios = axios;
    window.axios = axios;
    Object.defineProperties(VueObject.prototype, {
      axios: {
        get() {
          return axios;
        },
      },
      $axios: {
        get() {
          return axios;
        },
      },
    });
  },
};

Vue.use(Plugin);

export default Plugin;
