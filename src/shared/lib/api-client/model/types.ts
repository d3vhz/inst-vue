type URLParams = Record<string, string | string[] | undefined>;

interface IApiResponse<T> {
  data: T;
  status?: number;
  message?: string;
}

type IRequestParams = {
  url: string;
  params?: URLParams;
  options?: RequestInit;
  timeout?: number;
};

type IGetParams = {
  url: string;
  params?: URLParams;
  options?: RequestInit;
  timeout?: number;
};

type IPostParams<T> = {
  url: string;
  data: T;
  options?: RequestInit;
  timeout?: number;
};

type IPutParams<T> = IPostParams<T>;

type IPatchParams<T> = IPostParams<T>;

type IDeleteParams = IRequestParams;

type IUploadParams = {
  url: string;
  formData: FormData;
  options?: RequestInit;
  timeout: number;
};

export type {
  URLParams,
  IApiResponse,
  IUploadParams,
  IRequestParams,
  IGetParams,
  IPostParams,
  IPutParams,
  IPatchParams,
  IDeleteParams,
};
