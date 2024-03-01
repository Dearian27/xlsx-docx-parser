import axios from "axios";

const instance = axios.create({
  // baseURL: 'http://localhost:8879/api',
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    // config.headers['Authorization'] = `Bearer ${window.localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    console.log(
      "IRRor"
      // error
    );
    return;
    // return Promise.reject(error);
  }
);

export default instance;
