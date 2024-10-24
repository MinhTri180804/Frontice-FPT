// apiHandler.ts
import instance from '../axios/axiosClient';
import { AxiosRequestConfig } from 'axios';

const apiHandler = async <T>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> => {
  const response = await instance.request<T>({
    method,
    url,
    data,
    ...config,
  });
  return response.data;
};

export const apiService = {
  fetch: <T>(url: string, config?: AxiosRequestConfig) =>
    apiHandler<T>('get', url, undefined, config),
  create: <T>(url: string, data: T, config?: AxiosRequestConfig) =>
    apiHandler<T>('post', url, data, config),
  update: <T>(url: string, data: T, config?: AxiosRequestConfig) =>
    apiHandler<T>('put', url, data, config),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiHandler<T>('delete', url, undefined, config),
};
