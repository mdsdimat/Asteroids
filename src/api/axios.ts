import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { buildUrl, apiUrl } from '../helpers/ApiHelpers';

const axiosInstance = axios.create({
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
  method: 'get',
});

const praktikumAxios = (url: string, options?: AxiosRequestConfig): AxiosPromise => {
  const buildedUrl = buildUrl(url);

  return axiosInstance({
    url: buildedUrl,
    ...options,
  });
};

const apiAxios = (url: string, options?: AxiosRequestConfig): AxiosPromise => {
  const buildedUrl = apiUrl(url);

  return axiosInstance({
    url: buildedUrl,
    ...options,
  });
};

export { praktikumAxios, apiAxios };
