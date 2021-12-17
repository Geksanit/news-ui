import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';

type Config = AxiosRequestConfig & { withAccessToken?: boolean };
class HttpActions {
  private request: AxiosInstance;

  private accessToken: string | null = null;

  constructor(baseURL?: string, headers?: AxiosRequestConfig['headers']) {
    const config: AxiosRequestConfig = {
      baseURL,
      headers,
    };

    this.request = axios.create(config);
  }

  public setAccessToken(token: string) {
    this.accessToken = token;
  }

  public get<T>(url: string, config?: Config): AxiosPromise<T> {
    return this.request.get(url, this.getRequestConfig(config));
  }

  public post<T>(url: string, data?: unknown, config?: Config): AxiosPromise<T> {
    return this.request.post(url, data, this.getRequestConfig(config));
  }

  public patch<T>(url: string, data?: unknown, config?: Config): AxiosPromise<T> {
    return this.request.patch(url, data, this.getRequestConfig(config));
  }

  public delete<T>(url: string, config?: Config): AxiosPromise<T> {
    return this.request.delete(url, this.getRequestConfig(config));
  }

  public put<T>(url: string, data?: unknown, config?: Config): AxiosPromise<T> {
    return this.request.put(url, data, this.getRequestConfig(config));
  }

  private getRequestConfig(config?: Config): AxiosRequestConfig {
    if (!config) return config;

    const { withAccessToken = false, ...requestConfig } = config;

    if (withAccessToken) {
      return {
        ...requestConfig,
        headers: { Authorization: `Bearer ${this.accessToken}`, ...requestConfig?.headers },
      };
    }
    return config;
  }
}

export { HttpActions };
