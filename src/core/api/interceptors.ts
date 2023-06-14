import axios, { AxiosError, type AxiosResponse } from "axios";
import type { AxiosRequestConfig } from "axios";

import { TokenCategory } from "@/common/constants";
import {
  isAuthTokenValid,
  retrieveAuthToken,
  setNewAccessToken,
} from "@/common/functional";
import { baseURL } from "./api";

type TRequestInterceptorResponse =
  | AxiosRequestConfig
  | Promise<AxiosRequestConfig>;

let isRefreshingToken = false;
export function authInterceptor(
  config: AxiosRequestConfig
): TRequestInterceptorResponse {
  const accessToken = retrieveAuthToken(TokenCategory.Access);

  if (accessToken) {
    // eslint-disable-next-line no-constant-condition
    if (false) {
      // if (!isAuthTokenValid(5 * 60 * 1000)) {
      console.log("Invalid Token", config.url);

      return new Promise((resolve, reject) => {
        reject(Error("Token refresh not handled"));
        console.log("Refreshing...", config.url);

        const refreshToken = retrieveAuthToken(TokenCategory.Refresh);
        if (!isRefreshingToken) {
          isRefreshingToken = true;

          axios
            .post("/users/token", { token: refreshToken }, { baseURL })
            .then((response) => {
              console.log("Token Refreshed for", config.url);

              const newAccessToken = response.data.data.accessToken as string;
              setNewAccessToken(newAccessToken);

              if (config.headers) {
                config.headers.Authorization = `Bearer ${newAccessToken}`;
              }

              isRefreshingToken = false;
              resolve(config);
            })
            .catch((err) => {
              console.error("Error while refreshing\n", err);

              reject(err);
            });
        } else {
          const interval = setInterval(() => {
            if (isAuthTokenValid()) {
              clearInterval(interval);
              console.log("Token is valid for request", config.url);

              const accessToken = retrieveAuthToken(TokenCategory.Access);
              if (config.headers) {
                config.headers.Authorization = `Bearer ${accessToken}`;
              }
              resolve(config);
            }
          }, 500);
        }
      });
    } else if (config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
}

function logObject(title: string, obj?: Record<string, any>): void {
  if (obj === undefined) return console.log(`${title}: undefined`);

  console.groupCollapsed(title);
  for (const [key, param] of Object.entries(obj)) {
    console.log(`${key}: `, param);
  }

  console.groupEnd();
}

const isDevMode = import.meta.env.MODE === "development";
export function requestLoggerInterceptor(
  config: AxiosRequestConfig
): TRequestInterceptorResponse {
  if (isDevMode) {
    console.groupCollapsed(
      `Request  (${config.method?.toUpperCase()}):`,
      config.url
    );

    console.log("Uri: ", axios.getUri(config));
    logObject("Params", config.params);
    logObject("Data", config.data);

    console.groupEnd();
  }

  return config;
}

export const responseLoggerInterceptor = {
  success(response: AxiosResponse): AxiosResponse {
    if (!isDevMode) return response;

    console.groupCollapsed(
      `Response (${response.status}):`,
      response.config.url
    );
    console.log("Data: ", response.data);
    console.groupEnd();

    return response;
  },
  error(err: AxiosError): any {
    if (!isDevMode) return Promise.reject(err);

    console.groupCollapsed(
      `Response (${err.response?.status}):`,
      err.config?.url
    );
    console.error("Data:", err.response?.data);
    console.groupEnd();

    return Promise.reject(err);
  },
};
