import { isNotNil } from 'es-toolkit/predicate';

import { useAuthStore } from '../auth';

import { BASE_URL, DEFAULT_TIMEOUT } from './config';
import { buildUrlWithParams } from './lib';
import type {
  IDeleteParams,
  IGetParams,
  IPatchParams,
  IPostParams,
  IPutParams,
  IRequestParams,
  IUploadParams,
} from './model';

const api = {
  getAuthHeaders(): Record<string, string> {
    const authStore = useAuthStore();
    const token = authStore.session?.access_token;
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  async request<R>({
    url,
    params,
    options = {},
    signal: externalSignal,
  }: IRequestParams): Promise<R> {
    const hasBody = isNotNil(options.body);
    const fullUrl = params
      ? `${BASE_URL}${buildUrlWithParams(url, params)}`
      : `${BASE_URL}${url}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);

    const config = {
      ...options,
      signal: externalSignal || controller.signal,
      headers: {
        ...(hasBody && { 'Content-Type': 'application/json' }),
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(fullUrl, config);
      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json();
        throw new Error((error as Error).message);
      }

      const res: R = await response.json();
      return res;
    } catch (error) {
      clearTimeout(timeoutId);

      if ((error as Error).name === 'AbortError') {
        throw new Error(`Timeout: request exceeded ${DEFAULT_TIMEOUT}ms`, {
          cause: error,
        });
      }

      throw error;
    }
  },

  get<R>({ url, params, options = {}, signal }: IGetParams) {
    return this.request<R>({
      url,
      params,
      options: { ...options, method: 'GET' },
      signal,
    });
  },

  post<T, R>({ url, data, options = {} }: IPostParams<T>) {
    return this.request<R>({
      url,
      options: {
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
      },
    });
  },

  put<T, R>({ url, data, options = {} }: IPutParams<T>) {
    return this.request<R>({
      url,
      options: {
        ...options,
        method: 'PUT',
        body: JSON.stringify(data),
      },
    });
  },

  patch<T, R>({ url, data, options = {} }: IPatchParams<T>) {
    return this.request<R>({
      url,
      options: {
        ...options,
        method: 'PATCH',
        body: JSON.stringify(data),
      },
    });
  },

  delete<R>({ url, options = {} }: IDeleteParams) {
    return this.request<R>({
      url,
      options: { ...options, method: 'DELETE' },
    });
  },

  upload<R>({ url, formData, options = {} }: IUploadParams) {
    return this.request<R>({
      url,
      options: {
        ...options,
        method: 'POST',
        body: formData,
        headers: {
          ...options.headers,
          'Content-Type': 'multipart/form-data',
        },
      },
    });
  },
};

export { api };
