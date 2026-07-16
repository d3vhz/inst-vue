import { BASE_URL, DEFAULT_TIMEOUT } from './config';
import { buildUrlWithParams } from './lib';
import type {
  IApiResponse,
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
    const token = 'token';
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  async request<R>({
    url,
    params,
    options = {},
    timeout = DEFAULT_TIMEOUT,
  }: IRequestParams): Promise<IApiResponse<R>> {
    const fullUrl = params
      ? `${BASE_URL}${buildUrlWithParams(url, params)}`
      : `${BASE_URL}${url}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const config = {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(fullUrl, config);
      clearTimeout(timeoutId);

      const data: R = await response.json();
      return {
        data,
        status: response.status,
      };
    } catch (error) {
      clearTimeout(timeoutId);

      if ((error as Error).name === 'AbortError') {
        throw new Error(`Timeout: request exceeded ${timeout}ms`, {
          cause: error,
        });
      }

      throw error;
    }
  },

  get<R>({ url, params, options = {}, timeout }: IGetParams) {
    return this.request<R>({
      url,
      params,
      options: { ...options, method: 'GET' },
      timeout,
    });
  },

  post<T, R>({ url, data, options = {}, timeout }: IPostParams<T>) {
    return this.request<R>({
      url,
      options: {
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
      },
      timeout,
    });
  },

  put<T, R>({ url, data, options = {}, timeout }: IPutParams<T>) {
    return this.request<R>({
      url,
      options: {
        ...options,
        method: 'PUT',
        body: JSON.stringify(data),
      },
      timeout,
    });
  },

  patch<T, R>({ url, data, options = {}, timeout }: IPatchParams<T>) {
    return this.request<R>({
      url,
      options: {
        ...options,
        method: 'PATCH',
        body: JSON.stringify(data),
      },
      timeout,
    });
  },

  delete<R>({ url, options = {}, timeout }: IDeleteParams) {
    return this.request<R>({
      url,
      options: { ...options, method: 'DELETE' },
      timeout,
    });
  },

  upload<R>({ url, formData, options = {}, timeout }: IUploadParams) {
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
      timeout,
    });
  },
};

export { api };
