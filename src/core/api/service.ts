import { api } from './api';

import type { IApiRequestConfig, IApiRequestParams } from './interfaces';

export class APIRequestService {
  static retrieveAll<T = any>(
    url: string,
    params?: IApiRequestParams
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      api.get(url, {
        onSuccess: (data: any) => resolve(data),
        onError: (error: any) => reject(error),
        params,
      });
    });
  }

  static retrieveOne<T = unknown>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      api.get(url, {
        onSuccess: (data: any) => resolve(data),
        onError: (error: any) => reject(error),
      });
    });
  }

  static addOne<T = any>(
    url: string,
    content: any,
    config?: IApiRequestConfig
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      api.post(url, content, {
        onSuccess: (data: any) => resolve(data),
        onError: (error: any) => reject(error),
        ...config,
      });
    });
  }

  static updateOne<T = any>(
    url: string,
    content: any,
    config?: IApiRequestConfig
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      api.patch(url, content, {
        onSuccess: (data: any) => resolve(data),
        onError: (error: any) => reject(error),
        ...config,
      });
    });
  }

  static removeOne<T = any>(url: string): Promise<T> {
    return new Promise((resolve, reject) => {
      api.delete(url, {
        onSuccess: (data: any) => resolve(data),
        onError: (error: any) => reject(error),
      });
    });
  }
}
