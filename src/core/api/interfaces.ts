import type { AxiosRequestConfig, AxiosResponse } from "axios";

export enum IApiRequestStatus {
  Default = "default",
  Loading = "loading",
  Success = "success",
  Error = "error",
}

export interface IApiRequestConfig extends AxiosRequestConfig {
  onSuccess?: (data: AxiosResponse) => void;
  onError?: (err: unknown) => void;
}

export interface IApiRequestParams {
  pageSize?: number;
  page?: number;
  [propName: string]: any;
}

export interface IApiResponseData {
  status: string;
  message: string;
  data?: unknown;
}

export interface IApiResponse extends AxiosResponse {
  data: IApiResponseData;
}
