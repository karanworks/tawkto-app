import axios, { AxiosInstance } from "axios";
import { getItem } from "./storage";
class API_CLIENT {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      headers: {
        Accept: "application/json",
        "User-Agent": "ReactNativeApp",
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.request.use(
      async (config) => {
        const user = await getItem("user");

        if (user) {
          config.headers.Authorization = `Bearer ${user.access_token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  get = (url: string) => {
    return this.api.get(url);
  };

  post = (url: string, data: any) => {
    return this.api.post(url, data);
  };

  patch = (url: string, data: any) => {
    return this.api.patch(url, data);
  };
}

export { API_CLIENT };
