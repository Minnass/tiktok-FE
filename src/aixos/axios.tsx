import axios from 'axios';
import store from '../store/store'
import { setLoading } from '../store/loading';
import { BASEURL } from '../const/baseUrl';

const axiosInstance = axios.create({
  baseURL: BASEURL, // Replace with your API server URL
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token&& config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  store.dispatch(setLoading(true));
  return config;
}, (error) => {
  return Promise.reject(error);
});


axiosInstance.interceptors.response.use((response) => {
  store.dispatch(setLoading(false));
  return response;
}, (error) => {
  // console.log(error)
  store.dispatch(setLoading(false));
  return Promise.reject(error);
});

export default axiosInstance;