import axios from "axios";
import { toast } from "react-toastify";

let authorizedAxiosInstance = axios.create();

authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10;
// authorizedAxiosInstance.defaults.withCredentials=true

// Add a request interceptor
authorizedAxiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
authorizedAxiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response?.status !== 410){
        toast.error(error.response?.data?.message || error?.message)
    }
    return Promise.reject(error);
  }
);

export default authorizedAxiosInstance;
