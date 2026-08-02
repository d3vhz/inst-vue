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
  signal?: AbortSignal;
};

type IGetParams = IRequestParams;

type IPostParams<T> = {
  url: string;
  data?: T;
  options?: RequestInit;
};

type IPutParams<T> = IPostParams<T>;

type IPatchParams<T> = IPostParams<T>;

type IDeleteParams = IRequestParams;

type IUploadParams = {
  url: string;
  formData: FormData;
  options?: RequestInit;
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
