import axios, { 
  AxiosInstance, 
  AxiosRequestConfig, 
  AxiosResponse 
} from "axios";

class Request {
  private static instance?: Request;
  public service: AxiosInstance;

  constructor() {
    this.service = axios.create({
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.service.interceptors.request.use(
      (request: any) => {
        return request;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    this.service.interceptors.response.use(
      (response: any) => {
        return response;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  }

  static getInstance() {
    if (!Request.instance) {
      Request.instance = new Request();
    }
    return Request.instance;
  }

  get<T>(
    path: string,
    data?: Record<string, unknown>,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.service.get(path, {
      ...options,
      params: data,
    });
  }

  post<T>(
    path: string,
    data?: Record<string, unknown>,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.service.post(path, data, {
      ...options,
    });
  }

  delete<T>(
    path: string,
    data?: Record<string, unknown>,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.service.delete(path, {
      ...options,
      params: data,
    });
  }

  put<T>(
    path: string,
    data?: Record<string, unknown>,
    options?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.service.put(path, data, {
      ...options,
    });
  }
}

export default Request.getInstance();
